import React from "react";
import styled from "styled-components";
import { useUsuariosStore, useOperaciones } from "../../../index";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dona = React.memo(function Dona({ dataGrafica, dataLeyenda, titulo }) {
  const { datausuarios } = useUsuariosStore();
  const { colorCategoria } = useOperaciones();
  const style = React.useMemo(() => ({ width: "400px" }), []);

  return (
    <Container>
      <section className="area1">
        <div>
          <Doughnut data={dataGrafica} style={style} />
        </div>
      </section>

      <section className="area2">
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
  width: 100%;
  display: grid;
  grid-template:
    "area1 " auto
    "area2 " auto/
    auto;
  gap: 30px;
  padding: 20px;

  @media (min-width: 768px) {
    grid-template:
      "area1 area2 " auto
      /
      1fr 1.5fr;
    gap: 40px;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 100%;
      max-width: 350px;

      @media (min-width: 768px) {
        max-width: 400px;
      }
    }
  }

  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;

    .contentLeyenda {
      width: 100%;
      display: flex;
      flex-direction: column;
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