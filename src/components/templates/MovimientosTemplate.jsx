import styled from "styled-components";
import {
  Header,
  CalendarioLineal,
  CardTotales,
  useOperaciones,
  v,
  useMovimientosStore,
  useUsuariosStore,
  TablaMovimientos,
  useCuentaStore,
  useCategoriasStore,
  DataDesplegableMovimientos,
  ContentFiltros,
  Btndesplegable,
  ListaMenuDesplegable,
  Btnfiltro,
  RegistrarMovimientos,
} from "../../index";
import { Device } from "../../styles/breakpoints";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function MovimientosTemplate() {
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const {
    setTipo,
    tipo,
    colorCategoria,
    año,
    mes,
    bgCategoria,
    tituloBtnDesMovimientos,
  } = useOperaciones();
  const { idusuario } = useUsuariosStore();
  const {
    totalMesAño,
    totalMesAñoPagados,
    totalMesAñoPendientes,
    mostrarMovimientos,
    datamovimientos,
  } = useMovimientosStore();
  const { mostrarCuentas } = useCuentaStore();
  const { mostrarCategorias } = useCategoriasStore();

  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }

  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }

  function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  }

  useQuery({
    queryKey: [
      "mostrar movimientos mes año",
      { año: año, mes: mes, idusuario: idusuario, tipocategoria: tipo },
    ],
    queryFn: () =>
      mostrarMovimientos({
        año: año,
        mes: mes,
        idusuario: idusuario,
        tipocategoria: tipo,
      }),
  });

  useQuery({
    queryKey: ["mostrar cuentas"],
    queryFn: () => mostrarCuentas({ idusuario: idusuario }),
  });

  useQuery({
    queryKey: ["mostrar categorias", { idusuario: idusuario, tipo: tipo }],
    queryFn: () => mostrarCategorias({ idusuario: idusuario, tipo: tipo }),
  });

  return (
    <Container>
      {openRegistro && (
        <RegistrarMovimientos
          dataSelect={dataSelect}
          state={openRegistro}
          setState={() => SetopenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      
      <section className="tipo">
        <ContentFiltros>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Btndesplegable
              textcolor={colorCategoria}
              bgcolor={bgCategoria}
              text={tituloBtnDesMovimientos}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableMovimientos}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>

        <ContentFiltro>
          <Btnfiltro
            textcolor={colorCategoria}
            bgcolor={bgCategoria}
            funcion={nuevoRegistro}
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>

      <section className="totales">
        <CardTotales
          total={totalMesAñoPendientes}
          title={tipo == "g" ? "Gastos pendientes" : "Ingresos pendientes"}
          color={colorCategoria}
          icono={<v.flechaarribalarga />}
        />
        <CardTotales
          total={totalMesAñoPagados}
          title={tipo == "g" ? "Gastos pagados" : "Ingresos pagados"}
          color={colorCategoria}
          icono={<v.flechaabajolarga />}
        />
        <CardTotales
          total={totalMesAño}
          title="Total"
          color={colorCategoria}
          icono={<v.balance />}
        />
      </section>

      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatofecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>

      <section className="main">
        <TablaMovimientos
          data={datamovimientos}
          setopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "tipo" 100px
    "totales" 360px
    "calendario" 100px
    "main" auto;

  @media ${Device.tablet} {
    grid-template:
      "header" 100px
      "tipo" 100px
      "totales" 100px
      "calendario" 100px
      "main" auto;
  }

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .tipo {
    grid-area: tipo;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .totales {
    grid-area: totales;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .calendario {
    grid-area: calendario;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    grid-area: main;
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
