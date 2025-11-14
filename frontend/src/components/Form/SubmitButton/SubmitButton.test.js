// src/components/SubmitButton/SubmitButton.test.js

import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('renderiza o botão com o texto correto', () => {
    const buttonText = 'Enviar';
    render(<SubmitButton text={buttonText} />);

    // Verifica se o botão está no documento
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();

    // Verifica se o botão tem type="submit"
    expect(button).toHaveAttribute('type', 'submit');

    // Opcional: verificar se a classe foi aplicada
    expect(button).toHaveClass(
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    );
  });
});
