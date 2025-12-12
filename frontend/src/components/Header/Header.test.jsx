// src/components/Header/Header.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// mocks dos ícones
jest.mock("@mui/icons-material/LightMode", () => (props) => (
  <svg data-testid="mock-light-icon" {...props} />
));
jest.mock("@mui/icons-material/DarkMode", () => (props) => (
  <svg data-testid="mock-dark-icon" {...props} />
));

const mockUseThemeMode = jest.fn();
jest.mock("../../context/ThemeContext", () => ({
  useThemeMode: () => mockUseThemeMode(),
}));

const { Header } = require("./Header");

describe("Header", () => {
  beforeEach(() => {
    mockUseThemeMode.mockReset();
  });

  // função de setup reutilizável
  const setup = ({ mode = "light", toggleTheme = jest.fn() } = {}) => {
    mockUseThemeMode.mockReturnValue({ mode, toggleTheme });

    const utils = render(<Header />);

    return {
      ...utils,
      toggleTheme,
    };
  };

  test("renderiza o título e o header sem precisar repetir render", () => {
    setup({ mode: "light" });

    expect(
      screen.getByText("Recomendador de Produtos RD Station")
    ).toBeInTheDocument();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test('mostra DarkModeIcon quando mode !== "dark"', () => {
    setup({ mode: "light" });

    expect(screen.getByTestId("mock-dark-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-light-icon")).not.toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /alternar tema/i });
    expect(btn).toBeInTheDocument();
  });

  test('mostra LightModeIcon quando mode === "dark"', () => {
    setup({ mode: "dark" });

    expect(screen.getByTestId("mock-light-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-dark-icon")).not.toBeInTheDocument();
  });

  test("clicar no botão chama toggleTheme exatamente uma vez", () => {
    const toggleMock = jest.fn();
    setup({ mode: "light", toggleTheme: toggleMock });

    const btn = screen.getByRole("button", { name: /alternar tema/i });
    fireEvent.click(btn);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  test("toggleTheme de fato executa lógica passada (evita falso-positivo)", () => {
    let toggled = false;
    const toggleMock = () => {
      toggled = !toggled;
    };

    setup({ mode: "light", toggleTheme: toggleMock });

    fireEvent.click(screen.getByRole("button", { name: /alternar tema/i }));
    expect(toggled).toBe(true);
  });
});
