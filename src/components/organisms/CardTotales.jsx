import styled from "styled-components";
import { Card } from "../../components/atoms/Card";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { designSystem } from "../../styles/designSystem";

export function CardTotales({ color, total, title, icono }) {
  const { datausuarios } = useUsuariosStore();

  return (
    <Card variant="elevated" hover padding="md">
      <Container>
        <ContentLeft>
          <Title>{title}</Title>
          <Amount>
            <Currency>{datausuarios?.moneda || 'ARS'}</Currency>
            <Value>{total?.toLocaleString('es-AR') || '0'}</Value>
          </Amount>
        </ContentLeft>

        <IconWrapper $color={color}>
          {icono}
        </IconWrapper>
      </Container>
    </Card>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${designSystem.spacing.md};
  width: 100%;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designSystem.spacing.xs};
  flex: 1;
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};

  @media (min-width: 576px) {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    font-size: 13px;
  }
`;

const Amount = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${designSystem.spacing.xs};
`;

const Currency = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.textMuted};
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};

  @media (min-width: 576px) {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  border-radius: ${designSystem.radius.lg};
  font-size: 18px;
  flex-shrink: 0;

  @media (min-width: 576px) {
    width: 38px;
    height: 38px;
    font-size: 19px;
  }

  @media (min-width: 768px) {
    width: 42px;
    height: 42px;
    font-size: 20px;
  }
`;
