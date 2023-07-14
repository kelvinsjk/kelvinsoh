import { math, display } from 'mathlifier';
import {
	completeSquare,
	getRandomInt,
	Polynomial,
	sample,
	Fraction,
	getRandomFrac,
	Rational,
	factorize,
	longDivide,
	Term,
	sampleN,
	sin,
	cos,
	tan,
	heads,
	type Angle,
	asin,
	acos,
	Expression,
} from 'mathlify';

// %preambleArgs=P%

const title = 'Mathlified Demo';

const e = `\\mathrm{e}`;

// Expansion
// (kx^n)^2 - (ax+b)^2
const q1 = (() => {
	const k = getRandomInt(2, 5);
	const n = getRandomInt(3, 5);
	const a = getRandomInt(2, 5);
	const b = getRandomInt(-9, 9, { avoid: 0 });
	const k_xN = new Polynomial([k], { degree: n });
	const ax_plus_b = new Polynomial([a, b]);
	const body = `Simplify
    ${math(`(${k_xN})^2 - (${ax_plus_b})^2.`)}
	`;
	// answers
	const simplified = k_xN.pow(2).minus(ax_plus_b.pow(2));
	const ans = `${math(`${simplified}.`, { wrap: true })}`;
	return [
		{
			body,
			marks: 2
		},
		{
			body: ans,
		},
	];
})();

// Complete the square
// x^2 + b x + c where b is even
const q2 = (() => {
	const b = getRandomInt(-4, 4, { avoid: 0 }) * 2;
	const c = getRandomInt();
	const poly = new Polynomial([1, b, c]);
	const body = `Express
    ${math(`${poly}`)}
    in the form ${math(`(x+h)^2 + k.`)}
	`;
	// answers
	const simplified = completeSquare(poly);
	const ans = `${math(`${simplified}.`, { wrap: true })}`;
	return [
		{
			body,
			marks: 2
		},
		{
			body: ans,
		},
	];
})();

// Quadratic inequalities
// (x-x1)(ax+b) sign 0
// poly sign c
const q3 = (() => {
	const x1 = getRandomInt(-9, 9, { avoid: 0 });
	let a = getRandomInt(1, 3);
	let b = getRandomInt(-9, 9, { avoid: 0 });
	({
		numbers: [a, b],
	} = factorize(a, b));
	const c = getRandomInt(-9, 9, { avoid: 0 });
	const factor1 = new Polynomial([1, -x1]);
	const factor2 = new Polynomial([a, b]);
	const quad = factor1.times(factor2);
	const signs = ['<', '\\leq ', '>', '\\geq '];
	const signIndex = getRandomInt(0, 3);
	const sign = signs[signIndex];
	const body = `Solve
    ${math(`${quad.plus(c)} ${sign} ${c}.`)}
	`;
	// answers
	const [root1, root2] = [x1, new Fraction(-b, a)].sort((a, b) => a.valueOf() - b.valueOf());
	let ans: string;
	if (signIndex < 2) {
		// less than
		ans = `${math(`${root1} ${sign} x ${sign} ${root2}.`)}`;
	} else {
		// greater than
		const oppSign = signs[signIndex - 2];
		ans = `${math(`x ${oppSign} ${root1}`)} or ${math(`x ${sign} ${root2}.`)}`;
	}
	return [
		{
			body,
			marks: 2
		},
		{
			body: ans,
		},
	];
})();

// Rational expressions
// (x-r1)(x-r2) / (x-r3) = 0
// [rational + ax+b]  - (ax + b) + c = c
// [rational + ax+b]  - [ax + b - c] = c
// term1 - term2 = c
const q4 = (() => {
	const root1 = getRandomInt(-3, 3, { avoid: 0 });
	let { a, b } = {
		a: getRandomInt(1, 5),
		b: getRandomInt(-5, 5),
	};
	({
		numbers: [a, b],
	} = factorize(a, b));
	const root3 = getRandomInt(-5, 5, { avoid: [root1, 0] });
	const root2 = getRandomFrac({ avoid: [root1, root3, 0] });
	const c = getRandomInt(-5, 5, { avoid: [0, b] });

	// construct qn
	const poly = new Polynomial([a, b]);
	const rationalNum = new Polynomial([1, -root1]).times(new Polynomial([root2.den, -root2.num]));
	const rationalDen = new Polynomial([1, -root3]);
	const rational = new Rational(rationalNum, rationalDen);
	const term1 = rational.plus(poly);
	const term2 = poly.minus(c);
	// qn
	const body = `Solve
    ${display(`${term1} - (${term2}) = ${c}.`)}
	`;
	// answers
	const ans = `${math(`x=${root1}`)} or ${math(`x=${root2}.`)}`;
	return [
		{
			body,
			marks: 3
		},
		{
			body: ans,
		},
	];
})();

// Long division
// (ax^2 + bx + c) / (x+d)
const q5 = (() => {
	let a = getRandomInt(1, 3);
	let b = getRandomInt(-9, 9, { avoid: 0 });
	let c = getRandomInt(-9, 9, { avoid: 0 });
	const d = getRandomInt(-9, 9, { avoid: 0 });
	({
		numbers: [a, b, c],
	} = factorize(a, b, c));
	// construct qn
	const num = new Polynomial([a, b, c]);
	const den = new Polynomial([1, d]);
	// qn
	const body = `Long divide
    ${math(`\\displaystyle \\frac{${num}}{${den}}.`)}
	`;
	// answers
	const { quotient, remainder } = longDivide(num, den);
	const ans = `${math(`\\displaystyle x=${quotient} + \\frac{${remainder}}{${den}}.`, {
		wrap: true,
	})}`;
	return [
		{
			body,
			marks: 2
		},
		{
			body: ans,
		},
	];
})();

// Ln/Exp manipulation I
// ln( b-ax ) = -kt
const q6 = (() => {
	let a = getRandomInt(1, 5);
	let b = getRandomInt(1, 9, { avoid: 0 });
	const k = getRandomInt(1, 9, { avoid: 0 });
	({
		numbers: [a, b],
	} = factorize(a, b));
	// construct qn
	const poly = new Polynomial([b, -a], { ascending: true });
	const minus_kt = new Polynomial(-k, { variable: 't' });
	// qn
	const body = `Make ${math(`x`)} the subject from the following equation:
    ${display(`\\ln (${poly}) = ${minus_kt}.`)}
	`;
	const part = `What can you say about ${math(`x`)} for large values of ${math(`t?`)}`;
	// answers
	const num = `${b}-${e}^{${minus_kt}}`;
	const frac = a === 1 ? `${num}` : `\\frac{${num}}{${a}}`;
	const ans = `${math(`\\displaystyle x = ${frac}.`, {
		wrap: true,
	})}`;
	return [
		{
			parts: [{ body, marks: 1 }, { body: part, marks: 1 }],
		},
		{
			parts: [{ body: ans,  }, { body: `${math(`x \\to ${new Fraction(b, a)}.`)}`, }],
		},
	];
})();

// Ln/Exp manipulation II
// ln( (a+y)/(a-y) ) = kt
const q7 = (() => {
	const a = getRandomInt(1, 10);
	const k = getRandomInt(1, 9, { avoid: 0 });
	const kt = new Polynomial(k, { variable: 't' });
	// qn
	const body = `Make ${math(`y`)} the subject from the following equation:
    ${display(`\\ln \\left( \\frac{${a}+y}{${a}-y} \\right) = ${kt}.`)}
	`;
	const part = `*** What can you say about ${math(`y`)} for large values of ${math(`t?`)}`;
	// answers
	const exp = `${e}^{${kt}}`;
	const expTerm = new Term(a, exp);
	const frac = `\\frac{${expTerm} - ${a}}{${exp} + 1}`;
	const ans = `${math(`\\displaystyle x = ${frac}.`, {
		wrap: true,
	})}`;
	return [
		{
			parts: [{ body, marks: 3 }, { body: part, marks: 1}],
		},
		{
			parts: [{ body: ans }, { body: `${math(`y \\to ${a}.`)}` }],
		},
	];
})();

// Trig special angles
const q8 = (() => {
	const dens = [3, 4, 6];
	const [den1, den2] = sampleN(2, dens);
	const theta1 = `\\frac{\\pi}{${den1}}`;
	const theta2 = `\\frac{\\pi}{${den2}}`;
	const theta3 = `\\frac{${den2 - 1}\\pi}{${den2}}`;
	const trigFns = [`\\sin `, '\\cos ', '\\tan '];
	const trig2Index = getRandomInt(0, 2);
	const trig3Index = getRandomInt(0, 2);
	const trig2 = trigFns[trig2Index];
	const trig3 = trigFns[trig3Index];
	// qn
	const body = `Evaluate the following, leaving your answer in exact form.`;
	const partA = `${math(`${trigFns[0]} ${theta1},`)}`;
	const partB = `${math(`${trigFns[1]} ${theta1},`)}`;
	const partC = `${math(`${trigFns[2]} ${theta1},`)}`;
	const partD = `${math(`${trig2} ${theta2},`)}`;
	const partE = `${math(`${trig3} ${theta3}.`)}`;
	// answers
	const surdA = sin(180 / den1);
	const surdB = cos(180 / den1);
	const surdC = tan(180 / den1);
	const fns = [sin, cos, tan];
	const surdD = fns[trig2Index](180 / den2);
	const surdE = fns[trig3Index](180 - 180 / den2);
	const ansA = `${math(`${surdA}.`)}`;
	const ansB = `${math(`${surdB}.`)}`;
	const ansC = `${math(`${surdC}.`)}`;
	const ansD = `${math(`${surdD}.`)}`;
	const ansE = `${math(`${surdE}.`)}`;

	return [
		{
			body,
			parts: [{ body: partA, marks: 1 }, { body: partB, marks: 1 }, { body: partC, marks: 1 }, { body: partD, marks: 1 }, { body: partE, marks: 1 }],
		},
		{
			parts: [{ body: ansA }, { body: ansB }, { body: ansC }, { body: ansD }, { body: ansE }],
		},
	];
})();

// Double angle
// cos 2theta + (1-2b) sin theta + (b-1) = 0
// cos 2theta + (2b-1) cos theta + (-b+1) = 0
// cos 2theta + k sin/cos + c = 0
const q9 = (() => {
	const b = getRandomInt(2, 4) * (heads() ? 1 : -1);
	const isSine = heads();
	// construct qn
	const sin = isSine ? `\\sin \\theta ` : `\\cos \\theta `;
	let k: number, c: number, theta: Angle;
	if (isSine) {
		k = 1 - 2 * b;
		c = b - 1;
		theta = asin(new Fraction(1, 2));
	} else {
		k = 2 * b - 1;
		c = 1 - b;
		theta = acos(new Fraction(1, 2));
	}
	const eqn = new Expression(`\\cos 2 \\theta `, new Term(k, sin), c);
	// qn
	const body = `Solve, for ${math(`0 \\leq \\theta \\leq \\frac{\\pi}{2},`)}
    ${display(`${eqn} = 0.`)}
	`;
	// answers
	const ans = `${math(`\\theta = ${theta}.`, {
		wrap: true,
	})}`;
	return [
		{
			body,
			marks: 3
		},
		{
			body: ans,
		},
	];
})();

// Trig square formulas
// a1 s^2 + b1 = a c^2 + b
const q10 = (() => {
	const trigFns = sample([
		['\\sin^2 \\theta', '\\cos^2 \\theta'],
		['\\tan^2 \\theta', '\\sec^2 \\theta'],
	]);
	if (heads()) {
		trigFns.reverse();
	}
	const [trig1, trig2] = trigFns;
	const a1 = getRandomInt(-9, 9, { avoid: 0 });
	const b1 = getRandomInt(-9, 9);
	const exp = new Expression(new Term(a1, trig1), b1);
	// construct qn
	const body = `Find the values of the constants ${math(`a`)} and
    ${math('b')} such that
    ${display(`${exp} = a${trig2} + b`)}
    for all values of ${math(`\\theta.`)}
	`;
	// construct ans
	let a: number, b: number;
	if (trig1 === '\\tan^2 \\theta' || trig1 === '\\sec^2 \\theta') {
		a = a1;
		b = trig1 === '\\tan^2 \\theta' ? b1 - a1 : b1 + a1;
	} else {
		a = -a1;
		b = a1 + b1;
	}
	// answers
	const ans = `${math(`a = ${a},`)} ${math(`b=${b}.`)}`;
	return [
		{
			body,
			marks: 3
		},
		{
			body: ans,
		},
	];
})();

export const qns = {
	title,
	qns: [q1[0], q2[0], q3[0], q4[0], q5[0], q6[0], q7[0], q8[0], q9[0], q10[0]],
	ans: [q1[1], q2[1], q3[1], q4[1], q5[1], q6[1], q7[1], q8[1], q9[1], q10[1]],
};
