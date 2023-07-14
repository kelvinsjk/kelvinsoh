import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mathlified } from 'vite-plugin-sveltekit-tex';

const preamble = (x?: string) => {
	return `\\usepackage[theoremfont,trueslanted,largesc,p]{newpxtext}
\\usepackage{amsmath, amssymb}
\\usepackage{unicode-math}
\\setmathfont{Asana-Math}
\\usepackage{enumitem}
\\usepackage{multicol}
\\usepackage{microtype}
\\usepackage{hyperref}
\\usepackage{graphicx}
\\renewcommand{\\rmdefault}{put}
\\usepackage{parskip}
\\newlength{\\currentparskip}
\\hyphenpenalty=9999
\\exhyphenpenalty=9999
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\pagestyle{headandfoot}
\\firstpageheader{}{\\textbf{Mathlified Demo}}{2023}
\\runningheader{}{}{}
\\headrule
\\footer{Kelvin Soh}{\\url{https://github.com/kelvinsjk}}{Page \\thepage}
\\footrule
\\pointsinrightmargin\n\\bracketedpoints\n\\pointsdroppedatright
`;
};

export default defineConfig({
	plugins: [
		sveltekit(),
		mathlified({
			docOptions: 'a4paper,12pt',
			exts: {
				qns: {
					latexOptions: {
						cls: 'exam',
						preamble,
					},
				},
			},
		}),
	]
});
