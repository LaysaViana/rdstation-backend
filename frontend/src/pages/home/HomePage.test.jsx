// src/pages/home/Home.page.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import HomePage from "./Home.page";

import getProducts from "../../services/product.service";
import recommendationServiceDefault, {
  getRecommendations as getRecommendationsNamed,
} from "../../services/recommendation.service";
import validateForm from "../../validation/validateForm";

jest.mock("../../services/product.service", () => jest.fn());
jest.mock("../../services/recommendation.service", () => ({
  __esModule: true,
  default: { getRecommendations: jest.fn() },
  getRecommendations: jest.fn(),
}));

jest.mock("../../validation/validateForm", () => jest.fn());

jest.mock("../../components/Form/Form", () => {
  return function MockForm({ onFormSubmit }) {
    return (
      <button
        data-testid="mock-form-submit"
        onClick={() => onFormSubmit({ mode: "MultipleProducts", test: true })}
      >
        Enviar
      </button>
    );
  };
});

jest.mock("../../components/RecommendationList/RecommendationList", () => {
  return function MockRecommendationList({ recommendations }) {
    return (
      <div data-testid="mock-recommendation-list">
        {recommendations?.map((r, i) => <div key={i}>{r.name}</div>) ?? null}
      </div>
    );
  };
});

// -------------------- HELPERS --------------------

// setup padrão para reduzir repetição do render em cada teste
const setup = async ({
  products = [],
  validateReturn = "",
  namedRecommendations = undefined,
  defaultRecommendations = undefined,
} = {}) => {
  getProducts.mockResolvedValue(products);

  // recommendationService pode ter both named and default mocked functions:
  if (typeof getRecommendationsNamed === "function") {
    getRecommendationsNamed.mockReset();
    if (namedRecommendations !== undefined) {
      getRecommendationsNamed.mockReturnValue(namedRecommendations);
    } else {
      getRecommendationsNamed.mockReturnValue(defaultRecommendations);
    }
  }

  if (
    recommendationServiceDefault &&
    typeof recommendationServiceDefault.getRecommendations === "function"
  ) {
    recommendationServiceDefault.getRecommendations.mockReset();
    if (defaultRecommendations !== undefined) {
      recommendationServiceDefault.getRecommendations.mockReturnValue(
        defaultRecommendations
      );
    } else {
      recommendationServiceDefault.getRecommendations.mockReturnValue(
        namedRecommendations
      );
    }
  }

  validateForm.mockReset();
  validateForm.mockReturnValue(validateReturn);

  // render do HomePage (cada chamada retorna um novo DOM isolado)
  const utils = render(<HomePage />);
  return { ...utils };
};

// -------------------- TEST SUITE --------------------
describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("faz fetch de produtos ao montar o componente", async () => {
    await setup({ products: [{ id: 1 }, { id: 2 }] });

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });

  test("exibe erro de validação quando validateForm retorna uma mensagem", async () => {
    await setup({ products: [], validateReturn: "Erro de validação" });

    await userEvent.click(screen.getByTestId("mock-form-submit"));

    expect(await screen.findByText("Erro de validação")).toBeInTheDocument();
  });

  test("chama a função de recomendação e renderiza RecommendationList quando houver recomendações", async () => {
    // products presentes, validate ok, named export retorna resultado
    await setup({
      products: [{ id: "p1" }],
      validateReturn: "",
      namedRecommendations: [{ name: "Produto A" }],
    });

    await userEvent.click(screen.getByTestId("mock-form-submit"));

    //checa que qualquer uma das funções foi chamada (named ou default)
    const namedCalled =
      typeof getRecommendationsNamed === "function" &&
      getRecommendationsNamed.mock.calls.length > 0;
    const defaultCalled =
      recommendationServiceDefault &&
      typeof recommendationServiceDefault.getRecommendations === "function" &&
      recommendationServiceDefault.getRecommendations.mock.calls.length > 0;

    expect(namedCalled || defaultCalled).toBe(true);

    // Renderização da RecommendationList
    expect(
      await screen.findByTestId("mock-recommendation-list")
    ).toBeInTheDocument();

    expect(screen.getByText("Produto A")).toBeInTheDocument();
  });

  test("mostra erro quando nenhuma recomendação é retornada", async () => {
    await setup({
      products: [{ id: "p1" }],
      validateReturn: "",
      // force empty recommendation
      namedRecommendations: [],
    });

    await userEvent.click(screen.getByTestId("mock-form-submit"));

    expect(
      await screen.findByText(
        "Nenhuma recomendação encontrada para o tipo selecionado."
      )
    ).toBeInTheDocument();
  });
});
