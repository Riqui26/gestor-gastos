import styled from "styled-components";
import Lottie from "lottie-react";

export function Lottieanimacion({ alto, ancho, animacion }) {
  return (
    <Container>
      <Lottie
        animationData={animacion}
        loop={true}
        autoplay={true}
        style={{
          width: `${ancho}px`,
          height: `${alto}px`,
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
