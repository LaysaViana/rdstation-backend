import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import MainContent from "./MainContent";

jest.mock("../../pages/home/Home.page", () => {
  return function MockHomePage() {
    return <div data-testid="mock-homepage">HOME PAGE MOCK</div>;
  };
});

describe("MainContent", () => {
  test("renderiza HomePage corretamente", () => {
    render(<MainContent />);

    // Verifica se o mock foi exibido
    expect(screen.getByTestId("mock-homepage")).toBeInTheDocument();
  });
});
