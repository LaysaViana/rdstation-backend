// src/utils/validateForm.js

export default function validateForm(formData = {}) {
  const errors = [];

  if (!formData.mode) {
    errors.push(
      'Por favor, selecione pelo menos uma preferência ou funcionalidade e escolha o tipo de recomendação'
    );
  }

  const selectedPreferences = Array.isArray(formData.selectedPreferences)
    ? formData.selectedPreferences
    : [];

  const selectedFeatures = Array.isArray(formData.selectedFeatures)
    ? formData.selectedFeatures
    : [];

  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    errors.push(
      'Por favor, selecione pelo menos uma preferência ou uma funcionalidade.'
    );
  }

  if (errors.length === 0) return null;

  return errors[0];
}
