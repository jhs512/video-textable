"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { captureAndDownload } from "@/lib/captureScene";
import { parseScenes } from "@/lib/sceneParser";

import { useVideoGenerate } from "@/hooks/useVideoGenerate";

import ExportButton from "./ExportButton";
import ExportVideoButton from "./ExportVideoButton";
import PlaybackControls from "./PlaybackControls";
import TextEditor from "./TextEditor";
import TtsControls from "./TtsControls";
import VideoPreview from "./VideoPreview";

export default function VideoGenerator() {
  const [text, setText] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const scenes = useMemo(() => parseScenes(text), [text]);

  const {
    currentIndex,
    status,
    ttsConfig,
    setTtsConfig,
    play,
    pause,
    resume,
    stop,
    goToPrev,
    goToNext,
    seekTo,
  } = useVideoGenerate(scenes);

  const isActive = status.type === "playing" || status.type === "paused";

  const handleExportImage = useCallback(() => {
    if (previewRef.current) {
      captureAndDownload(previewRef.current, `scene-${currentIndex + 1}.png`);
    }
  }, [currentIndex]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TextEditor text={text} onChange={setText} />
      <div className="flex flex-col gap-4">
        <VideoPreview
          ref={previewRef}
          scenes={scenes}
          currentIndex={currentIndex}
        />
        <PlaybackControls
          status={status}
          currentIndex={currentIndex}
          totalScenes={scenes.length}
          canGoPrev={currentIndex > 0}
          canGoNext={currentIndex < scenes.length - 1}
          onPlay={play}
          onPause={pause}
          onResume={resume}
          onStop={stop}
          onPrev={goToPrev}
          onNext={goToNext}
        />
        <TtsControls
          config={ttsConfig}
          onChange={setTtsConfig}
          disabled={isActive}
        />
        <div className="flex justify-end gap-2">
          <ExportButton
            onExport={handleExportImage}
            disabled={scenes.length === 0}
          />
          <ExportVideoButton
            previewRef={previewRef}
            scenesCount={scenes.length}
            onSeekToScene={seekTo}
            disabled={scenes.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
