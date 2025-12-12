// src/components/RecommendationList/RecommendationList.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../components/RecommendationCard/RecommendationCard", () => {
  const ReactLocal = require("react");
  return (props) =>
    ReactLocal.createElement(
      "div",
      {
        "data-testid": "rec-card",
        "data-name": props.item?.name ?? props.product?.name ?? "",
        "data-rank": props.rank ? String(props.rank) : "",
      },
      props.item?.name ?? props.product?.name ?? ""
    );
});

const RecommendationList = require("./RecommendationList").default;

describe("RecommendationList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("mostra estado vazio quando não há recomendações", () => {
    render(React.createElement(RecommendationList, { recommendations: [] }));

    // Mensagem principal de estado vazio
    expect(
      screen.getByText("Nenhuma recomendação encontrada.")
    ).toBeInTheDocument();

    // Texto de instrução
    expect(
      screen.getByText(/Tente ajustar suas preferências/i)
    ).toBeInTheDocument();

    // Não deve mostrar o título de lista de recomendações nem o chip de quantidade
    expect(
      screen.queryByText("Recomendações Encontradas")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Produto Recomendado")).not.toBeInTheDocument();

    expect(screen.queryByTestId("rec-card")).not.toBeInTheDocument();
  });

  it("renderiza múltiplas recomendações no modo MultipleProducts com contagem correta e ranks", () => {
    const recommendations = [
      { id: "a1", name: "Produto A" },
      { id: "b2", name: "Produto B" },
    ];

    render(React.createElement(RecommendationList, { recommendations }));

    // Título correto para múltiplos
    expect(screen.getByText("Recomendações Encontradas")).toBeInTheDocument();
    // Não deve mostrar o título de single product
    expect(screen.queryByText("Produto Recomendado")).not.toBeInTheDocument();

    // Chip com a quantidade (o label do Chip é o número)
    expect(screen.getByText("2")).toBeInTheDocument();

    // Deve renderizar um RecommendationCard por item
    const cards = screen.getAllByTestId("rec-card");
    expect(cards).toHaveLength(2);

    // Verifica que os nomes e ranks foram passados corretamente ao mock
    const names = cards.map((c) => c.getAttribute("data-name"));
    expect(names).toEqual(expect.arrayContaining(["Produto A", "Produto B"]));

    const ranks = cards.map((c) => c.getAttribute("data-rank"));
    expect(ranks).toEqual(["1", "2"]);
  });

  it("quando mode === 'SingleProduct' mostra título de produto recomendado e apenas o primeiro item", () => {
    const recommendations = [
      { id: "x1", name: "Produto X" },
      { id: "y2", name: "Produto Y" },
    ];

    render(
      React.createElement(RecommendationList, {
        recommendations,
        mode: "SingleProduct",
      })
    );

    // Título single product
    expect(screen.getByText("Produto Recomendado")).toBeInTheDocument();
    // mostra o chip com a quantidade total
    expect(screen.getByText("2")).toBeInTheDocument();

    // Deve existir somente 1 RecommendationCard (apenas o primeiro item)
    const cards = screen.getAllByTestId("rec-card");
    expect(cards).toHaveLength(1);

    // Verifica que o item passado é o primeiro da lista
    expect(cards[0]).toHaveAttribute("data-name", "Produto X");
    expect(cards[0].getAttribute("data-rank")).toBe("");
  });
});
