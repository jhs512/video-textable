import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export type RecordingStatus =
  | { type: "idle" }
  | { type: "preparing" }
  | { type: "capturing"; current: number; total: number }
  | { type: "encoding" }
  | { type: "complete" }
  | { type: "error"; message: string };

/**
 * 씬 프리뷰 요소를 프레임별로 캡처하고 FFmpeg.wasm으로 MP4 인코딩하여 다운로드한다.
 */
export async function recordVideo(
  captureElement: HTMLElement,
  scenesCount: number,
  seekToScene: (index: number) => void,
  onStatus: (status: RecordingStatus) => void
): Promise<void> {
  const fps = 1; // 씬당 1프레임 (TTS 기반이므로 각 씬이 하나의 정적 프레임)
  const frameDuration = 3; // 씬당 3초 (기본 표시 시간)

  onStatus({ type: "preparing" });

  const ffmpeg = new FFmpeg();

  try {
    await ffmpeg.load({
      coreURL: "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.js",
      wasmURL:
        "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.wasm",
    });
  } catch {
    onStatus({ type: "error", message: "FFmpeg 로드에 실패했습니다." });
    return;
  }

  const { default: html2canvas } = await import("html2canvas-pro");

  // 프레임 캡처
  for (let i = 0; i < scenesCount; i++) {
    onStatus({ type: "capturing", current: i + 1, total: scenesCount });

    seekToScene(i);

    // 렌더링 안정화 대기
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => requestAnimationFrame(r));

    const canvas = await html2canvas(captureElement, {
      backgroundColor: "#000000",
      scale: 2,
    });

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/png");
    });

    const data = await fetchFile(blob);
    const filename = `frame${String(i).padStart(5, "0")}.png`;
    await ffmpeg.writeFile(filename, data);
  }

  // 인코딩
  onStatus({ type: "encoding" });

  await ffmpeg.exec([
    "-framerate",
    `${fps}`,
    "-i",
    "frame%05d.png",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "30",
    "-t",
    `${scenesCount * frameDuration}`,
    "output.mp4",
  ]);

  // 다운로드
  const outputData = await ffmpeg.readFile("output.mp4");
  const bytes =
    outputData instanceof Uint8Array
      ? new Uint8Array(
          outputData.buffer.slice(
            outputData.byteOffset,
            outputData.byteOffset + outputData.byteLength
          ) as ArrayBuffer
        )
      : new TextEncoder().encode(outputData as string);
  const outputBlob = new Blob([bytes], { type: "video/mp4" });
  const url = URL.createObjectURL(outputBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "video-textable.mp4";
  a.click();
  URL.revokeObjectURL(url);

  onStatus({ type: "complete" });
}
