// Normaliza o nome da categoria para criar a chave CSS
function normalizeCategoryKey(category) {
  return category
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/ç/g, 'c')
    .replace(/á|ã|â/g, 'a')
    .replace(/é|ê/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó|õ|ô/g, 'o')
    .replace(/ú/g, 'u');
}

export function getCategoryColors(category) {
  if (!category) return { bg: 'transparent', color: 'inherit' };

  const key = normalizeCategoryKey(category);
  const styles = getComputedStyle(document.documentElement);

  const bg = styles.getPropertyValue(`--category-${key}-bg`).trim();
  const color = styles.getPropertyValue(`--category-${key}-color`).trim();

  // fallback se variável não existir
  return {
    bg: bg || 'rgba(255,255,255,0.06)',
    color: color || 'inherit',
  };
}
