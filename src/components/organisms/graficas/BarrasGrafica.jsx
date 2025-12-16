import React from "react";
import styled from "styled-components";
import {
  useUsuariosStore,
  useOperaciones,
} from "../../../index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarrasGrafica = React.memo(function BarrasGrafica({ dataGrafica, dataLeyenda, titulo }) {
  const { datausuarios } = useUsuariosStore();
  const { colorCategoria } = useOperaciones();
  const style = React.useMemo(() => ({ width: "400px" }), []);

  return (
    <Container>
      <section className="contentGrafica">
        <div className="grafica">
          <Bar data={dataGrafica} style={style} />
        </div>

        <section className="contentLeyenda">
          <h2>{titulo} por categoria</h2>
          {dataLeyenda.map((item, index) => {
            return (
              <ContentCars key={index} $colortext={colorCategoria}>
                <div className="contentDescripcion">
                  <span>{item.icono}</span>
                  <span className="descripcion">{item.descripcion}</span>
                </div>

                <span className="total">
                  {datausuarios.moneda} {item.total}
                </span>
              </ContentCars>
            );
          })}
        </section>
      </section>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 576px) {
    gap: 16px;
  }

  @media (min-width: 768px) {
    gap: 20px;
  }

  .contentGrafica {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 12px;
    height: 100%;

    @media (min-width: 576px) {
      gap: 16px;
    }
    
    @media (min-width: 768px) {
      flex-direction: row;
      gap: 20px;

      .contentLeyenda {
        padding-top: 20vh;
      }

      .grafica {
        width: 700px;
      }
    }

    .contentLeyenda {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 10px;

      @media (min-width: 576px) {
        gap: 12px;
      }

      @media (min-width: 768px) {
        gap: 15px;
      }

      h2 {
        font-size: 16px;
        font-weight: 600;
        color: ${(props) => props.theme.text};
        margin-bottom: 8px;

        @media (min-width: 576px) {
          font-size: 17px;
          margin-bottom: 9px;
        }

        @media (min-width: 768px) {
          font-size: 18px;
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const ContentCars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: ${(props) => props.theme.bg2};
  border-radius: 12px;
  transition: all 0.2s ease;

  @media (min-width: 576px) {
    padding: 12px 16px;
  }

  @media (min-width: 768px) {
    padding: 15px 20px;
  }

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .contentDescripcion {
    display: flex;
    gap: 10px;
    align-items: center;

    @media (min-width: 576px) {
      gap: 12px;
    }

    @media (min-width: 768px) {
      gap: 15px;
    }

    span:first-child {
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: 576px) {
        font-size: 22px;
      }

      @media (min-width: 768px) {
        font-size: 24px;
      }
    }

    .descripcion {
      color: ${(props) => props.theme.text};
      font-weight: 500;
      font-size: 13px;

      @media (min-width: 576px) {
        font-size: 14px;
      }

      @media (min-width: 768px) {
        font-size: 15px;
      }
    }
  }

  .total {
    font-size: 14px;
    font-weight: 700;
    color: ${(props) => props.$colortext};
    white-space: nowrap;

    @media (min-width: 576px) {
      font-size: 15px;
    }

    @media (min-width: 768px) {
      font-size: 17px;
    }
  }
`;