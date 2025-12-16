import styled from "styled-components";
import { Header, CalendarioLineal, Tabs, ContentFiltros, Btndesplegable, ListaMenuDesplegable, DataDesplegableMovimientos, useOperaciones, Btnfiltro, v} from "../../index";
import { Device } from "../../styles/breakpoints";
import { useState } from "react";
import dayjs from "dayjs";

export function InformesTemplate() {
  const [state, setState] = useState(false);
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const [stateTipo, setStateTipo] = useState(false);
  const {
      setTipo,
      tipo,
      colorCategoria,
      bgCategoria,
      tituloBtnDesMovimientos,
    } = useOperaciones();

  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }

  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>

      <section className="area1">
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
        </ContentFiltros>

        <h1> Informes </h1>

      </section>

      <section className="area2">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatofecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>

      <section className="main">
        <Tabs />
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
    "area1" auto
    "area2" auto
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

  .area1 {
    grid-area: area1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    @media ${Device.mobile} {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 15px;
    }

    @media ${Device.tablet} {
      gap: 20px;
    }

    @media ${Device.laptop} {
      gap: 25px;
    }

    h1 {
      font-size: 1.5rem;

      @media ${Device.tablet} {
        font-size: 1.75rem;
      }

      @media ${Device.laptop} {
        font-size: 2rem;
      }
    }
  }

  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    grid-area: main;
  }
`;
