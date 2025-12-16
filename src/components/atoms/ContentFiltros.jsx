import styled from "styled-components";

export const ContentFiltros = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  @media ${({ theme }) => theme.Device?.mobile || "(min-width: 576px)"} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media ${({ theme }) => theme.Device?.tablet || "(min-width: 768px)"} {
    gap: 12px;
  }
`;
