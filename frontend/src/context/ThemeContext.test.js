import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useThemeMode } from './ThemeContext';

// Um componente de teste que consome o contexto
const TestComponent = () => {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeModeProvider', () => {
  test('inicializa com modo light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const modeSpan = screen.getByTestId('mode');
    expect(modeSpan.textContent).toBe('light');
  });

  test('toggleTheme alterna entre light e dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const modeSpan = screen.getByTestId('mode');
    const button = screen.getByRole('button', { name: /toggle/i });

    // Inicialmente light
    expect(modeSpan.textContent).toBe('light');

    // Alterna para dark
    fireEvent.click(button);
    expect(modeSpan.textContent).toBe('dark');

    // Alterna de volta para light
    fireEvent.click(button);
    expect(modeSpan.textContent).toBe('light');
  });
});
