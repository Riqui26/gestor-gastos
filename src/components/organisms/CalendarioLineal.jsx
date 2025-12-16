import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect } from "react";
import { useOperaciones } from "../../index";
import { designSystem } from "../../styles/designSystem";
import { v } from "../../styles/variables";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]; 

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

export function CalendarioLineal({ value, setValue, setFormatoFecha }) {
  const { tipo, setMes, setAño } = useOperaciones();

  function IniciarCalendario() {
    setValue(months[currMonth] + currYear);
    let mes = "";
    if (currMonth + 1 < 10) {
      mes = "0" + (currMonth + 1);
    } else {
      mes = currMonth + 1;
    }
    let formatofecha = mes + "/" + currYear;
    setMes(mes);
    setAño(currYear);
    setFormatoFecha(formatofecha);
  }

  function adelante() {
    currMonth += 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    IniciarCalendario();
  }

  function atras() {
    currMonth -= 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    IniciarCalendario();
  }

  useEffect(() => {
    IniciarCalendario();
  }, []);
  return (
    <Container $tipo={tipo}>
      <NavButton onClick={atras} title="Mes anterior" $tipo={tipo}>
        <MdNavigateBefore />
      </NavButton>
      
      <MonthDisplay>
        <MonthText>{value.toString()}</MonthText>
      </MonthDisplay>

      <NavButton onClick={adelante} title="Mes siguiente" $tipo={tipo}>
        <MdNavigateNext />
      </NavButton>
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${designSystem.spacing.sm};
  padding: 0 ${designSystem.spacing.md};
  height: 48px;
  background: ${({ $tipo }) => 
    $tipo === "i" ? `${v.verde}10` : `${v.rojo}10`};
  border: 2px solid ${({ $tipo }) => 
    $tipo === "i" ? v.verde : v.rojo};
  border-radius: ${designSystem.radius.lg};
  width: 100%;
  justify-content: space-between;

  @media (min-width: 576px) {
    width: auto;
    padding: 0 ${designSystem.spacing.lg};
    gap: ${designSystem.spacing.md};
    justify-content: center;
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: ${designSystem.radius.md};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all ${designSystem.transition.fast};

  svg {
    font-size: 24px;
  }

  &:hover {
    background: ${({ $tipo }) => 
      $tipo === "i" ? v.verde : v.rojo};
    color: #FFFFFF;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MonthDisplay = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${designSystem.spacing.sm} ${designSystem.spacing.lg};
`;

const MonthText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;
