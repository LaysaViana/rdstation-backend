import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Preferences, Features, RecommendationType } from './Fields';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import SubmitButton from '../../components/Form/SubmitButton/SubmitButton';

export default function Form({ onFormSubmit }) {
  const { preferences, features } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const MIN_SPINNER_MS = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = Date.now();
    setIsSubmitting(true);

    const formattedData = {
      selectedPreferences: formData.selectedPreferences,
      selectedFeatures: formData.selectedFeatures,
      mode:
        formData.selectedRecommendationType === 'MultipleProducts'
          ? 'MultipleProducts'
          : formData.selectedRecommendationType === 'SingleProduct'
          ? 'SingleProduct'
          : null,
    };

    try {
      if (onFormSubmit) {
        await Promise.resolve(onFormSubmit(formattedData));
      }
    } finally {
      const elapsed = Date.now() - start;
      const remaining = MIN_SPINNER_MS - elapsed;
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="w-full">
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="glass-card inner h-full">
            <Typography
              className="text-muted"
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Preferências
            </Typography>

            <div className="space-y-2">
              <Preferences
                className=""
                preferences={preferences}
                selectedPreferences={formData.selectedPreferences}
                onPreferenceChange={(selected) =>
                  handleChange('selectedPreferences', selected)
                }
              />
            </div>
          </div>

          <div className="glass-card inner h-full">
            <Typography
              className="text-muted"
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Funcionalidades
            </Typography>

            <div className="space-y-2">
              <Features
                className=""
                features={features}
                selectedFeatures={formData.selectedFeatures}
                onFeatureChange={(selected) =>
                  handleChange('selectedFeatures', selected)
                }
              />
            </div>
          </div>

          <div className="glass-card inner h-full flex items-center justify-center">
            <div className="text-center px-2">
              <Typography
                variant="body2"
                sx={{ color: 'var(--muted)', lineHeight: 1.5 }}
              >
                Selecione suas preferências e funcionalidades, selecione o tipo
                de recomendação e clique em <strong>Obter Recomendação</strong>
              </Typography>
            </div>
          </div>

          <div className="glass-card inner h-full">
            <RecommendationType
              className=""
              value={formData.selectedRecommendationType}
              onRecommendationTypeChange={(selected) =>
                handleChange('selectedRecommendationType', selected)
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <div className="w-full max-w-xs">
              <SubmitButton
                type="submit"
                loading={isSubmitting}
                className="w-full"
              >
                ⚡ Obter Recomendação
              </SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
