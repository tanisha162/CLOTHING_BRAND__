// Format a height in centimetres as feet and inches, e.g. 165 -> 5'5".
// Rounding total inches first (instead of rounding feet and inches
// separately) keeps the result valid: 182 cm is 71.65", i.e. 6'0",
// not 5'12" as the old floor-then-round math produced.
export function formatHeightImperial(heightCm: number): string {
  const totalInches = Math.round(heightCm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
}
