const DEFAULT_OPTIONS = {
  weightPreference: 2,
  weightFeature: 1,
  normalizeToPercentage: true,
};

const safeArray = (v) => (Array.isArray(v) ? v : []);
const safeString = (v) => (v == null ? '' : String(v).toLowerCase());

function includesMatch(source = [], needle = '') {
  const n = safeString(needle);
  if (!n) return false;
  return source.some((s) => safeString(s).includes(n));
}

export function defaultScoringStrategy(
  product = {},
  selections = { preferences: [], features: [] },
  options = {}
) {
  const cfg = { ...DEFAULT_OPTIONS, ...(options || {}) };

  const prefs = safeArray(selections.preferences);
  const feats = safeArray(selections.features);

  const prodPrefs = safeArray(product.preferences);
  const prodFeats = safeArray(product.features);

  let prefsMatched = 0;
  let featsMatched = 0;

  prefs.forEach((p) => {
    if (includesMatch(prodPrefs, p)) prefsMatched += 1;
  });

  feats.forEach((f) => {
    if (includesMatch(prodFeats, f)) featsMatched += 1;
  });

  const rawScore =
    prefsMatched * cfg.weightPreference + featsMatched * cfg.weightFeature;

  const denom =
    prefs.length * cfg.weightPreference + feats.length * cfg.weightFeature;

  const score =
    cfg.normalizeToPercentage && denom > 0
      ? Math.round((rawScore / denom) * 100)
      : rawScore;

  return {
    score,
    details: {
      prefsMatched,
      featsMatched,
      rawScore,
      denom,
    },
  };
}

export default defaultScoringStrategy;
