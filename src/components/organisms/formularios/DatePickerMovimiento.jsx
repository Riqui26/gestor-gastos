import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { v } from "../../../styles/variables";
import { designSystem } from "../../../styles/designSystem";
import { HiOutlineCalendar } from "react-icons/hi2";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

dayjs.locale("es");

export function DatePickerMovimiento({ value, onChange, tipo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs(value || new Date()));
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const selectedDate = dayjs(value);
  const isToday = (day) => {
    return dayjs().isSame(currentMonth.date(day), "day");
  };
  const isSelected = (day) => {
    return selectedDate.isSame(currentMonth.date(day), "day");
  };

  const handleDayClick = (day) => {
    const newDate = currentMonth.date(day).format("YYYY-MM-DD");
    onChange(newDate);
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <Container ref={containerRef}>
      <InputDisplay onClick={() => setIsOpen(!isOpen)} $tipo={tipo}>
        <HiOutlineCalendar />
        <span>{value ? dayjs(value).format("DD/MM/YYYY") : "Seleccionar fecha"}</span>
      </InputDisplay>

      {isOpen && (
        <CalendarDropdown $tipo={tipo}>
          <CalendarHeader>
            <NavButton type="button" onClick={goToPreviousMonth}>
              <MdNavigateBefore />
            </NavButton>
            <MonthTitle>{currentMonth.format("MMMM YYYY")}</MonthTitle>
            <NavButton type="button" onClick={goToNextMonth}>
              <MdNavigateNext />
            </NavButton>
          </CalendarHeader>

          <DaysGrid>
            <DayName>Dom</DayName>
            <DayName>Lun</DayName>
            <DayName>Mar</DayName>
            <DayName>Mié</DayName>
            <DayName>Jue</DayName>
            <DayName>Vie</DayName>
            <DayName>Sáb</DayName>

            {emptyDays.map((_, index) => (
              <EmptyDay key={`empty-${index}`} />
            ))}

            {days.map((day) => (
              <Day
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                $isToday={isToday(day)}
                $isSelected={isSelected(day)}
                $tipo={tipo}
              >
                {day}
              </Day>
            ))}
          </DaysGrid>
        </CalendarDropdown>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.bg2};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${designSystem.radius.md};
  cursor: pointer;
  transition: all ${designSystem.transition.fast};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.textSecondary};
    flex-shrink: 0;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  }

  &:hover {
    border-color: ${({ $tipo }) => ($tipo === "i" ? v.verde : v.rojo)};
    background: ${({ theme }) => theme.bg3};
  }
`;

const CalendarDropdown = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: ${({ theme }) => theme.bg};
  border: 2px solid ${({ $tipo }) => ($tipo === "i" ? v.verde : v.rojo)};
  border-radius: ${designSystem.radius.lg};
  box-shadow: ${designSystem.shadow.lg};
  padding: 12px;
  width: 90vw;
  max-width: 320px;
  animation: fadeIn 0.2s ease;

  @media (min-width: 576px) {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    transform: none;
    padding: 16px;
    width: auto;
    min-width: 320px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);

      @media (min-width: 576px) {
        transform: translateY(-10px);
      }
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);

      @media (min-width: 576px) {
        transform: translateY(0);
      }
    }
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${designSystem.radius.circle};
  transition: all ${designSystem.transition.fast};
  color: ${({ theme }) => theme.text};

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${({ theme }) => theme.bg2};
    transform: scale(1.1);
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayName = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px 0;
`;

const EmptyDay = styled.div``;

const Day = styled.button`
  aspect-ratio: 1;
  border: none;
  background: ${({ $isSelected, $tipo, theme }) =>
    $isSelected 
      ? $tipo === "i" ? v.verde : v.rojo
      : theme.bg2};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? "#FFFFFF" : theme.text};
  border-radius: ${designSystem.radius.md};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "400")};
  transition: all ${designSystem.transition.fast};
  position: relative;
  min-height: 36px;

  ${({ $isToday, $tipo, $isSelected }) =>
    $isToday && !$isSelected &&
    `
    &::after {
      content: "";
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${$tipo === "i" ? v.verde : v.rojo};
    }
  `}

  &:hover {
    background: ${({ $isSelected, $tipo }) =>
      $isSelected 
        ? $tipo === "i" ? v.verde : v.rojo
        : $tipo === "i" ? `${v.verde}20` : `${v.rojo}20`};
    transform: scale(1.05);
  }
`;
