import styled from "styled-components";
import { Header, CalendarioLineal, Tabs, ContentFiltros, Btndesplegable, ListaMenuDesplegable, DataDesplegableMovimientos, useOperaciones, Btnfiltro, v} from "../../index";
import { useState } from "react";
import dayjs from "dayjs";

export function InformesTemplate() {
  const [state, setState] = useState(false);
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const [stateTipo, setStateTipo] = useState(false);
  const {
      setTipo,
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
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 90px
    "area1" 100px
    "area2" 80px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
    gap: 25px;
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
