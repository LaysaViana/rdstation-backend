// RecommendationType.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecommendationType from "./RecommendationType";

jest.mock("../../../shared/Checkbox/Checkbox", () => ({
  Checkbox: (props) => <input {...props} />,
}));

function TestWrapper({ initialValue = "SingleProduct", onChangeSpy }) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue) => {
    if (typeof onChangeSpy === "function") onChangeSpy(newValue);
    setValue(newValue);
  };

  return (
    <RecommendationType
      value={value}
      onRecommendationTypeChange={handleChange}
    />
  );
}

describe("RecommendationType", () => {
  it("renderiza título e as duas opções", () => {
    render(<TestWrapper />);

    expect(screen.getByText(/Tipo de Recomendação/i)).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /Produto Único/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /Múltiplos Produtos/i })
    ).toBeInTheDocument();
  });

  it("marca a opção correta conforme o value atual (usando rerender)", () => {
    const { rerender } = render(<TestWrapper initialValue="SingleProduct" />);

    // initial SingleProduct
    expect(screen.getByRole("radio", { name: /Produto Único/i })).toBeChecked();
    expect(
      screen.getByRole("radio", { name: /Múltiplos Produtos/i })
    ).not.toBeChecked();

    rerender(<TestWrapper initialValue="MultipleProducts" />);

    expect(
      screen.getByRole("radio", { name: /Produto Único/i })
    ).not.toBeChecked();
    expect(
      screen.getByRole("radio", { name: /Múltiplos Produtos/i })
    ).toBeChecked();
  });

  it("chama onRecommendationTypeChange com os valores corretos ao clicar", async () => {
    const user = userEvent.setup();
    const spy = jest.fn();

    render(<TestWrapper initialValue="SingleProduct" onChangeSpy={spy} />);

    const radioMultiple = screen.getByRole("radio", {
      name: /Múltiplos Produtos/i,
    });
    const radioSingle = screen.getByRole("radio", { name: /Produto Único/i });

    // Click múltiplos produtos -> spy chamado e wrapper atualiza
    await user.click(radioMultiple);
    expect(spy).toHaveBeenCalledWith("MultipleProducts");
    expect(radioMultiple).toBeChecked();
    expect(radioSingle).not.toBeChecked();

    // Click produto único -> spy chamado novamente e wrapper atualiza
    await user.click(radioSingle);
    expect(spy).toHaveBeenCalledWith("SingleProduct");
    expect(radioSingle).toBeChecked();
    expect(radioMultiple).not.toBeChecked();

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
