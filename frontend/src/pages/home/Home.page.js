// src/pages/home/Home.page.jsx
import { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Form from '../../components/Form/Form';
import RecommendationList from '../../components/RecommendationList/RecommendationList';
import getProducts from '../../services/product.service';
import recommendationServiceDefault, {
  getRecommendations as getRecommendationsNamed,
} from '../../services/recommendation.service';
import validateForm from '../../validation/validateForm';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationType, setRecommendationType] = useState('');
  const [formError, setFormError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const recommendFn =
    typeof getRecommendationsNamed === 'function'
      ? getRecommendationsNamed
      : recommendationServiceDefault &&
        typeof recommendationServiceDefault.getRecommendations === 'function'
      ? recommendationServiceDefault.getRecommendations
      : null;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getProducts();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erro ao buscar produtos', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const computeRecommendations = useCallback(
    (formData) => {
      if (!recommendFn) {
        console.warn(
          'Função de recomendação não encontrada. Verifique services.'
        );
        return [];
      }

      const options = {
        weightPreference: 2,
        weightFeature: 1,
        normalizeToPercentage: false, //número bruto
        minScore: 1,
        uniqueTopOnly: true,
      };

      try {
        const raw = recommendFn(formData, products, options);
        const ensureScore = (item) => {
          if (!item) return item;
          if (typeof item.score === 'number') return item;
          if (typeof item.scoreNormalized === 'number') {
            return { ...item, score: Math.round(item.scoreNormalized) };
          }
          return { ...item, score: 0 };
        };

        if (formData.mode === 'SingleProduct') {
          return raw ? [ensureScore(raw)] : [];
        }

        return Array.isArray(raw) ? raw.map(ensureScore) : [];
      } catch (err) {
        console.error('Erro ao computar recomendações', err);
        return [];
      }
    },
    [products, recommendFn]
  );

  const handleFormSubmit = useCallback(
    (formData) => {
      setHasSearched(true);
      setRecommendations([]);
      setFormError('');

      const error = validateForm(formData);
      if (error) {
        setFormError(error);
        return;
      }

      setRecommendationType(formData.mode || 'MultipleProducts');

      const computed = computeRecommendations(formData);

      if (!computed || computed.length === 0) {
        setFormError(
          'Nenhuma recomendação encontrada para o tipo selecionado.'
        );
        return;
      }

      setRecommendations(computed);
    },
    [computeRecommendations]
  );

  return (
    <Box className="app-bg w-full min-h-dvh">
      <div className="page-inner w-full mx-auto max-w-7xl px-4 md:px-6 py-10">
        <div className="max-w-4xl mx-auto mb-8 text-muted">
          <Typography variant="body1" component="p" sx={{ lineHeight: 1.7 }}>
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </Typography>
        </div>

        <Form onFormSubmit={handleFormSubmit} />

        {formError && hasSearched && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {formError}
          </Typography>
        )}
      </div>

      {recommendations?.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
            <RecommendationList
              recommendations={recommendations}
              mode={recommendationType}
            />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
