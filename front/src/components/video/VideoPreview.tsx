"use client";

import { forwardRef } from "react";

import { Scene } from "@/types/video";

interface VideoPreviewProps {
  scenes: Scene[];
  currentIndex: number;
}

const VideoPreview = forwardRef<HTMLDivElement, VideoPreviewProps>(
  ({ scenes, currentIndex }, ref) => {
    const scene = scenes[currentIndex];

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>미리보기</span>
          {scenes.length > 0 && (
            <span>
              {currentIndex + 1} / {scenes.length}
            </span>
          )}
        </div>
        <div
          ref={ref}
          className="flex min-h-[300px] items-center justify-center rounded-lg bg-black p-8"
        >
          {scene ? (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: scene.html }}
            />
          ) : (
            <p className="text-neutral-500">
              마크다운을 입력하면 미리보기가 표시됩니다.
            </p>
          )}
        </div>
      </div>
    );
  }
);
VideoPreview.displayName = "VideoPreview";

export default VideoPreview;
