import React, { useState } from "react";
import styled from "styled-components";
import { MdFirstPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { designSystem } from "../../../styles/designSystem";

export const Paginacion = ({ pagina, setPagina, maximo, tipo }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };
  
  const inicio = () => {
    setInput(1);
    setPagina(1);
  };

  const isFirstPage = pagina === 1 || pagina < 1;
  const isLastPage = pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo);

  return (
    <Container>
      <PageButton onClick={inicio} disabled={isFirstPage} title="Primera página" $tipo={tipo}>
        <MdFirstPage />
      </PageButton>
      
      <PageButton onClick={previousPage} disabled={isFirstPage} title="Página anterior" $tipo={tipo}>
        <MdNavigateBefore />
      </PageButton>
      
      <PageInfo>
        <CurrentPage $tipo={tipo}>{input}</CurrentPage>
        <Separator>de</Separator>
        <TotalPages>{Math.round(maximo)}</TotalPages>
      </PageInfo>
      
      <PageButton onClick={nextPage} disabled={isLastPage} title="Página siguiente" $tipo={tipo}>
        <MdNavigateNext />
      </PageButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${designSystem.spacing.xs};
  padding: ${designSystem.spacing.sm};
  flex-wrap: wrap;

  @media (min-width: 576px) {
    gap: ${designSystem.spacing.sm};
    padding: ${designSystem.spacing.md};
  }
`;

const PageButton = styled.button`
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${designSystem.radius.md};
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  transition: all ${designSystem.transition.fast};

  @media (min-width: 576px) {
    height: 40px;
    width: 40px;
    font-size: 20px;
  }

  &:hover:not(:disabled) {
    background: ${({ $tipo, theme }) => 
      $tipo === "i" ? "#198754" : $tipo === "g" ? "#DC3545" : theme.primary};
    color: #FFFFFF;
    border-color: ${({ $tipo, theme }) => 
      $tipo === "i" ? "#198754" : $tipo === "g" ? "#DC3545" : theme.primary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${designSystem.spacing.sm};
  padding: 0 ${designSystem.spacing.md};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
`;

const CurrentPage = styled.span`
  font-weight: 700;
  color: ${({ $tipo, theme }) => 
    $tipo === "i" ? "#198754" : $tipo === "g" ? "#DC3545" : theme.primary};
  font-size: 16px;
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 13px;
`;

const TotalPages = styled.span`
  color: ${({ theme }) => theme.text};
`;
