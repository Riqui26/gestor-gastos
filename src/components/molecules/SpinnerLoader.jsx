import styled, { keyframes } from "styled-components";
import React from "react";

export function SpinnerLoader({ message = "Cargando..." }) {
  return (
    <Container>
      <Content>
        <SpinnerDots>
          <Dot $delay={0} />
          <Dot $delay={0.2} />
          <Dot $delay={0.4} />
        </SpinnerDots>
        {message && <Message>{message}</Message>}
      </Content>
    </Container>
  );
}

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.bg};
  backdrop-filter: blur(4px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SpinnerDots = styled.div`
  display: flex;
  gap: 12px;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.$delay}s;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 500;
`;
