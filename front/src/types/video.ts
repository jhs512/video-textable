export interface Scene {
  markdown: string;
  html: string;
  plainText: string;
}

export interface TtsConfig {
  rate: number;
  pitch: number;
  lang: string;
}

export type PlaybackStatus =
  | { type: "idle" }
  | { type: "playing"; sceneIndex: number }
  | { type: "paused"; sceneIndex: number }
  | { type: "finished" };
