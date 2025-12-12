// CardHeader.test.jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardHeader from "./CardHeader";

jest.mock("@mui/icons-material/EmojiEvents", () => (props) => (
  <svg
    data-testid="mock-emoji-icon"
    aria-hidden={props["aria-hidden"] ?? true}
  />
));

describe("CardHeader", () => {
  const defaultProps = {
    id: "card-title-id",
    name: "Nome do Cartão",
    category: "Categoria A",
    categoryStyle: { bg: "#123456", color: "#abcdef" },
    isTopRanked: false,
  };

  test("renderiza nome e aplica id/ title no Typography", () => {
    render(<CardHeader {...defaultProps} />);
    const titleEl = screen.getByText(defaultProps.name);
    expect(titleEl).toBeInTheDocument();
    // title attribute
    expect(titleEl).toHaveAttribute("title", defaultProps.name);
    // id aplicado
    expect(titleEl).toHaveAttribute("id", defaultProps.id);
  });

  test("não mostra o ícone quando isTopRanked é false", () => {
    render(<CardHeader {...defaultProps} isTopRanked={false} />);
    const icon = screen.queryByTestId("mock-emoji-icon");
    expect(icon).not.toBeInTheDocument();
  });

  test("mostra o ícone quando isTopRanked é true", () => {
    render(<CardHeader {...defaultProps} isTopRanked={true} />);
    const icon = screen.getByTestId("mock-emoji-icon");
    expect(icon).toBeInTheDocument();
    // verificar aria-hidden conforme componente real
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  test("suporta nomes longos (verifica truncamento via presença do title)", () => {
    const longName = "Nome muito longo que deveria ser truncado no layout";
    render(<CardHeader {...defaultProps} name={longName} />);
    const el = screen.getByText(longName);
    expect(el).toHaveAttribute("title", longName);
  });
});
