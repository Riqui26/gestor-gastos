import styled from "styled-components";
import {
  CategoriasTemplate,
  useCategoriasStore,
  useOperaciones,
  useUsuariosStore,
  SpinnerLoader,
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function Categorias() {
  const { tipo } = useOperaciones();
  const { datacategoria, mostrarCategorias } = useCategoriasStore();
  const { datausuarios } = useUsuariosStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", tipo],
    queryFn: () => mostrarCategorias({ idusuario: datausuarios.id, tipo: tipo })
  });

  return (
    <Container>
      <CategoriasTemplate data={datacategoria} />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
