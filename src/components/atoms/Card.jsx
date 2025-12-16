import styled, { css } from "styled-components";
import { designSystem } from "../../styles/designSystem";

// ═══════════════════════════════════════════════════════════
//          CARD - Componente Base para Tarjetas
// ═══════════════════════════════════════════════════════════

export function Card({
  children,
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
  className,
  ...props
}) {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $hover={hover}
      $clickable={!!onClick}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </StyledCard>
  );
}

// ═══ SUB-COMPONENTES ═══
Card.Header = styled.div`
  padding-bottom: ${designSystem.spacing.md};
  margin-bottom: ${designSystem.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
`;

Card.Body = styled.div`
  flex: 1;
`;

Card.Footer = styled.div`
  padding-top: ${designSystem.spacing.md};
  margin-top: ${designSystem.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.borderLight};
  display: flex;
  gap: ${designSystem.spacing.sm};
  align-items: center;
  justify-content: flex-end;
`;

Card.Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

Card.Subtitle = styled.p`
  margin: ${designSystem.spacing.xs} 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
`;

// ═══ VARIANTES ═══
const getVariantStyles = (variant, theme) => {
  const variants = {
    default: css`
      background: ${theme.bg};
      border: 1px solid ${theme.border};
    `,

    elevated: css`
      background: ${theme.bg};
      border: none;
      box-shadow: ${theme.shadow};
    `,

    success: css`
      background: ${theme.colorbgingresos};
      border: 1px solid ${theme.colorIngresos};
      border-left: 4px solid ${theme.colorIngresos};
    `,

    danger: css`
      background: ${theme.colorbgGastos};
      border: 1px solid ${theme.colorGastos};
      border-left: 4px solid ${theme.colorGastos};
    `,

    info: css`
      background: ${theme.name === 'light' ? 'rgba(13, 202, 240, 0.1)' : 'rgba(88, 166, 255, 0.1)'};
      border: 1px solid ${theme.colorInfo};
      border-left: 4px solid ${theme.colorInfo};
    `,

    warning: css`
      background: ${theme.name === 'light' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(210, 153, 34, 0.1)'};
      border: 1px solid ${theme.colorWarning};
      border-left: 4px solid ${theme.colorWarning};
    `,
  };

  return variants[variant] || variants.default;
};

// ═══ PADDING ═══
const getPaddingStyles = (padding) => {
  const paddings = {
    none: css`
      padding: 0;
    `,
    sm: css`
      padding: ${designSystem.spacing.sm};
    `,
    md: css`
      padding: ${designSystem.spacing.md};
    `,
    lg: css`
      padding: ${designSystem.spacing.lg};
    `,
    xl: css`
      padding: ${designSystem.spacing.xl};
    `,
  };

  return paddings[padding] || paddings.md;
};

// ═══ STYLED COMPONENT ═══
const StyledCard = styled.div`
  border-radius: ${designSystem.radius.lg};
  transition: all ${designSystem.transition.normal};
  display: flex;
  flex-direction: column;
  
  ${({ $variant, theme }) => getVariantStyles($variant, theme)}
  ${({ $padding }) => getPaddingStyles($padding)}
  
  ${({ $hover, theme }) =>
    $hover &&
    css`
      &:hover {
        box-shadow: ${theme.shadowHover};
        transform: translateY(-2px);
      }
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}
`;
