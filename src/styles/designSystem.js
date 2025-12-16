// ═══════════════════════════════════════════════════════════
//      SISTEMA DE DISEÑO - TOKENS BASE
// ═══════════════════════════════════════════════════════════

export const designSystem = {
  // ══════════════════════════════════
  //           SPACING
  // ══════════════════════════════════
  spacing: {
    none: '0',
    xs: '4px',      // 0.25rem
    sm: '8px',      // 0.5rem
    md: '16px',     // 1rem
    lg: '24px',     // 1.5rem
    xl: '32px',     // 2rem
    xxl: '48px',    // 3rem
    xxxl: '64px',   // 4rem
  },

  // ══════════════════════════════════
  //        BORDER RADIUS
  // ══════════════════════════════════
  radius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    full: '9999px',
    circle: '50%',
  },

  // ══════════════════════════════════
  //           SHADOWS
  // ══════════════════════════════════
  shadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // ══════════════════════════════════
  //         TRANSITIONS
  // ══════════════════════════════════
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ══════════════════════════════════
  //           Z-INDEX
  // ══════════════════════════════════
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },

  // ══════════════════════════════════
  //        ICON SIZES
  // ══════════════════════════════════
  iconSize: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
};
