// src/hooks/useForm.test.js
import { renderHook, act } from "@testing-library/react";
import useForm from "./useForm";

describe("useForm (mínimo)", () => {
  it("retorna o estado inicial", () => {
    const initial = { a: 1, b: 2 };

    const { result } = renderHook(() => useForm(initial));

    expect(result.current.formData).toEqual(initial);
  });

  it("atualiza o campo correto via handleChange", () => {
    const initial = { a: 1, b: 2 };

    const { result } = renderHook(() => useForm(initial));

    act(() => {
      result.current.handleChange("a", 10);
    });

    expect(result.current.formData).toEqual({ a: 10, b: 2 });
  });
});
