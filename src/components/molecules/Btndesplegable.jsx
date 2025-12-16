import styled from "styled-components";
import { v } from "../../index";
import { designSystem } from "../../styles/designSystem";

export function Btndesplegable({ text, bgcolor, textcolor, funcion }) {
  return (
    <Container $bgcolor={bgcolor} $textcolor={textcolor} onClick={funcion}>
      <span className="containerText">
        {<v.iconoFlechabajo />}
        <h6>{text}</h6>
      </span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.$bgcolor};
  color: ${(props) => props.$textcolor};
  font-weight: 600;
  font-size: 14px;
  padding: 0 16px;
  height: 44px;
  border-radius: ${designSystem.radius.lg};
  border: 2px solid ${(props) => props.$textcolor};
  cursor: pointer;
  transition: all ${designSystem.transition.fast};
  position: relative;
  flex: 1;

  @media (min-width: 576px) {
    font-size: 15px;
    padding: 0 20px;
    height: 46px;
    flex: initial;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    padding: 0 24px;
    height: 48px;
  }

  .containerText {
    gap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 576px) {
      gap: 10px;
    }

    h6 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;

      @media (min-width: 576px) {
        font-size: 15px;
      }

      @media (min-width: 768px) {
        font-size: 16px;
      }
    }

    svg {
      font-size: 18px;

      @media (min-width: 576px) {
        font-size: 19px;
      }

      @media (min-width: 768px) {
        font-size: 20px;
      }
    }
  }

  &:hover {
    background-color: ${(props) => props.$textcolor};
    color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(props) => props.$textcolor}40;
  }
`;
