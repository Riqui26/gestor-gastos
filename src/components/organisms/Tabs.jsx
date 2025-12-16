import { useState, useMemo } from "react";
import styled from "styled-components";
import { BsBarChartLine, BsGraphUp, BsPieChart } from "react-icons/bs";
import {
  Dona,
  LinealGrafica,
  BarrasGrafica,
  useMovimientosStore,
  useOperaciones,
  useUsuariosStore,
} from "../../index";
import { useQuery } from "@tanstack/react-query";

export function Tabs() {
  const [activeTab, setactiveTab] = useState(0);
  const seleccionar = (index) => {
    setactiveTab(index);
  };
  const { dataRptMovimientosAñoMes, rptMovimientosPorMesAño } =
    useMovimientosStore();
  const { año, mes, tipo, tituloBtnDesMovimientos } = useOperaciones();
  const { idusuario } = useUsuariosStore();

  // Memorizamos datagrafica para evitar recalcularla en cada render
  const datagrafica = useMemo(() => {
    if (!dataRptMovimientosAñoMes) return null;
    
    return {
      type: "line",
      labels: dataRptMovimientosAñoMes.map((data) => data.descripcion),
      datasets: [
        {
          fill: true,
          tension: 0.3,
          label: "Total",
          borderRadius: 5,
          cutout: 30,
          minBarLength: "100px",
          data: dataRptMovimientosAñoMes.map((data) => data.total),
          backgroundColor: dataRptMovimientosAñoMes.map((data) => 
            data.color ? `${data.color}33` : "rgba(59, 130, 246, 0.2)"
          ),
          borderColor: dataRptMovimientosAñoMes.map((data) => 
            data.color || "rgba(59, 130, 246, 1)"
          ),
          borderWidth: 2,
        },
      ],
    };
  }, [dataRptMovimientosAñoMes]);

  const { isLoading } = useQuery({
    queryKey: ["rptMovimientosPorMesAño", {año, mes, tipo, idusuario}],
    queryFn: () =>
      rptMovimientosPorMesAño({
        año: año,
        mes: mes,
        tipocategoria: tipo,
        idusuario: idusuario,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: !!idusuario, // Solo ejecuta si hay usuario
  });

  // Renderizamos solo el gráfico activo
  const renderActiveChart = () => {
    if (isLoading || !datagrafica || !dataRptMovimientosAñoMes) {
      return <LoadingText>Cargando datos...</LoadingText>;
    }

    const props = {
      dataGrafica: datagrafica,
      dataLeyenda: dataRptMovimientosAñoMes,
      titulo: tituloBtnDesMovimientos
    };

    switch(activeTab) {
      case 0:
        return <Dona {...props} />;
      case 1:
        return <LinealGrafica {...props} />;
      case 2:
        return <BarrasGrafica {...props} />;
      default:
        return null;
    }
  };

  return (
    <Container $activeTab={activeTab}>
      <TabSelector>
        <TabButton
          $active={activeTab === 0}
          onClick={() => seleccionar(0)}
          aria-label="Gráfico de dona"
        >
          <BsPieChart />
        </TabButton>

        <TabButton
          $active={activeTab === 1}
          onClick={() => seleccionar(1)}
          aria-label="Gráfico lineal"
        >
          <BsGraphUp />
        </TabButton>

        <TabButton
          $active={activeTab === 2}
          onClick={() => seleccionar(2)}
          aria-label="Gráfico de barras"
        >
          <BsBarChartLine />
        </TabButton>
      </TabSelector>

      <TabContent>
        {renderActiveChart()}
      </TabContent>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px;
  gap: 16px;

  @media (min-width: 576px) {
    padding: 16px;
    gap: 20px;
  }

  @media (min-width: 768px) {
    padding: 20px;
    gap: 24px;
  }
`;

const TabSelector = styled.div`
  display: flex;
  gap: 8px;
  padding: 6px;
  background: ${({ theme }) => theme.bg2};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 70px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background: ${({ $active, theme }) => 
    $active ? theme.primary : 'transparent'};
  color: ${({ $active, theme }) => 
    $active ? '#FFFFFF' : theme.textSecondary};
  transition: all 0.2s ease;

  @media (min-width: 576px) {
    height: 46px;
    width: 90px;
    font-size: 1.1rem;
  }

  @media (min-width: 768px) {
    height: 48px;
    width: 120px;
    font-size: 1.25rem;
  }

  &:hover {
    background: ${({ $active, theme }) => 
      $active ? theme.primary : theme.bg3};
    color: ${({ $active, theme }) => 
      $active ? '#FFFFFF' : theme.text};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const TabContent = styled.div`
  position: relative;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;

  @media (min-width: 576px) {
    min-height: 350px;
  }

  @media (min-width: 768px) {
    min-height: 400px;
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 16px;
  font-weight: 500;
`;
