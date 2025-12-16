import { Button } from "../atoms/Button";

// ═══════════════════════════════════════════════════════════
//    BTNSAVE - Wrapper de compatibilidad para Button
//    Usar <Button variant="primary" /> en nuevos componentes
// ═══════════════════════════════════════════════════════════

export function Btnsave({ funcion, titulo, bgcolor, $bgcolor, icono, ...props }) {
  // Determinar variante basada en bgcolor (compatibilidad)
  const getVariant = () => {
    const color = bgcolor || $bgcolor;
    if (!color) return "primary";
    if (color === '#53B257' || color.toLowerCase().includes('green')) return "success";
    if (color === '#F54E41' || color === '#fe6156' || color.toLowerCase().includes('red')) return "danger";
    return "primary";
  };

  return (
    <Button
      variant={getVariant()}
      size="lg"
      icon={icono}
      onClick={funcion}
      type="submit"
      {...props}
    >
      {titulo}
    </Button>
  );
}
