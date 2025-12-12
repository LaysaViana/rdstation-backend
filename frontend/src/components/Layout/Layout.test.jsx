// src/components/Layout/Layout.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Layout } from "./Layout";

jest.mock("../Header/Header", () => ({
  Header: () => <div data-testid="mock-header">HEADER</div>,
}));

jest.mock("../Footer/Footer", () => ({
  Footer: () => <div data-testid="mock-footer">FOOTER</div>,
}));

describe("Layout component", () => {
  test("renderiza Header, children e Footer", () => {
    render(
      <Layout>
        <p data-testid="child">Conteúdo</p>
      </Layout>
    );

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  test("wrapper principal existe", () => {
    render(<Layout />);
    expect(screen.getByTestId("layout-wrapper")).toBeInTheDocument();
  });
});
