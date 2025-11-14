import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../theme';
import Preferences from './Preferences';

jest.mock('../../../context/ThemeContext', () => ({
  useThemeMode: () => ({ mode: 'light' }),
}));

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Preferences', () => {
  const preferencesList = ['Pref 1', 'Pref 2', 'Pref 3'];

  it('renderiza todas as preferências', () => {
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

  it('marca as preferências selecionadas inicialmente', () => {
    renderWithTheme(
      <Preferences
        preferences={preferencesList}
        selectedPreferences={['Pref 2']}
        onPreferenceChange={jest.fn()}
      />
    );

    // Para cada preferência, pegar o Box que contém o texto
    const pref2Box = screen.getByText('Pref 2').closest('div');
    const pref2Checkbox = within(pref2Box).getByRole('checkbox');
    expect(pref2Checkbox.checked).toBe(true);

    const pref1Box = screen.getByText('Pref 1').closest('div');
    const pref1Checkbox = within(pref1Box).getByRole('checkbox');
    expect(pref1Checkbox.checked).toBe(false);
  });

  it('chama onPreferenceChange ao clicar em uma preferência', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <Preferences
        preferences={preferencesList}
        selectedPreferences={[]}
        onPreferenceChange={handleChange}
      />
    );

    const pref1Box = screen.getByText('Pref 1').closest('div');
    const pref1Checkbox = within(pref1Box).getByRole('checkbox');

    // Clicar no checkbox
    fireEvent.click(pref1Checkbox);
    expect(handleChange).toHaveBeenCalledWith(['Pref 1']);

    fireEvent.click(pref1Checkbox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});
