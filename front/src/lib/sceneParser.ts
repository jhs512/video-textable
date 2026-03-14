import { Scene } from "@/types/video";

import { SCENE_SEPARATOR } from "@/constants/video";

/**
 * 간단한 마크다운 → HTML 변환기.
 * 추후 전용 라이브러리로 교체 가능.
 */
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n/g, "<br>");
}

/**
 * HTML 태그를 제거하여 플레인 텍스트로 변환 (TTS용).
 */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/**
 * 마크다운 텍스트를 Scene 배열로 파싱한다.
 */
export function parseScenes(text: string): Scene[] {
  const rawScenes = text
    .split(new RegExp(`^${SCENE_SEPARATOR}$`, "m"))
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return rawScenes.map((markdown) => {
    const html = markdownToHtml(markdown);
    const plainText = htmlToPlainText(html);
    return { markdown, html, plainText };
  });
}
