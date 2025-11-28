import styled from "styled-components";
import { useAuthStore } from "../index";

export function Home() {
  const { signout } = useAuthStore();

  return (
    <Container>
      <h1>Home</h1>
      <button onClick={signout}>Cerrar sesión</button>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
