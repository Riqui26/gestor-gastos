import styled from "styled-components";
import {
  Header,
  Selector,
  v,
  ListaPaises,
  useUsuariosStore,
  ListaGenerica,
  TemasData,
  Btnsave,
  Fondo1,
} from "../../index";
import { useState } from "react";

export function ConfiguracionTemplate() {
  const { datausuarios, editartemamonedauser } = useUsuariosStore();
  const [select, setSelect] = useState([]);
  const [selectTema, setSelecttema] = useState([]);
  const [state, setState] = useState(false);
  const [stateListaPaises, setStateListaPaises] = useState(false);
  const [stateListaTemas, setStateListaTemas] = useState(false);
  
  //pais moneda
  const moneda = select.symbol ? select.symbol : datausuarios.moneda;
  const pais = select.countryName ? select.countryName : datausuarios.pais;
  const paisSeleccionado =  moneda + " " + pais;
  
  //tema
  const iconobd = datausuarios.tema === "0" ? "🌞" : "🌚";
  const temabd = datausuarios.tema === "0" ? "light" : "dark";
  const temainicial = selectTema.tema ? selectTema.tema : temabd;
  const iconoinicial = selectTema.icono ? selectTema.icono : iconobd;
  const temaSeleccionado = iconoinicial + " " + temainicial;
  
  //funcion editar
  const editar = async () => {
    const themeElegido = selectTema.descripcion === "light" ? "0" : "1";
    const p = {
      tema: themeElegido,
      moneda: moneda,
      pais: pais,
      id: datausuarios.id,
    };

    await editartemamonedauser(p);
  };

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>

      <section className="area2">
        <h1>AJUSTES</h1>

        <ContentCard>
          <span>Moneda:</span>
          <Selector
            state={stateListaPaises}
            color={v.colorselector}
            texto1={paisSeleccionado}
            funcion={() => setStateListaPaises(!stateListaPaises)}
          />
          {stateListaPaises && (
            <ListaPaises
              setSelect={(p) => setSelect(p)}
              setState={() => setStateListaPaises(!stateListaPaises)}
            />
          )}
        </ContentCard>

        <ContentCard>
          <span>Tema:</span>
          <Selector
            texto1={temaSeleccionado}
            color={v.colorselector}
            state={stateListaTemas}
            funcion={() => setStateListaTemas(!stateListaTemas)}
          ></Selector>
          {stateListaTemas && (
            <ListaGenerica
              data={TemasData}
              setState={() => setStateListaTemas(!stateListaTemas)}
              funcion={setSelecttema}
            />
          )}
        </ContentCard>
        
        <Btnsave
          titulo="Guardar"
          bgcolor={v.colorselector}
          icono={<v.iconoguardar />}
          funcion={editar}
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
    "area2" auto;

  @media (min-width: 576px) {
    padding: 12px;
  }

  @media (min-width: 768px) {
    padding: 15px;
    grid-template:
      "header" 100px
      "area2" auto;
  }

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
    gap: 20px;
    align-self: center;
    padding: 0 12px;

    @media (min-width: 576px) {
      gap: 25px;
      padding: 0 16px;
    }

    @media (min-width: 768px) {
      gap: 30px;
      padding: 0;
    }

    h1 {
      font-size: 2rem;

      @media (min-width: 576px) {
        font-size: 2.5rem;
      }

      @media (min-width: 768px) {
        font-size: 3rem;
      }
    }
  }
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  align-items: stretch;
  gap: 12px;
  position: relative;
  width: 100%;
  justify-content: center;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  @media (min-width: 768px) {
    gap: 20px;
  }

  span {
    font-size: 14px;

    @media (min-width: 576px) {
      font-size: 15px;
    }

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }
`;
