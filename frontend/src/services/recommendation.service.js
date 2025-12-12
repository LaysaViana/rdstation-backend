import { selectionStrategies as defaultSelectionStrategies } from '../strategies/selectionStrategies';
import scoringStrategyDefault from '../strategies/scoringStrategies';
import { selectionStrategies as selectionStrategiesMap } from '../strategies/selectionStrategies';

const DEFAULT_OPTIONS = {
  scoringStrategy: scoringStrategyDefault,
  selectionStrategies: defaultSelectionStrategies,
  weightPreference: 2,
  weightFeature: 1,
  normalizeToPercentage: true,
  minScore: 1,
  uniqueTopOnly: false,
};

const safeArray = (v) => (Array.isArray(v) ? v : []);

export function rankWithTieBreak(scored = []) {
  return scored.slice().sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // desempata favorecendo quem tem o maior _origIndex
    return b._origIndex - a._origIndex;
  });
}

export function getRecommendations(formData = {}, products = [], opts = {}) {
  const options = { ...DEFAULT_OPTIONS, ...(opts || {}) };

  const scoringStrategy = options.scoringStrategy || scoringStrategyDefault;
  const selectionStrategies =
    options.selectionStrategies || selectionStrategiesMap;

  const selectedPreferences = safeArray(formData.selectedPreferences);
  const selectedFeatures = safeArray(formData.selectedFeatures);
  const selectedRecommendationType = formData.mode || 'MultipleProducts';

  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return selectedRecommendationType === 'SingleProduct' ? null : [];
  }

  const selections = {
    preferences: selectedPreferences,
    features: selectedFeatures,
  };

  const scored = (Array.isArray(products) ? products : []).map(
    (product, idx) => {
      const { score, details } = scoringStrategy(product, selections, options);
      return {
        _origIndex: idx,
        score: typeof score === 'number' ? score : 0,
        details,
        product,
      };
    }
  );

  const ranked = rankWithTieBreak(scored);

  const valid = ranked.filter(
    (s) =>
      s &&
      s.product &&
      typeof s.score === 'number' &&
      s.score >= (options.minScore || 1)
  );

  if (valid.length === 0) {
    return selectedRecommendationType === 'SingleProduct' ? null : [];
  }

  const topScore = valid[0].score;
  const topGroup = valid.filter((v) => v.score === topScore);

  const shouldPickSingleWinner =
    Boolean(options.uniqueTopOnly) ||
    selectedRecommendationType === 'SingleProduct';

  if (shouldPickSingleWinner && topGroup.length > 1) {
    const winner = valid[0];
    const winnerFormatted = {
      ...winner.product,
      score: winner.score,
      _matchDetails: winner.details,
    };
    return selectedRecommendationType === 'SingleProduct'
      ? winnerFormatted
      : [winnerFormatted];
  }

  const strategy =
    selectionStrategies[selectedRecommendationType] || selectionStrategiesMap;
  return strategy(valid);
}

export default { getRecommendations };
