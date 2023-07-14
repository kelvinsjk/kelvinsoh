import {Polynomial, Expression, Term, factorizeQuadratic} from 'mathlify';
import {display, gatherStar} from 'mathlifier';
import { generateInequalitiesAnswer } from './generateInequalitiesAnswer';

export function qnGen(vars: {a: number, b: number, c: number, d: number, B: number, signCase: number}): [string, string, string] {
  const {a,b,c,d,B,signCase} = vars;
  
  // (Cx + D) / (x-d) sign B - ax

  // C = B + ad - b - ac
  // D = bc - Bd
  const C = B + a*d - b - a*c;
  const D = b*c - B*d;
  const sign = signCase === 1 ? '>' : '<';
  const numQn = new Polynomial([C, D]);
  const den = new Polynomial([1, -d]);
  const rhs = new Polynomial([B, -a], {ascending: true});


  //// generate question
  const qn = `${display(`\\frac{${numQn}}{${den}} ${sign} ${rhs}`)}`

  //// solve question
  // move rhs over: -B + ax
  const exp1 = new Expression(`\\frac{${numQn}}{${den}}`, -B, new Term(a, 'x'));
  // combine fraction
  const negBPlusAx = new Polynomial([-B, a], {ascending: true});
  const exp2 = `\\frac{${numQn} + (${negBPlusAx})(${den})}{${den}}`;
  // expand and simplify
  const num3 = numQn.plus(negBPlusAx.times(den));
  const exp3 = `\\frac{${num3}}{${den}}`;
  // if negative, multiply by -1
  const isNegative = num3.coeffs[num3.coeffs.length-1].isLessThan(0);
  const newSign = isNegative ? toggleSign(sign) : sign;
  const exp3a = isNegative ? `\\\\ \\frac{${num3.negative()}}{${den}} &${newSign} 0` : '';
  // factorize
  const num4 = isNegative ? num3.negative() : num3;
  const [factor1, factor2, roots] = factorizeQuadratic(num4);
  const exp4 = `\\frac{${handleFactors(factor1, factor2)}}{${den}}`;

  const signGen = isNegative ? signCase*-1 : signCase;

  //// generate answer
  // const ans = generateInequalitiesAnswer(new Fraction(b,a),c,d,signCase*a);
  const ansGen = generateInequalitiesAnswer(roots[0], roots[1], d, signGen,false);

  //// generate solution
  let soln = `${gatherStar(`\\frac{${numQn}}{${den}} ${sign} ${rhs}
      \\\\ ${exp1} ${sign} 0
      \\\\ ${exp2} ${sign} 0
      \\\\ ${exp3} ${sign} 0
      ${exp3a}
      \\\\ ${exp4} ${newSign} 0
    `)}
  `;
  // TODO: number line
  soln += generateInequalitiesAnswer(roots[0], roots[1], d, signCase*a);
  return [qn, ansGen, soln];
}


function toggleSign(sign: string): string {
  return sign === '>' ? '<' : '>';
}
function factorBrackets(factor: string): string {
  return factor.length===1 ? factor : `(${factor})`;
}
function handleFactors(factor1: Polynomial, factor2: Polynomial) {
  const f1 = `${factor1}`;
  const f2 = `${factor2}`;
  return f2.length===1 ? `${factorBrackets(f2)}${factorBrackets(f1)}` : `${factorBrackets(f1)}${factorBrackets(f2)}`;
}