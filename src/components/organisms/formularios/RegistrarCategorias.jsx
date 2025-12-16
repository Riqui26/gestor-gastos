import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Spinner,
  useOperaciones,
  Btnsave,
  useUsuariosStore,
  useCategoriasStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import Emojipicker from "emoji-picker-react";

export function RegistrarCategorias({ onClose, dataSelect, accion }) {
  const { insertarCategorias, editarCategoria } = useCategoriasStore();
  const { datausuarios } = useUsuariosStore();
  const [showPicker, setShowPicker] = useState(false);
  const [emojiselect, setEmojiselect] = useState("😻");
  const [currentColor, setColor] = useState("#F44336");

  const [estadoProceso, setEstadoproceso] = useState(false);
  const { tipo } = useOperaciones();
  function onEmojiClick(emojiObject) {
    setEmojiselect(() => emojiObject.emoji);
    setShowPicker(false);
  }

  function elegirColor(color) {
    setColor(color.hex);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        descripcion: data.descripcion,
        color: currentColor,
        icono: emojiselect,
        id: dataSelect.id,
        idusuario: datausuarios.id,
        tipo: tipo,
      };
      try {
        setEstadoproceso(true);
        await editarCategoria(p);
        setEstadoproceso(false);
        onClose();
      } catch (error) {}
    } else {
      const p = {
        descripcion: data.descripcion,
        color: currentColor,
        icono: emojiselect,
        idusuario: datausuarios.id,
        tipo: tipo,
      };
      try {
        setEstadoproceso(true);
        await insertarCategorias(p);
        setEstadoproceso(false);

        onClose();
      } catch (error) {
        alert("error ingresar Form");
      }
    }
  }

  useEffect(() => {
    if (accion === "Editar") {
      setEmojiselect(dataSelect.icono);
      setColor(dataSelect.color);
    }
  }, []);
  return (
    <Overlay onClick={onClose}>
      {estadoProceso && <Spinner />}

      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {accion == "Editar"
              ? "Editar categoría"
              : "Nueva categoría"}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <v.iconocerrar />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit(insertar)}>
          <ModalBody>
            <FormField>
              <Label>Descripción</Label>
              <InputText
                defaultValue={dataSelect.descripcion}
                register={register}
                placeholder="Ej: Supermercado"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </FormField>

            <FormField>
              <Label>
                <v.paletacolores style={{ marginRight: '8px' }} />
                Color
              </Label>
              <ColorPickerWrapper>
                <CirclePicker onChange={elegirColor} color={currentColor} />
              </ColorPickerWrapper>
            </FormField>

            <FormField>
              <Label>Icono</Label>
              <EmojiSelector onClick={() => setShowPicker(!showPicker)}>
                <EmojiDisplay>{emojiselect}</EmojiDisplay>
                <span style={{ fontSize: '14px', color: 'inherit' }}>Seleccionar icono</span>
              </EmojiSelector>
              
              {showPicker && (
                <EmojiPickerOverlay onClick={() => setShowPicker(false)}>
                  <EmojiPickerContainer onClick={(e) => e.stopPropagation()}>
                    <Emojipicker onEmojiClick={onEmojiClick} />
                  </EmojiPickerContainer>
                </EmojiPickerOverlay>
              )}
            </FormField>
          </ModalBody>

          <ModalFooter>
            <Btnsave
              icono={<v.iconoguardar />}
              titulo={accion == "Editar" ? "Actualizar" : "Guardar"}
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
  max-width: 500px;
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
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
`;

const ColorPickerWrapper = styled.div`
  padding: 12px 0;
`;

const EmojiSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.bgAlpha};
  }
`;

const EmojiDisplay = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmojiPickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const EmojiPickerContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;
