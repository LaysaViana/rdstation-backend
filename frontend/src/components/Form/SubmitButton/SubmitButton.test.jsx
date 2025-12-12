// SubmitButton.test.jsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmitButton from "./SubmitButton";

describe("SubmitButton", () => {
  it("renderiza o texto children quando não está carregando", () => {
    render(<SubmitButton>Enviar</SubmitButton>);
    const btn = screen.getByRole("button", { name: /Enviar/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toHaveAttribute("aria-busy", "true");
  });

  it("usa aria-label quando children é um string (fallback)", () => {
    render(<SubmitButton>Enviar</SubmitButton>);
    const btn = screen.getByRole("button", { name: /Enviar/i });
    expect(btn).toHaveAttribute("aria-label", "Enviar");
  });

  it("usa ariaLabel quando fornecido (override)", () => {
    render(<SubmitButton ariaLabel="Salvar formulário">Enviar</SubmitButton>);
    const btn = screen.getByRole("button", { name: /Salvar formulário/i });
    expect(btn).toHaveAttribute("aria-label", "Salvar formulário");
  });

  it("mostra estado de loading com spinner e aria-busy", () => {
    render(<SubmitButton loading>Enviar</SubmitButton>);

    // pega o botão (único) por role
    const btn = screen.getByRole("button");

    // verifica o texto visível de loading dentro do botão (sem querySelector)
    expect(within(btn).getByText(/Carregando.../i)).toBeInTheDocument();

    // botão marcado como ocupado
    expect(btn).toHaveAttribute("aria-busy", "true");

    // botão desabilitado enquanto loading
    expect(btn).toBeDisabled();
  });

  it("onClick não é chamado quando loading", async () => {
    const user = userEvent.setup();
    const fn = jest.fn();
    render(
      <SubmitButton loading onClick={fn}>
        Enviar
      </SubmitButton>
    );

    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(fn).not.toHaveBeenCalled();
  });

  it("fica desabilitado quando prop disabled é true", () => {
    render(<SubmitButton disabled>Enviar</SubmitButton>);
    const btn = screen.getByRole("button", { name: /Enviar/i });
    expect(btn).toBeDisabled();

    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("chama onClick quando habilitado e não loading", async () => {
    const user = userEvent.setup();
    const fn = jest.fn();
    render(<SubmitButton onClick={fn}>Enviar</SubmitButton>);

    const btn = screen.getByRole("button", { name: /Enviar/i });
    await user.click(btn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("aceita prop type (submit/reset/button) e aplica corretamente", () => {
    const { rerender } = render(
      <SubmitButton type="submit">Enviar</SubmitButton>
    );
    let btn = screen.getByRole("button", { name: /Enviar/i });
    expect(btn).toHaveAttribute("type", "submit");

    rerender(<SubmitButton type="reset">Reset</SubmitButton>);
    btn = screen.getByRole("button", { name: /Reset/i });
    expect(btn).toHaveAttribute("type", "reset");

    rerender(<SubmitButton type="button">Button</SubmitButton>);
    btn = screen.getByRole("button", { name: /Button/i });
    expect(btn).toHaveAttribute("type", "button");
  });
});
