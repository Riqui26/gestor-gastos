import styled from "styled-components";

export function HomeTemplate() {
  return (
    <Main>
      <Container>
        <Box>
          
        </Box>
      </Container>
    </Main>
  );
}

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 576px) {
    width: 85%;
  }

  @media (min-width: 768px) {
    width: 75%;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 576px) {
    width: 80%;
    min-height: 55vh;
  }

  @media (min-width: 768px) {
    width: 50%;
    min-height: 60vh;
  }
`;
