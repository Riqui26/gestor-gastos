import styled, { keyframes } from "styled-components";
import React from "react";

export function Spinner({ size = 40, fullscreen = true }) {
  if (fullscreen) {
    return (
      <FullscreenContainer>
        <SpinnerRing $size={size} />
      </FullscreenContainer>
    );
  }
  return <SpinnerRing $size={size} />;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FullscreenContainer = styled.div`
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

const SpinnerRing = styled.div`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 3px solid ${({ theme }) => theme.bg2};
  border-top: 3px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
