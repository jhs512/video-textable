import { TtsConfig } from "@/types/video";

/**
 * SpeechSynthesis API로 텍스트를 읽는다.
 * 읽기가 끝나면 resolve되는 Promise를 반환한다.
 */
export function speak(text: string, config: TtsConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("SpeechSynthesis API를 지원하지 않는 브라우저입니다."));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.lang = config.lang;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utterance);
  });
}

export function cancelSpeech(): void {
  window.speechSynthesis?.cancel();
}

export function pauseSpeech(): void {
  window.speechSynthesis?.pause();
}

export function resumeSpeech(): void {
  window.speechSynthesis?.resume();
}
