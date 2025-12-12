// src/styles/inject-mobile-fixes.js
// Injeta regras CSS de correção para dispositivos pequenos/muito pequeno (mobile).

const css = `
/* Mobile fixes (smartphones) - injected at runtime to avoid changing global.css */
@media (max-width: 420px) {
  .app-bg { padding: 16px !important; }

  .page-inner,
  .app-header-inner,
  .w-full.mx-auto.max-w-7xl,
  .content-grid {
    padding-left: 8px !important;
    padding-right: 8px !important;
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 auto !important;
  }

  /* Force main grids to single column on tiny screens */
  .grid, .content-grid, .grid.grid-cols-1, .grid.grid-cols-2, .grid.grid-cols-3 {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }

  .glass-card,
  .glass-card.inner,
  .card,
  .panel-small {
    width: 100% !important;
    max-width: 340px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding: 14px !important;
    box-sizing: border-box !important;
  }

  .preferences-panel,
  .features-panel {
    max-height: 46vh !important;
    overflow-y: auto !important;
    padding-right: 6px !important;
    -webkit-overflow-scrolling: touch;
  }

  .testimonial-box {
    display: none !important;
  }

  .app-header { padding: 8px 0 !important; }
  .header-logo { height: 32px !important; max-width: 160px !important; }
  .cta-button { padding: 10px 18px !important; font-size: 0.95rem !important; }
  .check-item { gap: 8px !important; padding: 8px 4px !important; }

  .app-bg, .app-bg-only { min-height: auto !important; }
  img { max-width: 100% !important; height: auto !important; display: block !important; }
}

/* Narrow tablets */
@media (min-width: 421px) and (max-width: 767px) {
  .app-bg { padding: 24px !important; }
  .glass-card, .card { max-width: 600px !important; margin: 0 auto !important; padding: 18px !important; }
  .preferences-panel, .features-panel { max-height: 56vh !important; overflow-y: auto !important; }
}
`;

/* Inject to head only once */
export default function injectMobileFixes() {
  if (typeof document === 'undefined') return;
  const id = 'rd-mobile-fixes';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
