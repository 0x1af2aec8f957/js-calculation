/*!
 * calculation.js v2.0.7
 * 2017 0x23fd5097@gmail.com
 * Released under the MIT License.
 */
// export { config } from 'https://esm.sh/mathjs';

import { computedPrefix, computedInfix, computedPostfix } from './src/parse.ts';
import { isOperator } from './src/utils.ts';
// config({
//     number: 'BigNumber',
//     precision: 64
// });

export default (str: string): number => {
    const isPrefixNotation = isOperator(str[0]);
    // const isInfixNotation: boolean;
    const isPostfixNotation = isOperator(str[str.length - 1]);

    if (isPrefixNotation) return computedPrefix(str).toNumber();
    if (isPostfixNotation) return computedPostfix(str).toNumber();

    return computedInfix(str);
};

//github.com => https://github.com/noteScript/js-calculation.git
