import { display } from "mathlifier";
import type { Fraction } from "mathlify";

// generate inequalities answer for 3 roots
export function generateInequalitiesAnswer(a: number|Fraction, b: number|Fraction, c:number|Fraction, signCase=1, qed=true): string {
  const roots = [a,b,c].sort((a,b)=>a.valueOf()-b.valueOf());
  const blackSquare = qed ? '\\quad \\blacksquare' : '';
  return signCase===1 ?
    `${display(`${roots[0]} < x < ${roots[1]} \\quad \\textrm{ or }  \\quad x > ${roots[2]} ${blackSquare}`)}`:
    `${display(`x < ${roots[0]} \\quad \\textrm{ or }  \\quad ${roots[1]} < x < ${roots[2]} ${blackSquare}`)}`;
}