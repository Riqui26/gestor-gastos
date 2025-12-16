import { Button } from "../atoms/Button";

// ═══════════════════════════════════════════════════════════
//   BTNFILTRO - Wrapper de compatibilidad para Button circular
//   Usar <Button variant="circular" /> en nuevos componentes
// ═══════════════════════════════════════════════════════════

export function Btnfiltro({ bgcolor, textcolor, icono, funcion }) {
  // Determinar variante basada en bgcolor
  const getVariant = () => {
    if (!bgcolor) return "circular";
    if (bgcolor === '#53B257' || bgcolor.toLowerCase().includes('green')) return "success";
    if (bgcolor === '#F54E41' || bgcolor === '#fe6156' || bgcolor.toLowerCase().includes('red')) return "danger";
    return "primary";
  };

  return (
    <Button
      variant="circular"
      style={bgcolor ? { backgroundColor: bgcolor, borderColor: bgcolor } : {}}
      icon={icono}
      onClick={funcion}
      aria-label="Filtro"
    />
  );
}
