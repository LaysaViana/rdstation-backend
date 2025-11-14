// Antes de importar o componente
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../theme';

// Mock do hook useThemeMode
jest.mock('../../../context/ThemeContext', () => ({
  useThemeMode: () => ({ mode: 'light' }),
}));

import Features from './Features';

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Features', () => {
  const featuresList = ['Feature 1', 'Feature 2', 'Feature 3'];

  it('renderiza todas as funcionalidades', () => {
    renderWithTheme(
      <Features
        features={featuresList}
        selectedFeatures={[]}
        onFeatureChange={jest.fn()}
      />
    );

    featuresList.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('marca as funcionalidades selecionadas inicialmente', () => {
    renderWithTheme(
      <Features
        features={featuresList}
        selectedFeatures={['Feature 2']}
        onFeatureChange={jest.fn()}
      />
    );

    const checkedCheckbox = screen.getByRole('checkbox', {
      name: /Feature 2/i,
    });
    expect(checkedCheckbox).toBeChecked();

    const uncheckedCheckbox = screen.getByRole('checkbox', {
      name: /Feature 1/i,
    });
    expect(uncheckedCheckbox).not.toBeChecked();
  });

  it('chama onFeatureChange ao clicar em uma funcionalidade', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <Features
        features={featuresList}
        selectedFeatures={[]}
        onFeatureChange={handleChange}
      />
    );

    const featureCheckbox = screen.getByRole('checkbox', {
      name: /Feature 1/i,
    });
    fireEvent.click(featureCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Feature 1']);

    // clicar novamente remove a seleção
    fireEvent.click(featureCheckbox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});
