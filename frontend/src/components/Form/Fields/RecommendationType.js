import React from 'react';
import Checkbox from '../../shared/Checkbox';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../../context/ThemeContext';

function RecommendationType({ onRecommendationTypeChange }) {
  const theme = useTheme();
  const { mode } = useThemeMode();

  // Fundo dinâmico baseado no theme
  const backgroundColor =
    mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.background.paper;

  const borderColor =
    mode === 'dark'
      ? theme.palette.secondary.main + '33'
      : theme.palette.primary.main + '22';

  return (
    <div
      style={{
        marginBottom: '16px',
        backgroundColor,
        padding: '20px',
        borderRadius: '10px',
        border: `1px solid ${borderColor}`,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        boxShadow:
          mode === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <h2
        style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          marginBottom: '12px',
          color: theme.palette.text.primary,
        }}
      >
        Tipo de Recomendação:
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          color: theme.palette.text.primary,
        }}
      >
        {/* Produto Único */}
        <label
          htmlFor="SingleProduct"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Checkbox
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            onChange={() => onRecommendationTypeChange('SingleProduct')}
            style={{
              accentColor: theme.palette.primary.main,
            }}
          />
          Produto Único
        </label>

        {/* Múltiplos Produtos */}
        <label
          htmlFor="MultipleProducts"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Checkbox
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
            style={{
              accentColor: theme.palette.primary.main,
            }}
          />
          Múltiplos Produtos
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
