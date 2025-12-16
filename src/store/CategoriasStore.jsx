import { create } from "zustand";
import {
  EditarCategorias,
  EliminarCategorias,
  EliminarCategoriasTodas,
  InsertarCategorias,
  MostrarCategorias,
} from "../index";

export const useCategoriasStore = create((set, get) => ({
  datacategoria: [],
  categoriaItemSelect: null,
  parametros: {},

  mostrarCategorias: async (p) => {
    const response = await MostrarCategorias(p);
    set({ parametros: p });
    set({ datacategoria: response || [] });
    set({ categoriaItemSelect: response?.[0] || null });
    return response;
  },

  selectCategoria: (p) => {
    set({ categoriaItemSelect: p });
  },

  insertarCategorias: async (p) => {
    await InsertarCategorias(p);
    const { mostrarCategorias } = get();
    const { parametros } = get();
    await mostrarCategorias(parametros);
  },

  eliminarCategoria: async (p) => {
    await EliminarCategorias(p);
    const { mostrarCategorias } = get();
    await(mostrarCategorias(p));
  },

  eliminarCategoriasTodas: async (p) => {
    await EliminarCategoriasTodas(p);
    const { mostrarCategorias } = get();
    await(mostrarCategorias(p));
  },

  editarCategoria: async (p) => {
    await EditarCategorias(p);
    const { mostrarCategorias } = get();
    await mostrarCategorias(p);
  },
}));
