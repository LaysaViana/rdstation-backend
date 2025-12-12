import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../../../../theme";
import Preferences from "./Preferences";

jest.mock("../../../../context/ThemeContext", () => ({
  useThemeMode: () => ({ mode: "light" }),
}));

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe("Preferences", () => {
  const preferencesList = ["Pref 1", "Pref 2", "Pref 3"];

  it("renderiza todas as preferências", () => {
    renderWithTheme(
      <Preferences
        preferences={preferencesList}
        selectedPreferences={[]}
        onPreferenceChange={jest.fn()}
      />
    );

    preferencesList.forEach((pref) => {
      expect(screen.getByText(pref)).toBeInTheDocument();
    });
  });

  it("marca as preferências selecionadas inicialmente", () => {
    renderWithTheme(
      <Preferences
        preferences={preferencesList}
        selectedPreferences={["Pref 2"]}
        onPreferenceChange={jest.fn()}
      />
    );

    // seleciona o item pelo role 'button' usando o texto como nome acessível
    const pref2Button = screen.getByRole("button", { name: /Pref 2/i });
    const pref2Checkbox = within(pref2Button).getByRole("checkbox");
    expect(pref2Checkbox).toBeChecked();

    const pref1Button = screen.getByRole("button", { name: /Pref 1/i });
    const pref1Checkbox = within(pref1Button).getByRole("checkbox");
    expect(pref1Checkbox).not.toBeChecked();
  });

  it("chama onPreferenceChange ao clicar em uma preferência", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    renderWithTheme(
      <Preferences
        preferences={preferencesList}
        selectedPreferences={[]}
        onPreferenceChange={handleChange}
      />
    );

    const pref1Button = screen.getByRole("button", { name: /Pref 1/i });
    const pref1Checkbox = within(pref1Button).getByRole("checkbox");

    // clicar no checkbox (simula usuário)
    await user.click(pref1Checkbox);
    expect(handleChange).toHaveBeenCalledWith(["Pref 1"]);

    // clicar novamente remove a seleção
    await user.click(pref1Checkbox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});
