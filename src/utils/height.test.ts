import { formatHeightImperial } from './height';

function check(actual: string, expected: string, label: string): void {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

// Spot checks across the fit-calculator slider range (145–195 cm).
check(formatHeightImperial(145), `4'9"`, '145 cm');
check(formatHeightImperial(165), `5'5"`, '165 cm');
check(formatHeightImperial(175), `5'9"`, '175 cm');
check(formatHeightImperial(180), `5'11"`, '180 cm');
check(formatHeightImperial(181), `5'11"`, '181 cm');
// 182 cm is 71.65" — it must round up to 6'0", never display 5'12".
check(formatHeightImperial(182), `6'0"`, '182 cm');
check(formatHeightImperial(183), `6'0"`, '183 cm');
check(formatHeightImperial(190), `6'3"`, '190 cm');
check(formatHeightImperial(195), `6'5"`, '195 cm');

console.log('height.test.ts: all assertions passed');
