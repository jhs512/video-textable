/**
 * DOM 요소를 PNG 이미지로 캡처하고 다운로드한다.
 */
export async function captureAndDownload(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const { default: html2canvas } = await import("html2canvas-pro");

  const canvas = await html2canvas(element, {
    backgroundColor: "#000000",
    scale: 2,
  });

  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), "image/png");
  });

  downloadBlob(blob, filename);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
