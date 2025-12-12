// src/components/RecommendationCard/RecommendationCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../utils/categoryColors", () => ({
  getCategoryColors: jest.fn(() => ({
    background: "linear-gradient(#fff, #000)",
    color: "#abc",
  })),
}));

jest.mock("../shared/BadgeList/BadgeList", () => {
  const ReactLocal = require("react");
  return (props) =>
    ReactLocal.createElement(
      "div",
      { "data-testid": "badgelist" },
      Array.isArray(props.items)
        ? props.items.map((it, i) =>
            ReactLocal.createElement(
              "span",
              { key: `${it}-${i}`, "data-testid": "badge" },
              it
            )
          )
        : null
    );
});

jest.mock("../ScorePill/ScorePill", () => {
  const ReactLocal = require("react");
  return (props) =>
    ReactLocal.createElement(
      "div",
      { "data-testid": "scorepill" },
      props.score === undefined ? "no-score" : `score:${props.score}`
    );
});

jest.mock("../CardHeader/CardHeader", () => {
  const ReactLocal = require("react");
  return ({ id, name, category, isTopRanked }) =>
    ReactLocal.createElement(
      "header",
      {
        "data-testid": "cardheader",
        "data-topranked": isTopRanked ? "true" : "false",
        "data-category": category,
        id,
      },
      ReactLocal.createElement("h4", {}, name || "no-name")
    );
});

const RecommendationCard = require("./RecommendationCard").default;
const { getCategoryColors } = require("../../utils/categoryColors");

// --- Testes ---
describe("RecommendationCard", () => {
  it("retorna null quando não recebe product nem item", () => {
    const { container } = render(<RecommendationCard />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza informações do produto: header, score, descrição e badges (producto.preferences/features)", () => {
    const product = {
      id: "p1",
      name: "Produto X",
      category: "cat-a",
      score: 87,
      description: "Uma descrição legal",
      preferences: ["Pref A", "Pref B"],
      features: ["Feat X"],
    };

    render(React.createElement(RecommendationCard, { product }));

    // CardHeader foi renderizado com o nome
    expect(screen.getByTestId("cardheader")).toBeInTheDocument();
    expect(screen.getByText("Produto X")).toBeInTheDocument();
    // getCategoryColors foi chamado com a category correta
    expect(getCategoryColors).toHaveBeenCalledWith("cat-a");

    // ScorePill mostra o score (max 100 - o componente já aplica Math.min)
    expect(screen.getByTestId("scorepill")).toHaveTextContent("score:87");

    // descrição presente
    expect(screen.getByText("Uma descrição legal")).toBeInTheDocument();

    // Badges renderizados a partir de product.preferences e product.features
    const badges = screen.getAllByTestId("badge").map((n) => n.textContent);
    // Deve incluir Pref A, Pref B e Feat X (ordem depende do sections.map)
    expect(badges).toEqual(
      expect.arrayContaining(["Pref A", "Pref B", "Feat X"])
    );
  });

  it("quando matchedPreferences/matchedFeatures são passados, BadgeList usa esses arrays em vez dos do produto", () => {
    const product = {
      id: "p2",
      name: "Produto Y",
      category: "cat-b",
      score: 120,
      description: "Desc Y",
      preferences: ["Pref from product"],
      features: ["Feat from product"],
    };

    const matchedPreferences = ["MP1", "MP2"];
    const matchedFeatures = ["MF1"];

    render(
      React.createElement(RecommendationCard, {
        product,
        matchedPreferences,
        matchedFeatures,
      })
    );

    // ScorePill deve limitar score a 100
    expect(screen.getByTestId("scorepill")).toHaveTextContent("score:100");

    // Badges devem vir dos matched arrays
    const badges = screen.getAllByTestId("badge").map((n) => n.textContent);
    expect(badges).toEqual(expect.arrayContaining(["MP1", "MP2", "MF1"]));
    // e não conter os do product
    expect(badges).not.toEqual(
      expect.arrayContaining(["Pref from product", "Feat from product"])
    );
  });

  it("marca isTopRanked quando rank === 1 e passa prop correta ao CardHeader", () => {
    const product = {
      id: "p3",
      name: "Top Product",
      category: "cat-c",
      score: 10,
    };

    render(React.createElement(RecommendationCard, { product, rank: 1 }));

    const header = screen.getByTestId("cardheader");
    expect(header).toHaveAttribute("data-topranked", "true");
    expect(screen.getByText("Top Product")).toBeInTheDocument();
  });
});
