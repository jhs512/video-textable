import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("페이지 제목이 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByText("Video Textable")).toBeInTheDocument();
  });

  it("main 영역이 존재한다", () => {
    render(<Home />);
    const mains = screen.getAllByRole("main");
    expect(mains.length).toBeGreaterThanOrEqual(1);
  });
});
