import { describe, expect, it } from "vitest";

import { parseScenes } from "./sceneParser";

describe("parseScenes", () => {
  it("빈 텍스트는 빈 배열을 반환한다", () => {
    expect(parseScenes("")).toEqual([]);
  });

  it("단일 씬을 파싱한다", () => {
    const scenes = parseScenes("# 제목\n\n내용입니다.");
    expect(scenes).toHaveLength(1);
    expect(scenes[0].markdown).toBe("# 제목\n\n내용입니다.");
    expect(scenes[0].html).toContain("<h1>");
    expect(scenes[0].plainText).toContain("제목");
  });

  it("---로 여러 씬을 분리한다", () => {
    const scenes = parseScenes("첫 번째\n---\n두 번째\n---\n세 번째");
    expect(scenes).toHaveLength(3);
    expect(scenes[0].plainText).toContain("첫 번째");
    expect(scenes[1].plainText).toContain("두 번째");
    expect(scenes[2].plainText).toContain("세 번째");
  });

  it("빈 씬은 무시한다", () => {
    const scenes = parseScenes("내용\n---\n\n---\n마지막");
    expect(scenes).toHaveLength(2);
  });

  it("볼드 마크다운을 HTML로 변환한다", () => {
    const scenes = parseScenes("**굵게**");
    expect(scenes[0].html).toContain("<strong>굵게</strong>");
  });

  it("이탤릭 마크다운을 HTML로 변환한다", () => {
    const scenes = parseScenes("*기울임*");
    expect(scenes[0].html).toContain("<em>기울임</em>");
  });

  it("인라인 코드를 HTML로 변환한다", () => {
    const scenes = parseScenes("`코드`");
    expect(scenes[0].html).toContain("<code>코드</code>");
  });

  it("리스트를 HTML로 변환한다", () => {
    const scenes = parseScenes("- 항목1\n- 항목2");
    expect(scenes[0].html).toContain("<ul>");
    expect(scenes[0].html).toContain("<li>");
  });

  it("plainText에서 HTML 태그가 제거된다", () => {
    const scenes = parseScenes("# 제목\n**굵게**");
    expect(scenes[0].plainText).not.toContain("<");
  });
});
