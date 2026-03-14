"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Square } from "lucide-react";

import { PlaybackStatus } from "@/types/video";

import { Button } from "@/components/ui/button";

interface PlaybackControlsProps {
  status: PlaybackStatus;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PlaybackControls({
  status,
  canGoPrev,
  canGoNext,
  onPlay,
  onPause,
  onResume,
  onStop,
  onPrev,
  onNext,
}: PlaybackControlsProps) {
  const isPlaying = status.type === "playing";
  const isPaused = status.type === "paused";
  const isActive = isPlaying || isPaused;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        disabled={!canGoPrev || isActive}
        aria-label="이전 씬"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {isPlaying ? (
        <Button
          variant="outline"
          size="icon"
          onClick={onPause}
          aria-label="일시정지"
        >
          <Pause className="h-4 w-4" />
        </Button>
      ) : isPaused ? (
        <Button
          variant="outline"
          size="icon"
          onClick={onResume}
          aria-label="재개"
        >
          <Play className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={onPlay}
          aria-label="재생"
        >
          <Play className="h-4 w-4" />
        </Button>
      )}

      {isActive && (
        <Button
          variant="outline"
          size="icon"
          onClick={onStop}
          aria-label="정지"
        >
          <Square className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext || isActive}
        aria-label="다음 씬"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
