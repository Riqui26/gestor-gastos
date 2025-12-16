import Swal from "sweetalert2";

// Configuración global de SweetAlert2 adaptada al tema
export const swalTheme = (theme) => ({
  popup: `
    background-color: ${theme.bg} !important;
    border: 1px solid ${theme.border} !important;
    border-radius: 16px !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
  `,
  title: `
    color: ${theme.text} !important;
    font-size: 20px !important;
    font-weight: 600 !important;
    padding: 24px 24px 8px !important;
  `,
  htmlContainer: `
    color: ${theme.textSecondary} !important;
    font-size: 14px !important;
    padding: 0 24px 24px !important;
    margin: 0 !important;
  `,
  confirmButton: `
    background-color: ${theme.primary} !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 12px 24px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px ${theme.primary}66 !important;
    }
  `,
  cancelButton: `
    background-color: ${theme.bg2} !important;
    color: ${theme.text} !important;
    border: 1px solid ${theme.border} !important;
    border-radius: 8px !important;
    padding: 12px 24px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
    &:hover {
      background-color: ${theme.bg3} !important;
    }
  `,
  denyButton: `
    background-color: ${theme.colorError} !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 12px 24px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
  `,
  actions: `
    gap: 12px !important;
    padding: 0 24px 24px !important;
    margin: 0 !important;
  `,
  icon: `
    border-color: ${theme.primary} !important;
    color: ${theme.primary} !important;
    margin: 24px auto 16px !important;
  `
});

// Helper para mostrar alertas con el tema
export const showSwal = (theme, options) => {
  return Swal.fire({
    ...options,
    customClass: swalTheme(theme),
    showClass: {
      popup: 'animate__animated animate__fadeIn animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut animate__faster'
    }
  });
};

// Alertas predefinidas
export const swalSuccess = (theme, title = "¡Éxito!", text = "Operación completada") => {
  return showSwal(theme, {
    icon: "success",
    title,
    text,
    showConfirmButton: false,
    timer: 2000
  });
};

export const swalError = (theme, title = "Error", text = "Algo salió mal") => {
  return showSwal(theme, {
    icon: "error",
    title,
    text,
    confirmButtonText: "Entendido"
  });
};

export const swalConfirm = (theme, title, text, confirmText = "Confirmar", cancelText = "Cancelar") => {
  return showSwal(theme, {
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });
};

export const swalDelete = (theme, itemName = "este elemento") => {
  return showSwal(theme, {
    icon: "warning",
    title: "¿Estás seguro?",
    text: `Esta acción eliminará ${itemName} permanentemente`,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    customClass: {
      ...swalTheme(theme),
      confirmButton: `
        background-color: ${theme.colorError} !important;
        color: #FFFFFF !important;
      `
    }
  });
};
