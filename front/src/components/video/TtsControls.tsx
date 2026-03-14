"use client";

import { TtsConfig } from "@/types/video";

import { Label } from "@/components/ui/label";

interface TtsControlsProps {
  config: TtsConfig;
  onChange: (config: TtsConfig) => void;
  disabled: boolean;
}

export default function TtsControls({
  config,
  onChange,
  disabled,
}: TtsControlsProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <Label htmlFor="tts-rate" className="whitespace-nowrap">
          속도 {config.rate.toFixed(1)}x
        </Label>
        <input
          id="tts-rate"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={config.rate}
          onChange={(e) =>
            onChange({ ...config, rate: parseFloat(e.target.value) })
          }
          disabled={disabled}
          className="w-20"
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="tts-pitch" className="whitespace-nowrap">
          높이 {config.pitch.toFixed(1)}
        </Label>
        <input
          id="tts-pitch"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={config.pitch}
          onChange={(e) =>
            onChange({ ...config, pitch: parseFloat(e.target.value) })
          }
          disabled={disabled}
          className="w-20"
        />
      </div>
    </div>
  );
}
