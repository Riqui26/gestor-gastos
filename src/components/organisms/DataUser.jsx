import styled from "styled-components";
import {
  UserAuth,
  BtnCircular,
  v,
  ListaMenuDesplegable,
  DesplegableUser,
  useAuthStore,
} from "../../index";

export function DataUser({ stateConfig }) {
  const { user } = UserAuth();
  const { signout } = useAuthStore();
  const funcionXtipo = async (tipo) => {
    if (tipo === "cerrarsesion") {
      await signout();
    }
  };

  return (
    <Container onClick={stateConfig.setState}>
      <div className="imgContainer">
        <img src={user.picture} />
      </div>

      <BtnCircular
        icono={<v.iconocorona />}
        width="25px"
        height="25px"
        bgcolor="#ffffff"
        textColor="#181616"
        fontsize="11px"
        translateX="-55px"
        translateY="-15px"
      />
      <span className="nombre">{user.name}</span>
      {stateConfig.state && (
        <ListaMenuDesplegable
          data={DesplegableUser}
          top="62px"
          funcion={(p) => funcionXtipo(p)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: auto;
  max-width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 50px;
  margin: 10px;
  cursor: pointer;

  @media (min-width: 576px) {
    width: 160px;
    max-width: 180px;
    padding: 7px;
    margin: 12px;
  }

  @media (min-width: 768px) {
    width: 200px;
    max-width: 200px;
    padding: 8px;
    margin: 15px;
  }

  .imgContainer {
    height: 32px;
    width: 32px;
    min-height: 32px;
    min-width: 32px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 576px) {
      height: 36px;
      width: 36px;
      min-height: 36px;
      min-width: 36px;
      margin-right: 18px;
    }

    @media (min-width: 768px) {
      height: 40px;
      width: 40px;
      min-height: 40px;
      min-width: 40px;
      margin-right: 22px;
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }

  .nombre {
    width: 100%;
    font-weight: 500;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;

    @media (min-width: 576px) {
      font-size: 14px;
    }

    @media (min-width: 768px) {
      font-size: 15px;
    }
  }
`;
