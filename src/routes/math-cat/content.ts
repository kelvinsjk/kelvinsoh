import { alignStar, display, gatherStar, math, newParagraph, } from "mathlifier"
import { Polynomial, Expression, Term, factorizeQuadratic } from "mathlify";
import { generateInequalitiesAnswer } from "$lib/qnGen/01-eqns/generateInequalitiesAnswer";
// (3x-7)/(x-1) > 1-x
const a = 3, b = -7, c = -1, d=1, e = -1, sign='>';
const num1 = new Polynomial([a, b]);
const den = new Polynomial([1, c]);
const rhs = new Polynomial([d,e], {ascending: true});
// move to rhs
const lhs1 = new Expression(`\\frac{${num1}}{${den}}`, -d, new Term(-e, 'x') );
// combine
const num2 = `${num1} + (${rhs.negative()})(${den})`;
const num3 = num1.minus(rhs.times(den));
// factorise
const [factor1, factor2, roots] = factorizeQuadratic(num3);
// number line
const ans = generateInequalitiesAnswer(roots[0], roots[1], -c);

const title = 'Factorisable expressions';

const body = `Solve ${display(`\\frac{${num1}}{${den}} ${sign} ${rhs}.`)}`;

const steps = [
  {
    title: 'Do not cross multiply!',
    body: `When working with rational equations like
      ${display(`\\frac{${num1}}{${den}} = ${rhs},`)}
      it is very common to "cross-multiply".
      ${newParagraph}
      That will not work any more when
      dealing with inequalities as the sign of the inequality changes
      under multiplication depending on whether we are multiplying by a positive or
      negative term.
      ${newParagraph}
      Our denominator 
      ${math(`${den}`)}  is either positive or negative, depending on
      ${math(`x`)} so applying the multiplication step to an inequality will lead to
      a wrong result.`
  },
  {
    title: 'Move terms by addition or subtraction',
    body: `Since cross multiplication is not valid, we will use addition or subtraction to
      move terms around such that one side of the inequality is zero.
      ${newParagraph}
      For our example, this gives us
      ${gatherStar(`\\frac{${num1}}{${den}} ${sign} ${rhs} \\\\
        ${lhs1} ${sign} 0`)}
    `
  },
  {
    title: 'Combine into a single fraction',
    body: `We then combine the terms into a single fraction
      ${gatherStar(`${lhs1} ${sign} 0 \\\\
      \\frac{${num2}}{${den}} ${sign} 0 \\\\
      \\frac{${num3}}{${den}} ${sign} 0`)}
    `
  },
  {
    title: 'Factorise everything',
    body: `We proceed with factorization
      ${alignStar(`\\frac{${num3}}{${den}} &${sign} 0 \\\\
      \\frac{(${factor1})(${factor2})}{${den}} &${sign} 0 \\\\
      `)}
    `
  },
  {
    title: 'The number line approach',
    body: `The factors ${math(`(${factor1}),`)}
    ${math(`(${factor2})`)} and
    ${math(`(${den})`)} have corresponding roots
    ${math(`${roots[0]}, ${roots[1]}`)} and ${math(`${-c}`)}.
    Let's plot them out on a number line
    ${newParagraph}
    <img src="svgs/Number_Line_1.svg" alt="number_line_regions" class="content-svg" />
    ${newParagraph}    
    We notice that the number line is now broken up into 4 regions which we
    name ${math(`A,B,C`)} and ${math(`D.`)}
    ${newParagraph}
    Now consider region ${math(`A`)} on the right. That happens when
    ${math(`x`)} is bigger than ${math(`2.`)} Under such a case,
    our fraction ${math(`\\frac{(${factor1})(${factor2})}{${den}}`)} is positive
    because, individually
    ${math(`(${factor1}),`)}
    ${math(`(${factor2})`)} and
    ${math(`(${den})`)} will be positive when ${math(`x > 2.`)}
    ${newParagraph}
    Now consider region ${math(`B,`)} where ${math(`1 < x < 2.`)}
    Now ${math(`(x-2)`)} will be negative while
    ${math(`(x+3)`)} and ${math(`(x-1)`)} will still be positive so our overall fraction
    ${math(`\\frac{(x+3)(x-2)}{x-1}`)} will be negative.
    ${newParagraph}
    Repeating this analysis over regions ${math(`C`)}
    and ${math(`D`)} gives us the following picture:
    ${newParagraph}
    <img src="svgs/Number_Line_2.svg" alt="number_line_regions_positive_and_negative" class="content-svg" />
    ${newParagraph}`,
    info: `An alternative method to the analysis above will be a "test point" method, where
      we substitute test values (e.g. ${math(`x=3`)} for region ${math(`A`)} and ${math(`x=1.5`)} for region ${math(`B`)})
      into the fraction to check if the result is positive or negative.`
  },
  {
    title: 'The final answer',
    body: `We are now ready to solve our inequality. We want
      ${display(`\\frac{(x+3)(x-2)}{x-1} > 0`)}
      so that means the answers are located in the positive regions
      ${math(`C`)} and ${math(`A.`)}
      ${newParagraph}
      This gives us our final answer
      ${ans}
    `
  }
]

export const content = {
  title,
  body,
  steps,
}