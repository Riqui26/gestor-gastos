// PRINCIPAL
export { default as App } from "./App.jsx";


// COMPONENTS
// atoms
export * from "./components/atoms/Button.jsx";
export * from "./components/atoms/Card.jsx";
export * from "./components/atoms/BtnCerrar.jsx";
export * from "./components/atoms/Colorcontent.jsx";
export * from "./components/atoms/ContentFiltros.jsx";
export * from "./components/atoms/ContentHeader.jsx";
export * from "./components/atoms/Icono.jsx";

// molecules
export * from "./components/molecules/fondosAnimados/Fondo1.jsx";
export * from "./components/molecules/BtnCircular.jsx";
export * from "./components/molecules/Btndesplegable.jsx";
export * from "./components/molecules/Btnfiltro.jsx";
export * from "./components/molecules/Btnsave.jsx";
export * from "./components/molecules/InputBuscadorLista.jsx";
export * from "./components/molecules/ItemsDesplegable.jsx";
export * from "./components/molecules/ListaGenerica.jsx";
export * from "./components/molecules/ListaMenuDesplegable.jsx";
export * from "./components/molecules/Lottieanimacion.jsx";
export * from "./components/molecules/Spinner.jsx";
export * from "./components/molecules/SpinnerLoader.jsx";
export * from "./components/molecules/ThemeToggle.jsx";

// organisms
export * from "./components/organisms/formularios/DatePickerMovimiento.jsx";
export * from "./components/organisms/formularios/InputNumber.jsx";
export * from "./components/organisms/formularios/InputText.jsx";
export * from "./components/organisms/formularios/RegistrarCategorias.jsx";
export * from "./components/organisms/formularios/RegistrarMovimientos.jsx";

export * from "./components/organisms/graficas/BarrasGrafica.jsx";
export * from "./components/organisms/graficas/Dona.jsx";
export * from "./components/organisms/graficas/LinealGrafica.jsx";

export * from "./components/organisms/sidebar/Sidebar.jsx";
export * from "./components/organisms/sidebar/SidebarCard.jsx";

export * from "./components/organisms/tablas/AccionesTabla.jsx";
export * from "./components/organisms/tablas/ContentAccionesTabla.jsx";
export * from "./components/organisms/tablas/Paginacion.jsx";
export * from "./components/organisms/tablas/TablaCategorias.jsx";
export * from "./components/organisms/tablas/TablaMovimientos.jsx";

export * from "./components/organisms/CalendarioLineal.jsx";
export * from "./components/organisms/CardEliminarData.jsx";
export * from "./components/organisms/CardTotales.jsx";
export * from "./components/organisms/DataUser.jsx";
export * from "./components/organisms/Header.jsx";
export * from "./components/organisms/ListaPaises.jsx";
export * from "./components/organisms/Menuambur.jsx";
export * from "./components/organisms/Selector.jsx";
export * from "./components/organisms/Tabs.jsx";

// templates
export * from "./components/templates/CategoriasTemplate.jsx";
export * from "./components/templates/ConfiguracionTemplate.jsx";
export * from "./components/templates/HomeTemplate.jsx";
export * from "./components/templates/InformesTemplate.jsx";
export * from "./components/templates/LoginTemplate.jsx";
export * from "./components/templates/MovimientosTemplate.jsx";
export * from "./components/templates/PlantillaBase.jsx";


//CONTEXT
export * from "./context/AuthContent.jsx";


// HOOKS
export * from "./hooks/ProtectedRoute.jsx";

// PAGES
export * from "./pages/Categorias.jsx";
export * from "./pages/Configuracion.jsx";
export * from "./pages/Home.jsx";
export * from "./pages/Informes.jsx";
export * from "./pages/Login.jsx";
export * from "./pages/Movimientos.jsx";

// ROUTERS
export * from "./routers/routes.jsx";


// STORE
export * from "./store/AuthStore.jsx";
export * from "./store/CategoriasStore.jsx";
export * from "./store/CuentaStore.jsx";
export * from "./store/MovimientosStore.jsx";
export * from "./store/OperacionesStore.jsx";
export * from "./store/UsuariosStore.jsx";

// STYLES
export * from "./styles/breakpoints.jsx";
export * from "./styles/themes.jsx";
export * from "./styles/variables.jsx";
export { designSystem } from "./styles/designSystem.js";
export { typography } from "./styles/typography.js";

// SUPABASE
export * from "./supabase/crudCategorias.jsx";
export * from "./supabase/crudCuentas.jsx";
export * from "./supabase/crudMovimientos.jsx";
export * from "./supabase/crudUsuarios.jsx";
export * from "./supabase/globalSupabase.jsx";
export * from "./supabase/supabase.config.jsx";

// UTILS
export * from "./utils/Conversiones.jsx";
export * from "./utils/dataEstatica.jsx";
export * from "./utils/swalConfig.js";


