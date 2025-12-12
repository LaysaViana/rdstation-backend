// src/hooks/useRecommendations.test.jsx
import { renderHook, act } from "@testing-library/react";
import useRecommendations from "./useRecommendations";

jest.mock("../services/recommendation.service", () => ({
  getRecommendations: jest.fn(),
}));

const recommendationService = require("../services/recommendation.service");

describe("useRecommendations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("expõe estado inicial corretamente", () => {
    const { result } = renderHook(() => useRecommendations([]));
    expect(result.current.recommendations).toEqual([]);
    expect(typeof result.current.getRecommendations).toBe("function");
    expect(typeof result.current.setRecommendations).toBe("function");
  });

  test("getRecommendations repassa (formData, products) para o service", () => {
    const mockProducts = [{ id: 1 }, { id: 2 }];
    const mockFormData = { name: "test" };

    const fakeResponse = ["A", "B"];
    recommendationService.getRecommendations.mockReturnValue(fakeResponse);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const response = result.current.getRecommendations(mockFormData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledTimes(1);
    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      mockFormData,
      mockProducts
    );

    expect(response).toBe(fakeResponse);
  });

  test("setRecommendations atualiza o estado corretamente", () => {
    const { result } = renderHook(() => useRecommendations([]));
    act(() => {
      result.current.setRecommendations(["rec1", "rec2"]);
    });
    expect(result.current.recommendations).toEqual(["rec1", "rec2"]);
  });
});
