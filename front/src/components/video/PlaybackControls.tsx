"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Square } from "lucide-react";

import { PlaybackStatus } from "@/types/video";

import { Button } from "@/components/ui/button";

interface PlaybackControlsProps {
  status: PlaybackStatus;
  currentIndex: number;
  totalScenes: number;
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
  currentIndex,
  totalScenes,
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
  const progress =
    totalScenes > 0 ? ((currentIndex + 1) / totalScenes) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      {/* 프로그레스 바 */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all duration-300 dark:bg-neutral-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 컨트롤 */}
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
    </div>
  );
}
