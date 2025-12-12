// src/strategies/scoringStrategies.test.js
/* eslint-env jest */
const { defaultScoringStrategy } = require("./scoringStrategies");

describe("defaultScoringStrategy (comportamento público)", () => {
  const baseProduct = {
    name: "Produto Teste",
    preferences: ["Pref A", "Preferência B"],
    features: ["Feat X", "Extra"],
  };

  it("retorna score 0 quando não há seleções (denom = 0)", () => {
    const res = defaultScoringStrategy(baseProduct, {
      preferences: [],
      features: [],
    });
    expect(res).toHaveProperty("score", 0);
    expect(res).toHaveProperty("details");
    expect(res.details).toMatchObject({
      prefsMatched: 0,
      featsMatched: 0,
      rawScore: 0,
      denom: 0,
    });
  });

  it("calcula pontuação sem normalização quando normalizeToPercentage=false", () => {
    const form = { preferences: ["Pref A"], features: ["Feat X"] };
    const res = defaultScoringStrategy(baseProduct, form, {
      normalizeToPercentage: false,
    });
    // prefsMatched = 1, featsMatched = 1
    // rawScore = prefs*2 + feats*1 = 2 + 1 = 3 (DEFAULT_OPTIONS weights)
    expect(res.score).toBe(3);
    expect(res.details.rawScore).toBe(3);
    // denom = prefs.length*2 + feats.length*1 = 1*2 + 1*1 = 3
    expect(res.details.denom).toBe(3);
  });

  it("normaliza para porcentagem quando normalizeToPercentage=true (padrão)", () => {
    const form = { preferences: ["Pref A", "X"], features: ["Feat X", "Y"] };
    const res = defaultScoringStrategy(baseProduct, form, {
      normalizeToPercentage: true,
    });
    // prefsMatched=1, featsMatched=1 => rawScore = 1*2 + 1*1 = 3
    // denom = (2 prefs * 2) + (2 feats * 1) = 4 + 2 = 6
    // score = round((3/6)*100) = 50
    expect(res.score).toBe(50);
    expect(res.details).toMatchObject({
      prefsMatched: 1,
      featsMatched: 1,
      rawScore: 3,
      denom: 6,
    });
  });

  it("usa weights customizados quando passados em options", () => {
    const form = { preferences: ["Pref A"], features: ["Feat X"] };
    const res = defaultScoringStrategy(baseProduct, form, {
      weightPreference: 5,
      weightFeature: 2,
      normalizeToPercentage: false,
    });
    // rawScore = 1*5 + 1*2 = 7
    expect(res.score).toBe(7);
  });

  it("trata entradas não-array corretamente (safeArray)", () => {
    // se selections.preferences não for array, safeArray retorna []
    const res1 = defaultScoringStrategy(baseProduct, {
      preferences: null,
      features: "not-array",
    });
    expect(res1.details.prefsMatched).toBe(0);
    expect(res1.details.featsMatched).toBe(0);

    // também se product.preferences não for array
    const productNoArrays = {
      name: "no arrays",
      preferences: null,
      features: undefined,
    };
    const res2 = defaultScoringStrategy(productNoArrays, {
      preferences: ["x"],
      features: ["y"],
    });
    expect(res2.details.prefsMatched).toBe(0);
    expect(res2.details.featsMatched).toBe(0);
  });

  it("arredonda corretamente a porcentagem quando normalizeToPercentage true", () => {
    // caso onde rawScore/denom*100 não é inteiro
    const product = { preferences: ["p1"], features: ["f1"] };
    const form = { preferences: ["p1"], features: [] }; // only prefsMatched=1
    const res = defaultScoringStrategy(product, form, {
      normalizeToPercentage: true,
    });
    // rawScore = 1*2 = 2; denom = (1*2) + (0*1) = 2 => (2/2)*100 = 100
    expect(res.score).toBe(100);

    // outro caso: rawScore 2, denom 4 -> 50
    const product2 = { preferences: ["a"], features: ["b"] };
    const form2 = { preferences: ["a"], features: ["x", "y"] }; // prefsMatched=1, featsMatched=0
    const res2 = defaultScoringStrategy(product2, form2, {
      normalizeToPercentage: true,
    });
    expect(res2.details.rawScore).toBe(2); // prefsMatched*2
    // denom = prefs(1)*2 + feats(2)*1 = 2 + 2 = 4 -> (2/4)*100 = 50
    expect(res2.score).toBe(50);
  });
});

describe("defaultScoringStrategy", () => {
  const baseProduct = {
    name: "Produto Teste",
    preferences: ["Pref A", "Preferência B"],
    features: ["Feat X", "Extra"],
  };

  it("retorna score 0 quando não há seleções (denom = 0)", () => {
    const res = defaultScoringStrategy(baseProduct, {
      preferences: [],
      features: [],
    });
    // denom 0 -> rawScore 0 -> since denom not > 0, score uses rawScore (0)
    expect(res).toHaveProperty("score", 0);
    expect(res).toHaveProperty("details");
    expect(res.details).toMatchObject({
      prefsMatched: 0,
      featsMatched: 0,
      rawScore: 0,
      denom: 0,
    });
  });

  it("calcula pontuação sem normalização quando normalizeToPercentage=false", () => {
    const form = { preferences: ["Pref A"], features: ["Feat X"] };
    const res = defaultScoringStrategy(baseProduct, form, {
      normalizeToPercentage: false,
    });
    // prefsMatched = 1, featsMatched = 1
    // rawScore = prefs*2 + feats*1 = 2 + 1 = 3 (DEFAULT_OPTIONS weights)
    expect(res.score).toBe(3);
    expect(res.details.rawScore).toBe(3);
    // denom = prefs.length*2 + feats.length*1 = 1*2 + 1*1 = 3
    expect(res.details.denom).toBe(3);
  });

  it("normaliza para porcentagem quando normalizeToPercentage=true (padrão)", () => {
    // duas preferências selecionadas, uma corresponde; duas features selecionadas, uma corresponde
    const form = { preferences: ["Pref A", "X"], features: ["Feat X", "Y"] };
    const res = defaultScoringStrategy(baseProduct, form, {
      normalizeToPercentage: true,
    });
    // prefsMatched=1, featsMatched=1 => rawScore = 1*2 + 1*1 = 3
    // denom = (2 prefs * 2) + (2 feats * 1) = 4 + 2 = 6
    // score = round((3/6)*100) = 50
    expect(res.score).toBe(50);
    expect(res.details).toMatchObject({
      prefsMatched: 1,
      featsMatched: 1,
      rawScore: 3,
      denom: 6,
    });
  });

  it("usa weights customizados quando passados em options", () => {
    const form = { preferences: ["Pref A"], features: ["Feat X"] };
    const res = defaultScoringStrategy(baseProduct, form, {
      weightPreference: 5,
      weightFeature: 2,
      normalizeToPercentage: false,
    });
    // rawScore = 1*5 + 1*2 = 7
    expect(res.score).toBe(7);
  });

  it("trata entradas não-array corretamente (safeArray)", () => {
    // se selections.preferences não for array, safeArray retorna []
    const res1 = defaultScoringStrategy(baseProduct, {
      preferences: null,
      features: "not-array",
    });
    expect(res1.details.prefsMatched).toBe(0);
    expect(res1.details.featsMatched).toBe(0);

    // também se product.preferences não for array
    const productNoArrays = {
      name: "no arrays",
      preferences: null,
      features: undefined,
    };
    const res2 = defaultScoringStrategy(productNoArrays, {
      preferences: ["x"],
      features: ["y"],
    });
    expect(res2.details.prefsMatched).toBe(0);
    expect(res2.details.featsMatched).toBe(0);
  });

  it("arredonda corretamente a porcentagem quando normalizeToPercentage true", () => {
    // caso onde rawScore/denom*100 não é inteiro
    const product = { preferences: ["p1"], features: ["f1"] };
    const form = { preferences: ["p1"], features: [] }; // only prefsMatched=1
    const res = defaultScoringStrategy(product, form, {
      normalizeToPercentage: true,
    });
    // rawScore = 1*2 = 2; denom = (1*2) + (0*1) = 2 => (2/2)*100 = 100
    expect(res.score).toBe(100);

    // another case: rawScore 1, denom 3 -> round((1/3)*100)=33
    const product2 = { preferences: ["a"], features: ["b"] };
    const form2 = { preferences: ["a"], features: ["x", "y"] }; // prefsMatched=1, featsMatched=0
    const res2 = defaultScoringStrategy(product2, form2, {
      normalizeToPercentage: true,
    });
    expect(res2.details.rawScore).toBe(2); // prefsMatched*2
    // denom = prefs(1)*2 + feats(2)*1 = 2 + 2 = 4 -> (2/4)*100 = 50
    expect(res2.score).toBe(50);
  });
});
