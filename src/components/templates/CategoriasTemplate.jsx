import styled from "styled-components";
import {
  Header,
  ContentFiltros,
  Btndesplegable,
  useOperaciones,
  ListaMenuDesplegable,
  DataDesplegableTipo,
  Btnfiltro,
  v,
  TablaCategorias,
  RegistrarCategorias,
  Lottieanimacion,
} from "../../index";
import { Device } from "../../styles/breakpoints";
import vacioverde from "../../assets/vacioverde.json";
import vaciorojo from "../../assets/vaciorojo.json";
import { useState } from "react";

export function CategoriasTemplate({ data }) {
  const [openRegistro, SetopenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);
  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } =
    useOperaciones();

  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }

  function cerrarDesplegables() {
    setStateTipo(false);
    setState(false);
  }

  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }

  function openUser() {
    setState(!state);
    setStateTipo(false);
  }

  function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  }

  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(!openRegistro)}
          accion={accion}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
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
              text={tituloBtnDes}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableTipo}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>

        <ContentFiltro>
          <Btnfiltro
            funcion={nuevoRegistro}
            bgcolor={tipo === "i" ? v.verde : v.rojo}
            textcolor="#FFFFFF"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>

      <section className="main">
        {data.length == 0 && (
          <Lottieanimacion
            alto="300"
            ancho="300"
            animacion={tipo == "i" ? vacioverde : vaciorojo}
          />
        )}

        <TablaCategorias
          data={data || []}
          SetopenRegistro={SetopenRegistro}
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
    "filters" auto
    "main" auto;
  gap: 12px;

  @media ${Device.mobile} {
    padding: 12px;
  }

  @media ${Device.tablet} {
    padding: 15px;
    gap: 14px;
  }

  @media ${Device.laptop} {
    padding: 20px;
    gap: 16px;
  }

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .tipo {
    grid-area: filters;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 0 8px;

    @media ${Device.mobile} {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 12px;
      gap: 10px;
    }

    @media ${Device.tablet} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }

    @media ${Device.laptop} {
      padding: 0 24px;
    }
  }

  .main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    padding: 0 8px 16px 8px;

    @media ${Device.mobile} {
      padding: 0 12px 20px 12px;
    }

    @media ${Device.tablet} {
      padding: 0 16px 24px 16px;
    }

    @media ${Device.laptop} {
      padding: 0 24px 24px 24px;
    }
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
