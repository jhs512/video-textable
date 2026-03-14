"use client";

import { useCallback, useState } from "react";

import { Film, Loader2 } from "lucide-react";

import { RecordingStatus, recordVideo } from "@/lib/videoRecorder";

import { Button } from "@/components/ui/button";

interface ExportVideoButtonProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  scenesCount: number;
  onSeekToScene: (index: number) => void;
  disabled: boolean;
}

export default function ExportVideoButton({
  previewRef,
  scenesCount,
  onSeekToScene,
  disabled,
}: ExportVideoButtonProps) {
  const [status, setStatus] = useState<RecordingStatus>({ type: "idle" });

  const isRecording =
    status.type === "preparing" ||
    status.type === "capturing" ||
    status.type === "encoding";

  const handleExport = useCallback(async () => {
    if (!previewRef.current) return;

    await recordVideo(
      previewRef.current,
      scenesCount,
      onSeekToScene,
      setStatus
    );

    setTimeout(() => setStatus({ type: "idle" }), 3000);
  }, [previewRef, scenesCount, onSeekToScene]);

  const label = (() => {
    switch (status.type) {
      case "preparing":
        return "FFmpeg 로딩 중...";
      case "capturing":
        return `캡처 중 ${status.current}/${status.total}`;
      case "encoding":
        return "인코딩 중...";
      case "complete":
        return "다운로드 완료!";
      case "error":
        return status.message;
      default:
        return "영상 내보내기";
    }
  })();

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={disabled || isRecording}
    >
      {isRecording ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Film className="h-4 w-4" />
      )}
      {label}
    </Button>
  );
}
