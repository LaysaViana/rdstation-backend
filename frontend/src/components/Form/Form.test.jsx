// src/components/Form/Form.test.jsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useProducts", () => jest.fn());
jest.mock("../../hooks/useForm", () => jest.fn());

try {
  jest.mock("./Fields/Preferences", () => {
    const ReactLocal = require("react");
    return (props) =>
      ReactLocal.createElement("div", { "data-testid": "prefs", ...props });
  });
} catch (e) {}

try {
  jest.mock("./Fields/Features", () => {
    const ReactLocal = require("react");
    return (props) =>
      ReactLocal.createElement("div", { "data-testid": "features", ...props });
  });
} catch (e) {}

try {
  jest.mock("./Fields/RecommendationType", () => {
    const ReactLocal = require("react");
    return (props) =>
      ReactLocal.createElement("div", { "data-testid": "rtype", ...props });
  });
} catch (e) {}

try {
  require.resolve("./Fields");
  jest.mock("./Fields", () => {
    const ReactLocal = require("react");
    return {
      Preferences: (props) =>
        ReactLocal.createElement("div", { "data-testid": "prefs", ...props }),
      Features: (props) =>
        ReactLocal.createElement("div", {
          "data-testid": "features",
          ...props,
        }),
      RecommendationType: (props) =>
        ReactLocal.createElement("div", { "data-testid": "rtype", ...props }),
    };
  });
} catch (e) {}

// Mock do SubmitButton
jest.mock("../../components/Form/SubmitButton/SubmitButton", () => {
  const ReactLocal = require("react");
  return (props) =>
    ReactLocal.createElement(
      "button",
      {
        type: props.type || "button",
        "aria-busy": props.loading,
        disabled: props.loading,
      },
      props.children
    );
});

let Form;
try {
  Form = require("./Form").default;
} catch (err) {
  throw new Error(
    `Erro ao carregar ./Form. Verifique se o arquivo existe e se os mocks anteriores cobriram os exports.\nCaused by: ${err.message}`
  );
}

const useProducts = require("../../hooks/useProducts");
const useForm = require("../../hooks/useForm");

describe("Form component", () => {
  const defaultProducts = {
    preferences: ["Pref A", "Pref B"],
    features: ["Feat X", "Feat Y"],
  };

  beforeEach(() => {
    useProducts.mockReturnValue(defaultProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // garante que não fiquem timers fake ativos entre os testes
    try {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    } catch (e) {}
  });

  it("renderiza os campos (Preferences, Features, RecommendationType) e o botão", () => {
    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: "",
      },
      handleChange: jest.fn(),
    });

    render(React.createElement(Form, { onFormSubmit: jest.fn() }));

    expect(screen.getByTestId("prefs")).toBeInTheDocument();
    expect(screen.getByTestId("features")).toBeInTheDocument();
    expect(screen.getByTestId("rtype")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Obter Recomendação/i })
    ).toBeInTheDocument();
  });

  it("ao submeter chama onFormSubmit com os dados formatados", async () => {
    const handleChange = jest.fn();
    const formData = {
      selectedPreferences: ["Pref A"],
      selectedFeatures: ["Feat X"],
      selectedRecommendationType: "MultipleProducts",
    };
    useForm.mockReturnValue({ formData, handleChange });

    const onFormSubmit = jest.fn(() => Promise.resolve());
    render(React.createElement(Form, { onFormSubmit }));

    const btn = screen.getByRole("button", { name: /Obter Recomendação/i });

    const user = userEvent.setup();
    await user.click(btn);

    const expected = {
      selectedPreferences: formData.selectedPreferences,
      selectedFeatures: formData.selectedFeatures,
      mode: "MultipleProducts",
    };

    expect(onFormSubmit).toHaveBeenCalledWith(expected);
  });

  it("mostra loading (aria-busy) enquanto MIN_SPINNER_MS não termina", async () => {
    // simula form com seleções válidas
    const handleChange = jest.fn();
    const formData = {
      selectedPreferences: ["P1"],
      selectedFeatures: ["F1"],
      selectedRecommendationType: "SingleProduct",
    };
    useForm.mockReturnValue({ formData, handleChange });

    const onFormSubmit = jest.fn(() => Promise.resolve());

    // ativa timers fake para controlar MIN_SPINNER_MS
    jest.useFakeTimers();

    render(React.createElement(Form, { onFormSubmit }));

    const btn = screen.getByRole("button", { name: /Obter Recomendação/i });

    // integra userEvent com timers fake (avança timers quando necessário)
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    await user.click(btn);

    // imediatamente deve estar ocupado
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();

    // avança o tempo pelo MIN_SPINNER_MS (500ms) — ajuste se o seu componente usa outro valor
    await act(async () => {
      jest.advanceTimersByTime(500);

      await Promise.resolve();
      await Promise.resolve();
    });

    expect(btn).not.toHaveAttribute("aria-busy", "true");
    expect(btn).not.toBeDisabled();
  });
});
