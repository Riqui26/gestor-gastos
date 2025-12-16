import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Switch } from "@mui/material";
import {
  useMovimientosStore,
  useCategoriasStore,
  useOperaciones,
  ListaGenerica,
  Selector,
  InputNumber,
  InputText,
  useCuentaStore,
  useUsuariosStore,
  v,
  Btnsave,
  DatePickerMovimiento,
} from "../../../index";

export function RegistrarMovimientos({ setState, dataSelect }) {
  const { cuentaItemSelect } = useCuentaStore();
  const { datacategoria, categoriaItemSelect, selectCategoria, mostrarCategorias } =
    useCategoriasStore();
  const { tipo } = useOperaciones();
  const { insertarMovimientos } = useMovimientosStore();
  const { idusuario } = useUsuariosStore();

  const [estado, setEstado] = useState(true);
  const [ignorar, setIgnorar] = useState(false);
  const [stateCategorias, setStateCategorias] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (idusuario && tipo) {
      mostrarCategorias({ idusuario: idusuario, tipo: tipo });
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const insertar = async (data) => {
    if (!categoriaItemSelect || !categoriaItemSelect.id) {
      alert("Por favor selecciona una categoría");
      return;
    }

    let estadoText = 0;
    if (estado) {
      estadoText = 1;
    }

    const p = {
      tipo: tipo,
      estado: estadoText,
      fecha: selectedDate,
      descripcion: data.descripcion,
      idcuenta: cuentaItemSelect.id,
      valor: parseFloat(data.monto),
      idcategoria: categoriaItemSelect.id,
    };

    try {
      await insertarMovimientos(p);
      setState();
    } catch (err) {
      alert(err);
    }
  };

  function estadoControl(e) {
    setEstado(e.target.checked);
  }

  return (
    <Overlay onClick={setState}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            Nuevo {tipo == "i" ? "ingreso" : "gasto"}
          </ModalTitle>
          <CloseButton onClick={setState}>
            <v.iconocerrar />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit(insertar)}>
          <ModalBody>
            <FormField>
              <Label>Monto</Label>
              <InputNumber
                defaultValue={dataSelect.valor}
                register={register}
                placeholder="Ingrese monto"
                errors={errors}
                icono={<v.iconocalculadora />}
              />
            </FormField>

            <FormFieldRow>
              <FormField style={{ flex: 1 }}>
                <Label>Fecha</Label>
                <DatePickerMovimiento
                  value={selectedDate}
                  onChange={setSelectedDate}
                  tipo={tipo}
                />
              </FormField>

              <PaymentStatus>
                <PaymentLabel>
                  <v.iconocheck style={{ fontSize: '18px' }} />
                  <span>Pagado</span>
                </PaymentLabel>
                <Switch
                  onChange={estadoControl}
                  checked={estado}
                  color="success"
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      color: '#ccc',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#198754',
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: '#888',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#198754',
                    },
                  }}
                />
              </PaymentStatus>
            </FormFieldRow>

            <FormField>
              <Label>Descripción</Label>
              <InputText
                defaultValue={dataSelect.descripcion}
                register={register}
                placeholder="Ej: Compra en supermercado"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </FormField>

            <FormField>
              <Label>Categoría</Label>
              <Selector
                color={tipo == "i" ? "#198754" : "#DC3545"}
                texto1={categoriaItemSelect?.icono}
                texto2={categoriaItemSelect?.descripcion}
                funcion={() => setStateCategorias(!stateCategorias)}
              />

              {stateCategorias && (
                <ListaGenerica
                  setState={() => setStateCategorias(!stateCategorias)}
                  data={datacategoria}
                  funcion={selectCategoria}
                />
              )}
            </FormField>
          </ModalBody>

          <ModalFooter>
            <Btnsave
              titulo="Guardar"
              icono={<v.iconoguardar />}
              bgcolor={tipo === "i" ? v.verde : v.rojo}
            />
          </ModalFooter>
        </form>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  width: 90%;
  max-width: 550px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
  text-transform: capitalize;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.text};
  }
`;

const ModalBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 576px) {
    padding: 20px;
    gap: 16px;
  }

  @media (min-width: 768px) {
    padding: 24px;
    gap: 18px;
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const FormFieldRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.bg};
  }

  &::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) => theme.name === 'dark' ? 'invert(1)' : 'invert(0)'};
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
    
    &:hover {
      background: ${({ theme }) => theme.bg3};
    }
  }

  /* Estilos para el calendario desplegable */
  &::-webkit-datetime-edit {
    padding: 2px;
  }

  &::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }

  &::-webkit-datetime-edit-text {
    color: ${({ theme }) => theme.textSecondary};
    padding: 0 4px;
  }

  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field {
    padding: 2px 4px;
    border-radius: 4px;
    
    &:focus {
      background: ${({ theme }) => theme.primary}20;
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const PaymentStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
`;

const PaymentLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colorError};
  font-size: 12px;
  margin: 0;
`;