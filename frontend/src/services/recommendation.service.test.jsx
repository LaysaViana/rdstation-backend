// src/utils/recommendations.test.js

const {
  rankWithTieBreak,
  getRecommendations,
} = require("./recommendation.service");

describe("rankWithTieBreak", () => {
  it("ordena por score desc e desempata por _origIndex desc", () => {
    const items = [
      { _origIndex: 0, score: 10 },
      { _origIndex: 1, score: 10 },
      { _origIndex: 2, score: 20 },
      { _origIndex: 3, score: 5 },
    ];

    const ranked = rankWithTieBreak(items);
    // primeiro o score 20
    expect(ranked[0].score).toBe(20);
    // depois os dois com score 10, mas _origIndex maior primeiro (1 antes de 0)
    expect(ranked[1]._origIndex).toBe(1);
    expect(ranked[2]._origIndex).toBe(0);

    expect(ranked[3].score).toBe(5);
  });

  it("não modifica o array original (retorna uma cópia ordenada)", () => {
    const items = [
      { _origIndex: 0, score: 1 },
      { _origIndex: 1, score: 2 },
    ];
    const copy = items.slice();
    const ranked = rankWithTieBreak(items);
    expect(ranked).not.toBe(items);

    expect(items).toEqual(copy);
  });
});

describe("getRecommendations", () => {
  const simpleProducts = [
    { id: "p1", name: "A" },
    { id: "p2", name: "B" },
    { id: "p3", name: "C" },
  ];

  it("retorna [] quando não há seleções e mode === 'MultipleProducts'", () => {
    const result = getRecommendations({}, simpleProducts, {});
    expect(result).toEqual([]);
  });

  it("retorna null quando não há seleções e mode === 'SingleProduct'", () => {
    const result = getRecommendations(
      { mode: "SingleProduct" },
      simpleProducts,
      {}
    );
    expect(result).toBeNull();
  });

  it("chama scoringStrategy para cada produto e usa selectionStrategies fornecido", () => {
    // scoring strategy que marca score = idx + 1 e detalhes fake
    const scoringStrategy = jest.fn((product, selections, options) => ({
      score: product.id === "p1" ? 5 : 1,
      details: { matched: [] },
    }));

    // selection strategy  um array contendo os product names
    const selectionStrategies = {
      MultipleProducts: jest.fn((valid) =>
        valid.map((v) => ({ name: v.product.name, score: v.score }))
      ),
    };

    const formData = {
      selectedPreferences: ["x"],
      selectedFeatures: [],
      mode: "MultipleProducts",
    };

    const result = getRecommendations(formData, simpleProducts, {
      scoringStrategy,
      selectionStrategies,
      minScore: 1,
    });

    // scoringStrategy foi chamado para cada produto
    expect(scoringStrategy).toHaveBeenCalledTimes(simpleProducts.length);

    // selectionStrategies.MultipleProducts foi chamado com o array 'valid'
    expect(selectionStrategies.MultipleProducts).toHaveBeenCalled();

    // o resultado segue o que o selectionStrategy devolveu
    expect(Array.isArray(result)).toBe(true);
    expect(result.some((r) => r.name === "A")).toBe(true);
  });

  it("filtra produtos abaixo de minScore", () => {
    // scoring que devolve 0 para todos
    const scoringStrategy = jest.fn(() => ({ score: 0, details: {} }));

    const formData = { selectedPreferences: ["p"], selectedFeatures: [] };

    const result = getRecommendations(formData, simpleProducts, {
      scoringStrategy,
      minScore: 1,
      // strategy que retornaria algo se recebesse items
      selectionStrategies: {
        MultipleProducts: (valid) => valid.map((v) => v.product),
      },
    });

    // nenhum válido -> deve retornar [] (modo default MultipleProducts)
    expect(result).toEqual([]);
  });

  it("quando uniqueTopOnly true e há empate no topo, retorna um único vencedor formatado", () => {
    // dois produtos com score 10 (empate)
    const scoringStrategy = jest.fn((product) => ({
      score: 10,
      details: { matched: [product.name] },
    }));

    const formData = { selectedPreferences: ["pref"], selectedFeatures: [] };

    const result = getRecommendations(formData, simpleProducts.slice(0, 2), {
      scoringStrategy,
      uniqueTopOnly: true,
      // selectionStrategies não será usado neste path pois uniqueTopOnly força escolher vencedor
    });

    // Como uniqueTopOnly true e topGroup.length > 1, a função deve retornar array com 1 vencedor (formato winnerFormatted)
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    const winner = result[0];
    // winner deve conter as props do produto original e score e _matchDetails
    expect(winner).toHaveProperty("id");
    expect(typeof winner.score).toBe("number");
    expect(winner).toHaveProperty("_matchDetails");
  });

  it("quando mode === 'SingleProduct' escolhe um único vencedor formatado (não array)", () => {
    // três produtos com scores diferentes, o de maior score deve ser retornado como objeto (SingleProduct)
    const scoringStrategy = jest.fn((product) => {
      const scoreMap = { p1: 5, p2: 8, p3: 3 };
      return { score: scoreMap[product.id] || 0, details: { matched: [] } };
    });

    const formData = {
      selectedPreferences: ["x"],
      selectedFeatures: [],
      mode: "SingleProduct",
    };

    const result = getRecommendations(formData, simpleProducts, {
      scoringStrategy,
      minScore: 1,
      // selectionStrategies não será utilizado no caminho de single winner quando shouldPickSingleWinner é true
    });

    // deve retornar um único objeto (winnerFormatted) quando mode SingleProduct
    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("id");
    // o id deve ser do produto com score mais alto (p2 no scoringStrategy acima)
    expect(result.id).toBe("p2");
    // também deve expor score e _matchDetails
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("_matchDetails");
  });
});
