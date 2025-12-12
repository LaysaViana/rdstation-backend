// src/components/SmallBadge/SmallBadge.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SmallBadge from "./SmallBadge";

jest.mock("@mui/material", () => {
  const React = require("react");

  function MockChip(props, ref) {
    const { component = "span", label, size, sx, className, ...rest } = props;

    const Tag = typeof component === "string" ? component : "span";

    const dataAttrs = {
      "data-testid": "mock-chip",
      "data-label": typeof label === "string" ? label : undefined,
      "data-size": size,
      "data-class": className,
      "data-sx": sx ? JSON.stringify(sx) : undefined,
      ...Object.fromEntries(
        Object.entries(rest).map(([k, v]) => [
          `data-prop-${k}`,
          typeof v === "string" ? v : JSON.stringify(v),
        ])
      ),
    };

    return React.createElement(Tag, { ref, ...dataAttrs }, label);
  }

  const Chip = React.forwardRef(MockChip);

  return {
    Chip,
  };
});

describe("SmallBadge", () => {
  test("renderiza o label (children) dentro do Chip mockado", () => {
    render(<SmallBadge>Meu Badge</SmallBadge>);
    const chip = screen.getByTestId("mock-chip");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent("Meu Badge");
    expect(chip).toHaveAttribute("data-label", "Meu Badge");
  });

  test("aplica className, bg e color via sx", () => {
    render(
      <SmallBadge
        className="minha-classe"
        bg="#123456"
        color="#abcdef"
        sx={{ padding: 2 }}
      >
        X
      </SmallBadge>
    );

    const chip = screen.getByTestId("mock-chip");

    const dataClass = chip.getAttribute("data-class") || "";
    expect(dataClass).toEqual(expect.stringContaining("minha-classe"));

    expect(dataClass).toEqual(expect.stringContaining("small-badge"));

    // sx foi serializado no mock
    const sx = chip.getAttribute("data-sx") || "";
    expect(sx).toContain('"padding":2');
    expect(sx).toContain("#123456");
    expect(sx).toContain("#abcdef");
  });

  test('respeita prop "component" trocando o elemento renderizado', () => {
    render(
      <SmallBadge component="button" data-action="ok">
        Btn
      </SmallBadge>
    );

    const chip = screen.getByTestId("mock-chip");
    expect(chip).toHaveAttribute("data-prop-data-action", "ok");
    expect(chip).toHaveTextContent("Btn");
    expect(chip.tagName.toLowerCase()).toBe("button");
  });

  test("passa props extras via ...rest", () => {
    render(
      <SmallBadge data-custom="123" aria-label="badge">
        C
      </SmallBadge>
    );

    const chip = screen.getByTestId("mock-chip");
    expect(chip).toHaveAttribute("data-prop-data-custom", "123");
    expect(chip).toHaveAttribute("data-prop-aria-label", "badge");
  });

  test("forwardRef aponta para o elemento DOM renderizado", () => {
    const ref = React.createRef();
    render(<SmallBadge ref={ref}>RefTest</SmallBadge>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toHaveTextContent("RefTest");
  });

  test('preserva prop size="small" passada para o Chip', () => {
    render(<SmallBadge>SizeTest</SmallBadge>);
    const chip = screen.getByTestId("mock-chip");
    expect(chip).toHaveAttribute("data-size", "small");
  });
});
