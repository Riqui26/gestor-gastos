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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function LinealGrafica({ dataGrafica, dataLeyenda, titulo }) {
  const { datausuarios } = useUsuariosStore();
  const { colorCategoria } = useOperaciones();
  const style = {width: "400px"}

  return (
    <Container>
      <section className="contentGrafica">
        <div className="grafica">
          <Line data={dataGrafica} style={style} />
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
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .contentGrafica {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    
    @media (min-width: 768px) {
      flex-direction: row;

      .contentLeyenda {
        padding-top: 20vh;
      }

      .grafica {
        min-width: 500px;
      }
    }
    
    .contentLeyenda {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 15px;

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: ${(props) => props.theme.text};
        margin-bottom: 10px;
      }
    }
  }
`;

const ContentCars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: ${(props) => props.theme.bg2};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .contentDescripcion {
    display: flex;
    gap: 15px;
    align-items: center;

    span:first-child {
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .descripcion {
      color: ${(props) => props.theme.text};
      font-weight: 500;
      font-size: 15px;
    }
  }

  .total {
    font-size: 17px;
    font-weight: 700;
    color: ${(props) => props.$colortext};
    white-space: nowrap;
  }
`;