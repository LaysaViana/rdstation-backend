// src/shared/Checkbox.test.jsx
import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Checkbox } from '../../shared/Checkbox/Checkbox';

describe('Checkbox component (sem acesso direto ao DOM)', () => {
  it('renderiza o input checkbox com id e name', () => {
    render(<Checkbox id="cb1" name="testCheck" aria-label="cb-label" />);

    const input = screen.getByRole('checkbox', { name: 'cb-label' });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'cb1');
    expect(input).toHaveAttribute('name', 'testCheck');
  });

  it("reflete o estado 'checked' corretamente", () => {
    const { rerender } = render(
      <Checkbox id="cb2" checked={false} aria-label="cb2" />
    );
    const input = screen.getByRole('checkbox', { name: 'cb2' });

    expect(input).not.toBeChecked();

    // altera prop checked e re-renderiza
    rerender(<Checkbox id="cb2" checked={true} aria-label="cb2" />);
    expect(input).toBeChecked();
  });

  it('dispara onChange quando clicado (usuário real)', async () => {
    const handleChange = jest.fn();

    render(<Checkbox id="cb3" onChange={handleChange} aria-label="cb3" />);
    const input = screen.getByRole('checkbox', { name: 'cb3' });

    const user = userEvent.setup();
    await user.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("aplica classes no input via inputClassName e mantém a classe base 'checkbox'", () => {
    render(<Checkbox id="cb5" inputClassName="input-bar" aria-label="cb5" />);

    const input = screen.getByRole('checkbox', { name: 'cb5' });

    expect(input).toHaveClass('checkbox');
    expect(input).toHaveClass('input-bar');
  });

  it('forwardRef funciona e aponta para o input element', () => {
    const ref = createRef();

    render(<Checkbox id="cb7" ref={ref} aria-label="cb7" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe('INPUT');
    expect(ref.current.type).toBe('checkbox');
  });

  it('passa props extras para o input (ex.: data-testid)', () => {
    render(<Checkbox id="cb8" data-testid="my-checkbox" aria-label="cb8" />);

    const input = screen.getByTestId('my-checkbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
  });
});
