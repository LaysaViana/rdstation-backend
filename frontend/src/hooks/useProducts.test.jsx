// src/hooks/useProducts.test.js
import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "./useProducts";
import getProducts from "../services/product.service";

jest.mock("../services/product.service");

describe("useProducts hook", () => {
  const originalSort = Array.prototype.sort;

  beforeEach(() => {
    // torna a "randomização" determinística: sort(() => Math.random()-0.5)
    // forço o sort a manter a ordem original (com comparator que retorna 0)
    jest.spyOn(Array.prototype, "sort").mockImplementation(function () {
      //originalSort com comparator que mantém ordem
      return originalSort.call(this, () => 0);
    });
  });

  afterEach(() => {
    // restaura o mock de sort e reseta os mocks do módulo
    Array.prototype.sort.mockRestore();
    jest.resetAllMocks();
  });

  test("fetches products and aggregates preferences and features", async () => {
    // dados de exemplo: dois produtos com arrays de preferência e features
    const sampleProducts = [
      {
        id: "p1",
        preferences: ["pref-a1", "pref-a2", "pref-a3"],
        features: ["feat-a1", "feat-a2", "feat-a3"],
      },
      {
        id: "p2",
        preferences: ["pref-b1", "pref-b2", "pref-b3"],
        features: ["feat-b1", "feat-b2", "feat-b3"],
      },
    ];

    // faz o mock resolver a promise com os dados
    getProducts.mockResolvedValue(sampleProducts);

    const { result } = renderHook(() => useProducts());

    // aguarda até que products seja preenchido
    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
    });

    // Verifica que products é exatamente o que veio do service
    expect(result.current.products).toEqual(sampleProducts);

    // Com a sort tornando estável, slice(0,2) pega os 2 primeiros itens de cada array
    const expectedPreferences = ["pref-a1", "pref-a2", "pref-b1", "pref-b2"];
    const expectedFeatures = ["feat-a1", "feat-a2", "feat-b1", "feat-b2"];

    expect(result.current.preferences).toEqual(expectedPreferences);
    expect(result.current.features).toEqual(expectedFeatures);

    // garante que o serviço foi chamado exatamente uma vez
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  test("handles error from getProducts gracefully (logs error and leaves arrays empty)", async () => {
    // força o getProducts a rejeitar
    const error = new Error("network");
    getProducts.mockRejectedValue(error);

    // espiona console.error para garantir que foi chamado
    const spyErr = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useProducts());

    // espera que a chamada seja efetuada e que products permaneça vazio
    await waitFor(() => {
      expect(result.current.products).toEqual([]);
    });

    // aguarda explicitamente que console.error tenha sido chamado
    await waitFor(() => {
      expect(spyErr).toHaveBeenCalled();
    });

    // restaura spy do console
    spyErr.mockRestore();
  });
});
