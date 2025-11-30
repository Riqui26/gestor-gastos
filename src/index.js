// PRINCIPAL
export { default as App } from "./App.jsx";


// COMPONENTS
// atoms
export * from "./components/atoms/ContentHeader.jsx";
export * from "./components/atoms/Icono.jsx";

// molecules
export * from "./components/molecules/BtnCircular.jsx";
export * from "./components/molecules/Btnsave.jsx";
export * from "./components/molecules/ItemsDesplegable.jsx";
export * from "./components/molecules/ListaMenuDesplegable.jsx";

// organisms
export * from "./components/organisms/sidebar/Sidebar.jsx";
export * from "./components/organisms/sidebar/SidebarCard.jsx";
export * from "./components/organisms/DataUser.jsx";
export * from "./components/organisms/Header.jsx";
export * from "./components/organisms/Menuambur.jsx";

// templates
export * from "./components/templates/ConfiguracionTemplate.jsx";
export * from "./components/templates/HomeTemplate.jsx";
export * from "./components/templates/LoginTemplate.jsx";
export * from "./components/templates/PlantillaBase.jsx";


//CONTEXT
export * from "./context/AuthContent.jsx";


// HOOKS
export * from "./hooks/ProtectedRoute.jsx";

// PAGES
export * from "./pages/Configuracion.jsx";
export * from "./pages/Home.jsx";
export * from "./pages/Login.jsx";


// ROUTERS
export * from "./routers/routes.jsx";


// STORE
export * from "./store/AuthStore.jsx";

// STYLES
export * from "./styles/breakpoints.jsx";
export * from "./styles/themes.jsx";
export * from "./styles/variables.jsx";

// SUPABASE
export * from "./supabase/crudUsuarios.jsx";
export * from "./supabase/globalSupabase.jsx";
export * from "./supabase/supabase.config.jsx";

// UTILS
export * from "./utils/dataEstatica.jsx";


