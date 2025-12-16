import styled, { css } from "styled-components";
import { designSystem } from "../../styles/designSystem";

// ═══════════════════════════════════════════════════════════
//       BUTTON - Componente Unificado de Botones
// ═══════════════════════════════════════════════════════════

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconPosition={iconPosition}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && iconPosition === "left" && <IconWrapper>{icon}</IconWrapper>}
          {children && <span>{children}</span>}
          {icon && iconPosition === "right" && <IconWrapper>{icon}</IconWrapper>}
        </>
      )}
    </StyledButton>
  );
}

// ═══ VARIANTES ═══
const getVariantStyles = (variant, theme) => {
  const variants = {
    primary: css`
      background: ${theme.primary};
      color: #FFFFFF;
      border: 1px solid ${theme.primary};

      &:hover:not(:disabled) {
        background: ${theme.primary === '#0D6EFD' ? '#0B5ED7' : '#79C0FF'};
        border-color: ${theme.primary === '#0D6EFD' ? '#0B5ED7' : '#79C0FF'};
      }

      &:active:not(:disabled) {
        background: ${theme.primary === '#0D6EFD' ? '#0A58CA' : '#A5D6FF'};
      }
    `,

    secondary: css`
      background: ${theme.bg2};
      color: ${theme.text};
      border: 1px solid ${theme.border};

      &:hover:not(:disabled) {
        background: ${theme.bg4};
        border-color: ${theme.textMuted};
      }
    `,

    success: css`
      background: ${theme.colorIngresos};
      color: #FFFFFF;
      border: 1px solid ${theme.colorIngresos};

      &:hover:not(:disabled) {
        background: ${theme.name === 'light' ? '#157347' : '#46C269'};
      }
    `,

    danger: css`
      background: ${theme.colorGastos};
      color: #FFFFFF;
      border: 1px solid ${theme.colorGastos};

      &:hover:not(:disabled) {
        background: ${theme.name === 'light' ? '#BB2D3B' : '#FF6B63'};
      }
    `,

    outline: css`
      background: transparent;
      color: ${theme.primary};
      border: 1px solid ${theme.primary};

      &:hover:not(:disabled) {
        background: ${theme.primary};
        color: #FFFFFF;
      }
    `,

    ghost: css`
      background: transparent;
      color: ${theme.text};
      border: 1px solid transparent;

      &:hover:not(:disabled) {
        background: ${theme.bgAlpha};
      }
    `,

    icon: css`
      background: transparent;
      color: ${theme.text};
      border: none;
      padding: ${designSystem.spacing.sm};
      min-width: auto;

      &:hover:not(:disabled) {
        background: ${theme.bgAlpha};
        border-radius: ${designSystem.radius.md};
      }
    `,

    circular: css`
      background: ${theme.primary};
      color: #FFFFFF;
      border: none;
      border-radius: ${designSystem.radius.circle};
      padding: 0;
      min-width: 48px;
      height: 48px;
      width: 48px;

      &:hover:not(:disabled) {
        transform: scale(1.05);
      }
    `,
  };

  return variants[variant] || variants.primary;
};

// ═══ TAMAÑOS ═══
const getSizeStyles = (size) => {
  const sizes = {
    sm: css`
      padding: ${designSystem.spacing.xs} ${designSystem.spacing.md};
      font-size: 14px;
      min-height: 32px;
    `,
    md: css`
      padding: ${designSystem.spacing.sm} ${designSystem.spacing.lg};
      font-size: 16px;
      min-height: 40px;
    `,
    lg: css`
      padding: ${designSystem.spacing.md} ${designSystem.spacing.xl};
      font-size: 18px;
      min-height: 48px;
    `,
  };

  return sizes[size] || sizes.md;
};

// ═══ STYLED COMPONENTS ═══
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${designSystem.spacing.sm};
  font-weight: 500;
  border-radius: ${designSystem.radius.md};
  cursor: pointer;
  transition: all ${designSystem.transition.fast};
  white-space: nowrap;
  user-select: none;
  font-family: inherit;
  
  ${({ $variant, theme }) => getVariantStyles($variant, theme)}
  ${({ $size }) => getSizeStyles($size)}
  
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  ${({ $iconPosition }) =>
    $iconPosition === "right" &&
    css`
      flex-direction: row-reverse;
    `}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
