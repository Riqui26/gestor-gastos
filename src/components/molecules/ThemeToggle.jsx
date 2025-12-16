import styled from "styled-components";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { designSystem } from "../../styles/designSystem";
import { ActualizarTemaUsuario } from "../../supabase/crudUsuarios";

// ═══════════════════════════════════════════════════════════
//       THEME TOGGLE - Selector de Tema Light/Dark
// ═══════════════════════════════════════════════════════════

export function ThemeToggle({ isOpen }) {
  const { datausuarios, mostrarUsuarios } = useUsuariosStore();
  const isDark = datausuarios?.tema === "1";

  const toggleTheme = async () => {
    const newTheme = isDark ? "0" : "1";
    try {
      await ActualizarTemaUsuario({ id: datausuarios.id, tema: newTheme });
      await mostrarUsuarios();
    } catch (error) {
      console.error("Error al cambiar tema:", error);
    }
  };

  return (
    <Container $isOpen={isOpen} onClick={toggleTheme}>
      <IconWrapper $isDark={isDark}>
        {isDark ? <HiOutlineMoon /> : <HiOutlineSun />}
      </IconWrapper>
      {isOpen && (
        <Label>{isDark ? "Modo Oscuro" : "Modo Claro"}</Label>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${designSystem.spacing.md};
  padding: ${designSystem.spacing.md} ${designSystem.spacing.sm};
  margin: ${designSystem.spacing.sm} ${designSystem.spacing.sm};
  border-radius: ${designSystem.radius.lg};
  cursor: pointer;
  transition: all ${designSystem.transition.fast};
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.sidebarBg};
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    background: ${({ theme }) => theme.sidebarHover};
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(3px)' : 'scale(1.05)'};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme, $isDark }) => 
    $isDark ? theme.colorInfo : theme.colorWarning
  };
  
  svg {
    transition: all ${designSystem.transition.normal};
  }

  ${Container}:hover & svg {
    transform: rotate(${({ $isDark }) => $isDark ? '0deg' : '180deg'});
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;
