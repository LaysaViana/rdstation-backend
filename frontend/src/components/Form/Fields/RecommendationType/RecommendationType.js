import { Checkbox } from '../../../shared/Checkbox/Checkbox';

function RecommendationType({
  onRecommendationTypeChange,
  value,
  className = '',
}) {
  return (
    <div className={`card recommendation-type ${className}`}>
      <h2 className="recommendation-type-title    color: 'var(--muted)',">
        Tipo de Recomendação:
      </h2>

      <div className="recommendation-type-options">
        {/* Produto Único */}
        <label className="recommendation-option">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={value === 'SingleProduct'}
            onChange={() => onRecommendationTypeChange('SingleProduct')}
          />
          <span className="text-muted">Produto Único</span>
        </label>

        {/* Múltiplos Produtos */}
        <label className="recommendation-option">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={value === 'MultipleProducts'}
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
          />
          <span className="text-muted">Múltiplos Produtos</span>
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
