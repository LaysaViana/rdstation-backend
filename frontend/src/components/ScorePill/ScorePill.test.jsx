import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScorePill from "./ScorePill";

jest.mock("@mui/material/Tooltip", () => ({ title, children }) => (
  <div
    data-testid="mock-tooltip"
    data-title={typeof title === "string" ? title : "custom-tooltip"}
  >
    {children}
  </div>
));

const defaultProps = { score: 50 };

const setup = (overrides = {}) => {
  const props = { ...defaultProps, ...overrides };
  return render(<ScorePill {...props} />);
};

describe("ScorePill", () => {
  test("não renderiza quando score é null", () => {
    const { container } = render(<ScorePill score={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renderiza score e label", () => {
    setup({ score: 87 });
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(screen.getByText("pontos")).toBeInTheDocument();
  });

  test("usa tooltip customizado", () => {
    setup({ score: 42, tooltip: "Meu Tooltip" });
    expect(screen.getByTestId("mock-tooltip")).toHaveAttribute(
      "data-title",
      "Meu Tooltip"
    );
  });
});
