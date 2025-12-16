import { useState } from "react";
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

  const datagrafica = {
    type: "line",
    labels: dataRptMovimientosAñoMes?.map((data) => data.descripcion),
    datasets: [
      {
        fill: true,
        tension: 0.3,
        label: "Total",
        borderRadius: 5,
        cutout: 30,
        minBarLength: "100px",
        data: dataRptMovimientosAñoMes?.map((data) => data.total),
        backgroundColor: [
          "rgba(116, 37, 207, 0.2)",
          "rgba(147, 51, 234, 0.2)",
          "rgba(59, 130, 246, 0.2)",
          "rgba(14, 165, 233, 0.2)",
          "rgba(168, 85, 247, 0.2)",
          "rgba(236, 72, 153, 0.2)",
        ],
        borderColor: [
          "rgba(116, 37, 207, 1)",
          "rgba(147, 51, 234, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  useQuery({
    queryKey: ["rptMovimientosPorMesAño", {año, mes, tipo, idusuario}],
    queryFn: () =>
      rptMovimientosPorMesAño({
        año: año,
        mes: mes,
        tipocategoria: tipo,
        idusuario: idusuario,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <Container $activeTab={`${activeTab}00%`}>
      
      <ul className="tabs">
        <li
          className={activeTab == 0 ? "active" : ""}
          onClick={() => seleccionar(0)}
        >
          <BsPieChart />
        </li>

        <li
          className={activeTab == 1 ? "active" : ""}
          onClick={() => seleccionar(1)}
        >
          <BsGraphUp />
        </li>

        <li
          className={activeTab == 2 ? "active" : ""}
          onClick={() => seleccionar(2)}
        >
          <BsBarChartLine />
        </li>

        <span className="indicador"></span>
      </ul>

      <div className="tab-content">
        {activeTab === 0 && (
          <Dona 
            dataGrafica={datagrafica}
            dataLeyenda={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}

        {activeTab === 1 && (
          <LinealGrafica 
            dataGrafica={datagrafica}
            dataLeyenda={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}

        {activeTab === 2 && (
          <BarrasGrafica 
            dataGrafica={datagrafica}
            dataLeyenda={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
      </div>
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
  padding: 20px;
  color: #0f0f0f;

  .tabs {
    list-style: none;
    display: flex;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    background-color: #202020;
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    color: #fff;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 150px;
      font-size: 1.25rem;
      font-weight: 500;
      cursor: pointer;
      z-index: 2;
    }

    .indicador {
      position: absolute;
      display: flex;
      height: 50px;
      width: 150px;
      background-color: #7425cf;
      z-index: 1;
      border-radius: 99px;
      transition: 0.25s ease-out;
      box-shadow: 0px 10px 20px -3px #7425cf;
      transform: translateX(${(props) => props.$activeTab});
    }
  }

  .tab-content {
    position: relative;
    border-radius: 6px;
    margin-top: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
  }
`;
