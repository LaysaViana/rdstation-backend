import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DefaultTooltip } from "../../shared/Tooltip/Tooltip";

jest.mock("@mui/material", () => {
  const ReactLocal = require("react");
  return {
    Tooltip: ({ title, children }) =>
      ReactLocal.createElement(
        "div",
        { "data-testid": "tooltip", title },
        children
      ),
  };
});

test("DefaultTooltip renderiza children e repassa title", () => {
  render(
    <DefaultTooltip title="título">
      <span data-testid="child">X</span>
    </DefaultTooltip>
  );

  const tooltip = screen.getByTestId("tooltip");
  expect(tooltip).toHaveAttribute("title", "título");
  expect(screen.getByTestId("child")).toBeInTheDocument();
});
