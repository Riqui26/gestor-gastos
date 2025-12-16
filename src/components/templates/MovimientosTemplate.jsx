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
  const [_accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const [value, setValue] = useState(() => dayjs());
  const [formatoFecha, setFormatoFecha] = useState("");
  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const [stateCategoria, setStateCategoria] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);
  const {
    setTipo,
    tipo,
    colorCategoria,
    año,
    mes,
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
  const { mostrarCategorias, datacategoria } = useCategoriasStore();

  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
    setStateCategoria(false);
  }

  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
    setStateCategoria(false);
    setCategoriaFiltro(null);
  }

  function openCategoria() {
    setStateCategoria(!stateCategoria);
    setStateTipo(false);
    setState(false);
  }

  function cambiarCategoria(p) {
    setCategoriaFiltro(p);
    setStateCategoria(!stateCategoria);
  }

  function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  }

  const movimientosFiltrados = categoriaFiltro
    ? datamovimientos?.filter((m) => m.categorias === categoriaFiltro.text)
    : datamovimientos;

  const totalFiltradoPendientes = movimientosFiltrados
    ?.filter((m) => m.estado === "0")
    .reduce((acc, m) => acc + parseFloat(m.valor || 0), 0) || 0;

  const totalFiltradoPagados = movimientosFiltrados
    ?.filter((m) => m.estado === "1")
    .reduce((acc, m) => acc + parseFloat(m.valor || 0), 0) || 0;

  const totalFiltrado = totalFiltradoPendientes + totalFiltradoPagados;

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
              textcolor={tipo === "i" ? v.verde : v.rojo}
              bgcolor={tipo === "i" ? `${v.verde}15` : `${v.rojo}15`}
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
          
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Btndesplegable
              textcolor={tipo === "i" ? v.verde : v.rojo}
              bgcolor={tipo === "i" ? `${v.verde}15` : `${v.rojo}15`}
              text={categoriaFiltro ? categoriaFiltro.text : "Todas las categorías"}
              funcion={openCategoria}
            />
            {stateCategoria && (
              <ListaMenuDesplegable
                data={[
                  { text: "Todas las categorías", tipo: null },
                  ...datacategoria.map((cat) => ({
                    text: cat.descripcion,
                    color: tipo === "i" ? v.verde : v.rojo,
                    tipo: cat.id,
                  })),
                ]}
                top="112%"
                funcion={(p) => cambiarCategoria(p.tipo === null ? null : p)}
              />
            )}
          </div>

          <CalendarioLineal
            value={value}
            setValue={setValue}
            formatofecha={formatoFecha}
            setFormatoFecha={setFormatoFecha}
            tipo={tipo}
          />
        </ContentFiltros>

        <ContentFiltro>
          <Btnfiltro
            textcolor="#FFFFFF"
            bgcolor={tipo === "i" ? v.verde : v.rojo}
            funcion={nuevoRegistro}
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>

      <section className="totales">
        <CardTotales
          total={categoriaFiltro ? totalFiltradoPendientes : totalMesAñoPendientes}
          title={tipo == "g" ? "Gastos pendientes" : "Ingresos pendientes"}
          color={colorCategoria}
          icono={<v.flechaarribalarga />}
        />
        <CardTotales
          total={categoriaFiltro ? totalFiltradoPagados : totalMesAñoPagados}
          title={tipo == "g" ? "Gastos pagados" : "Ingresos pagados"}
          color={colorCategoria}
          icono={<v.flechaabajolarga />}
        />
        <CardTotales
          total={categoriaFiltro ? totalFiltrado : totalMesAño}
          title="Total"
          color={colorCategoria}
          icono={<v.balance />}
        />
      </section>

      <section className="main">
        <TablaMovimientos
          data={movimientosFiltrados}
          setopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
          tipo={tipo}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" auto
    "tipo" auto
    "totales" auto
    "main" auto;
  row-gap: 12px;

  @media ${Device.mobile} {
    padding: 12px;
    row-gap: 14px;
  }

  @media ${Device.tablet} {
    padding: 15px;
    row-gap: 16px;
    grid-template:
      "header" 70px
      "tipo" 80px
      "totales" 90px
      "main" 1fr;
  }

  @media ${Device.laptop} {
    padding: 20px;
  }

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .tipo {
    grid-area: tipo;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    @media ${Device.mobile} {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;
    }

    @media ${Device.tablet} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
  }

  .totales {
    grid-area: totales;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 8px;

    @media ${Device.mobile} {
      gap: 10px;
    }

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
  }

  .main {
    grid-area: main;
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
