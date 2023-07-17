import { math, htmlTex, display, newParagraph } from 'mathlifier';
import type { Question, Part } from '../../lib/mathlified/content-handlers/qn';
import { Polynomial, getRandomFrac, getRandomInt, solveLinear } from 'mathlify';

const title = 'Mathlified Demo';
const qnsList: Question[] = [];
const ans: Question[] = [];


//! q1: fractional arithmetic
(() => {
	const src = `Fractional Arithmetic`;

	const body = `${htmlTex(
		`<div class="qn-bottom-padding"><b>${src}</b></div>`,
		`\\textbf{${src}}\n\n`,
	)}
		Evaluate the following:
	`;
	const parts: Part[] = [];
	const answers: Part[] = [];
	for (let i = 0; i < 5; i++) {
		// a + b = c
		const a = getRandomFrac();
		const b = getRandomFrac();
		const c = a.plus(b);
		const bBrackets = b.isAtLeast(0) ? `${b}` : `(${b})`;
		parts.push({
			body: `${math(`${a} + ${bBrackets}`)}`,
			marks: 1,
		});
		answers.push({body: `${math(`${c}.`)}`});
	}
	qnsList.push({
		body,
		parts
	});
	ans.push({
		parts: answers,
	});
})();

//! q2: fractional arithmetic
(() => {
	const src = `Linear Equations`;

	const body = `${htmlTex(
		`<div class="qn-bottom-padding"><b>${src}</b></div>`,
		`\\textbf{${src}}\n\n`,
	)}
		Solve the following equations:
	`;
	const parts: Part[] = [];
	const answers: Part[] = [];
	for (let i = 0; i < 5; i++) {
		// ax + b = c
		const a = getRandomInt(-9, 9, {avoid: [0]});
		const b = getRandomInt(-9, 9, {avoid: [0]});
		const c = getRandomInt();
		const aXPlusB = new Polynomial([a, b]);
		const x = solveLinear(aXPlusB.minus(c));
		parts.push({
			body: `${math(`${aXPlusB} = ${c}`)}`,
			marks: 2,
		});
		answers.push({body: `${math(`x = ${x}.`)}`});
	}
	qnsList.push({
		body,
		parts
	});
	ans.push({
		parts: answers,
	});
})();

export const qns = {
	title,
	qns: qnsList,
	ans,
};
