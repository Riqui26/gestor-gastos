import styled, { useTheme } from "styled-components";
import {
  ContentAccionesTabla,
  useCategoriasStore,
  Paginacion,
} from "../../../index";
import { swalDelete, swalSuccess } from "../../../utils/swalConfig";
import { designSystem } from "../../../styles/designSystem";
import { useState } from "react";

export function TablaCategorias({
  data,
  SetopenRegistro,
  setdataSelect,
  setAccion,
  tipo,
}) {
  const theme = useTheme();
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(10);
  const { eliminarCategoria } = useCategoriasStore();
  
  if (data.length == 0) return null;
  
  const mx = data?.length / porPagina;
  const maximo = mx < 1 ? 1 : mx;

  async function eliminar(p) {
    const result = await swalDelete(theme, p.descripcion);
    if (result.isConfirmed) {
      await eliminarCategoria({ id: p.id, idusuario: p.idusuario });
      await swalSuccess(theme, "Eliminado", "La categoría ha sido eliminada");
    }
  }

  function editar(data) {
    SetopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  }

  return (
    <Container>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Descripción</Th>
              <Th>Icono</Th>
              <Th>Color</Th>
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
                return (
                  <Tr key={item.id}>
                    <Td>
                      <CategoryName>{item.descripcion}</CategoryName>
                    </Td>
                    <Td>
                      <IconCell>{item.icono}</IconCell>
                    </Td>
                    <Td>
                      <ColorBadge $color={item.color}>
                        <ColorDot $color={item.color} />
                        <ColorCode>{item.color}</ColorCode>
                      </ColorBadge>
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
  min-width: 600px;
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

const CategoryName = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

const IconCell = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
`;

const ColorBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${designSystem.spacing.sm};
  padding: 6px 12px;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${designSystem.radius.md};
`;

const ColorDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  border: 2px solid ${({ theme }) => theme.bg};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.border};
`;

const ColorCode = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  font-family: 'Courier New', monospace;
`;
