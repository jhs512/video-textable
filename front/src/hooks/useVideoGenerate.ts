"use client";

import { useCallback, useRef, useState } from "react";

import { PlaybackStatus, Scene, TtsConfig } from "@/types/video";

import { DEFAULT_TTS_CONFIG } from "@/constants/video";

import { cancelSpeech, pauseSpeech, resumeSpeech, speak } from "@/lib/tts";

export function useVideoGenerate(scenes: Scene[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<PlaybackStatus>({ type: "idle" });
  const [ttsConfig, setTtsConfig] = useState<TtsConfig>(DEFAULT_TTS_CONFIG);
  const cancelledRef = useRef(false);

  const play = useCallback(async () => {
    if (scenes.length === 0) return;

    cancelledRef.current = false;
    setStatus({ type: "playing", sceneIndex: currentIndex });

    for (let i = currentIndex; i < scenes.length; i++) {
      if (cancelledRef.current) break;

      setCurrentIndex(i);
      setStatus({ type: "playing", sceneIndex: i });

      try {
        await speak(scenes[i].plainText, ttsConfig);
      } catch {
        break;
      }

      if (cancelledRef.current) break;
    }

    if (!cancelledRef.current) {
      setStatus({ type: "finished" });
    }
  }, [scenes, currentIndex, ttsConfig]);

  const pause = useCallback(() => {
    pauseSpeech();
    setStatus({ type: "paused", sceneIndex: currentIndex });
  }, [currentIndex]);

  const resume = useCallback(() => {
    resumeSpeech();
    setStatus({ type: "playing", sceneIndex: currentIndex });
  }, [currentIndex]);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    cancelSpeech();
    setStatus({ type: "idle" });
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(scenes.length - 1, i + 1));
  }, [scenes.length]);

  const seekTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, scenes.length - 1)));
    },
    [scenes.length]
  );

  return {
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
  };
}
