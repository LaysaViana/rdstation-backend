import { render, screen, within } from "@testing-library/react";
import { Footer } from "./Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useThemeMode } from "../../context/ThemeContext";

jest.mock("../../context/ThemeContext", () => ({
  useThemeMode: jest.fn(),
}));

describe("Footer", () => {
  const renderWithTheme = (mode) => {
    useThemeMode.mockReturnValue({ mode });
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );
  };

  test('renderiza o texto "Desenvolvido por Laysa Viana"', () => {
    renderWithTheme("light");
    const footer = screen.getByRole("contentinfo");
    // uso within para evitar acesso direto ao DOM
    const nameEl = within(footer).getByText(/Laysa Viana/i);
    expect(nameEl).toBeInTheDocument();

    // opcional: também garantir que haja o prefixo "Desenvolvido por"
    expect(within(footer).getByText(/Desenvolvido por/i)).toBeInTheDocument();
  });

  test("tem links para GitHub e LinkedIn", () => {
    renderWithTheme("light");
    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    const linkedinLink = screen.getByRole("link", { name: /LinkedIn/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/LaysaViana");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/laysa-viana"
    );
  });

  test("renderiza corretamente no modo dark", () => {
    renderWithTheme("dark");
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
});
