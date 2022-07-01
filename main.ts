/*!
 * calculation.js v2.0.6
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */
export { config } from 'https://esm.sh/mathjs';

import { computedPrefix, computedInfix, computedPostfix } from './src/parse.ts';
import { isOperator } from './src/utils.ts';
// config({
//     number: 'BigNumber',
//     precision: 64
// });

export default (str: string): number | undefined => {
    const isPrefixNotation = isOperator(str[0]);
    // const isInfixNotation: boolean;
    const isPostfixNotation = isOperator(str[str.length - 1]);

    if (isPrefixNotation) return computedPrefix(str)?.toNumber();
    if (isPostfixNotation) return computedPostfix(str)?.toNumber();

    return computedInfix(str);
};

//github.com => https://github.com/noteScript/js-calculation.git
