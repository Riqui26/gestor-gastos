import styled, { useTheme } from "styled-components";
import {
  ContentAccionesTabla,
  Paginacion,
  useMovimientosStore,
} from "../../../index";
import { swalDelete, swalSuccess } from "../../../utils/swalConfig";
import { designSystem } from "../../../styles/designSystem";
import { useState } from "react";
import { BsCheckCircleFill, BsXCircleFill, BsPencilFill } from "react-icons/bs";

export function TablaMovimientos({
  data,
  setopenRegistro,
  setdataSelect,
  setAccion,
  tipo,
}) {
  const theme = useTheme();
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(10);
  const { eliminarMovimiento } = useMovimientosStore();

  if (data == null) {
    return null;
  }

  const mx = data.length / porPagina;
  const maximo = mx < 1 ? 1 : mx;

  async function eliminar(p) {
    const result = await swalDelete(theme, `${p.descripcion} - ${p.valorymoneda}`);
    if (result.isConfirmed) {
      await eliminarMovimiento({ id: p.id });
      await swalSuccess(theme, "Eliminado", "El movimiento ha sido eliminado");
    }
  }

  function editar(data) {
    setopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  }

  function formatearFecha(fecha) {
    if (!fecha) return "";
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  }

  function fueEditado(item) {
    // Si existe updated_at y es diferente de created_at, fue editado
    if (item.updated_at && item.created_at) {
      return new Date(item.updated_at).getTime() > new Date(item.created_at).getTime();
    }
    return false;
  }

  return (
    <Container>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th $width="80px">Estado</Th>
              <Th $width="110px">Fecha</Th>
              <Th>Descripción</Th>
              <Th>Categoría</Th>
              <Th>Cuenta</Th>
              <Th $width="130px">Valor</Th>
              <Th $width="120px">Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((item) => {
                const isPaid = item.estado === "1";
                const isEdited = fueEditado(item);
                return (
                  <Tr key={item.id}>
                    <Td>
                      <StatusBadge $paid={isPaid}>
                        {isPaid ? (
                          <>
                            <BsCheckCircleFill />
                            <span>Pagado</span>
                          </>
                        ) : (
                          <>
                            <BsXCircleFill />
                            <span>Pendiente</span>
                          </>
                        )}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <DateText>{formatearFecha(item.fecha)}</DateText>
                    </Td>
                    <Td>
                      <DescriptionWrapper>
                        <DescriptionText>{item.descripcion}</DescriptionText>
                        {isEdited && (
                          <EditedBadge title="Este movimiento fue editado">
                            <BsPencilFill />
                          </EditedBadge>
                        )}
                      </DescriptionWrapper>
                    </Td>
                    <Td>
                      <CategoryBadge>{item.categorias}</CategoryBadge>
                    </Td>
                    <Td>
                      <AccountText>{item.cuenta}</AccountText>
                    </Td>
                    <Td>
                      <AmountText>{item.valorymoneda}</AmountText>
                    </Td>
                    <Td>
                      <ContentAccionesTabla
                        funcionEditar={() => editar(item)}
                        funcionEliminar={() => eliminar(item)}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </tbody>
        </Table>
      </TableWrapper>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} tipo={tipo} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designSystem.spacing.md};
  height: 100%;
`;

const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${designSystem.radius.lg};
  background: ${({ theme }) => theme.bg};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bg2};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.primary};
    }
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  font-size: 14px;

  @media (min-width: 768px) {
    min-width: 100%;
  }

  thead {
    background: ${({ theme }) => theme.bg2};
  }
`;

const Th = styled.th`
  padding: ${designSystem.spacing.md} ${designSystem.spacing.lg};
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  white-space: nowrap;
  width: ${props => props.$width || 'auto'};

  &:last-child {
    text-align: center;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: all ${designSystem.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.bg2};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${designSystem.spacing.md} ${designSystem.spacing.lg};
  color: ${({ theme }) => theme.text};
  vertical-align: middle;

  &:last-child {
    text-align: center;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${designSystem.radius.md};
  font-size: 12px;
  font-weight: 600;
  background: ${({ $paid }) => 
    $paid ? '#198754' : '#FF9800'};
  color: #FFFFFF;
  border: 1px solid ${({ $paid }) => 
    $paid ? '#198754' : '#FF9800'};
  box-shadow: 0 2px 4px ${({ $paid }) => 
    $paid ? '#19875420' : '#FF980020'};

  svg {
    font-size: 14px;
  }
`;

const DateText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  font-family: 'Courier New', monospace;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DescriptionText = styled.span`
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
`;

const EditedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  border-radius: ${designSystem.radius.sm};
  font-size: 11px;
  cursor: help;
  transition: all ${designSystem.transition.fast};

  svg {
    font-size: 10px;
  }

  &:hover {
    background: ${({ theme }) => theme.primary}25;
    transform: scale(1.05);
  }
`;

const CategoryBadge = styled.span`
  padding: 4px 10px;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${designSystem.radius.md};
  font-size: 13px;
  font-weight: 500;
  display: inline-block;
`;

const AccountText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const AmountText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;
