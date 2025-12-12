// src/strategies/selectionStrategies.js
export function multipleProductsStrategy(scoredProducts = []) {
  return scoredProducts.map((s) => ({
    ...s.product,
    score: s.score,
    _matchDetails: s.details,
  }));
}

export function singleProductStrategy(scoredProducts = []) {
  if (!scoredProducts || scoredProducts.length === 0) return null;
  const top = scoredProducts[0];
  return { ...top.product, score: top.score, _matchDetails: top.details };
}

export const selectionStrategies = {
  MultipleProducts: multipleProductsStrategy,
  SingleProduct: singleProductStrategy,
};
