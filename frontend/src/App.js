import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import getProducts from './services/product.service';
import getRecommendations from './services/recommendation.service';
import { Footer } from './components/Footer/Footer';
import { useThemeMode } from './context/ThemeContext';

function App() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationType, setRecommendationType] = useState('');
  const [formError, setFormError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  // Valida o formulário
  const validateForm = (formData) => {
    if (!formData.mode) return 'Por favor, selecione um tipo de recomendação.';
    if (
      !formData.selectedPreferences?.length ||
      !formData.selectedFeatures?.length
    )
      return 'Por favor, selecione ao menos uma preferência e uma funcionalidade.';
    return null;
  };

  const computeRecommendations = (formData) => {
    const result = getRecommendations(formData, products);
    return formData.mode === 'SingleProduct'
      ? result
        ? [result]
        : []
      : result;
  };

  const handleFormSubmit = (formData) => {
    setHasSearched(true);
    setRecommendations([]);
    setFormError('');

    const error = validateForm(formData);
    if (error) {
      setFormError(error);
      return;
    }

    setRecommendationType(formData.mode);

    const computed = computeRecommendations(formData);
    if (!computed || computed.length === 0) {
      setFormError('Nenhuma recomendação encontrada para o tipo selecionado.');
      return;
    }

    setRecommendations(computed);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Botão de alternar tema */}
        <Button
          variant="outlined"
          onClick={toggleTheme}
          sx={{
            alignSelf: 'flex-end',
            m: 2,
            borderColor: theme.palette.text.secondary,
            color: theme.palette.text.secondary,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            },
          }}
        >
          <img
            src={mode === 'dark' ? '/sun.png' : '/moon.png'}
            alt="Alternar tema"
            width={22}
            height={22}
          />
        </Button>

        {/* Header azul */}
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: 2,
            textAlign: 'center',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: 'white', mb: 2 }}
          >
            Recomendador de Produtos RD Station
          </Typography>

          <Typography
            variant="body1"
            sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
          >
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </Typography>
        </Box>

        {/* Paper branco full width */}
        <Box
          component={Paper}
          elevation={6}
          square
          sx={{
            width: '100%',
            flexGrow: 1,
            boxSizing: 'border-box',
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: theme.palette.background.paper,
            transition: 'background-color 0.3s ease',
          }}
        >
          <Form onFormSubmit={handleFormSubmit} />

          {formError && hasSearched && (
            <Typography
              variant="body1"
              sx={{ mt: 2, color: 'error.main', textAlign: 'center' }}
            >
              {formError}
            </Typography>
          )}

          {recommendations.length > 0 && (
            <RecommendationList
              recommendations={recommendations}
              mode={recommendationType}
            />
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default App;
