/*!
 * calculation.js v2.0.4
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

// const IS_NUMBER = /^\-?\d*\.?\d*$/; // 注意当前版本不支持直接传入科学计数法的计算，但在框架运行时计算产生的科学计数法是可以被正常处理的
const CONS_NUMBER = ['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2'];

const getDigitLength = (arg1) => {
    if (Number.isInteger(Number(arg1))) return 0; // 非小数

    const arg1Str = String(arg1);
    return ((_str) => {
        let _digit = _str.length;
        _str.replace(/e-?\d+/gim, _rem => {
            _digit += (10 * _rem.split('e')[1] - _rem.length);
            return '+++calculation.js+++';
        });
        return _digit;
    })(arg1Str.replace(/^\-?\d*\./i, ''));
};

export const calc = {
    ['/'](arg1, arg2) { // 除法
        const t1 = getDigitLength(arg1);
        const t2 = getDigitLength(arg2);

        if (!t1 && !t2) return arg1 / arg2;
        const result = (arg1 * (10 ** t1)) / (arg2 * (10 ** t2));

        return this['*'](result, 10 ** (t2 - t1));
    },
    ['*'](arg1, arg2) { // 乘法
        const t1 = getDigitLength(arg1);
        const t2 = getDigitLength(arg2);

        if (!t1 && !t2) return arg1 * arg2;
        const result = (arg1 * arg2);
        const m = t1 + t2;

        if (m > 0 && m < 99) return result.toFixed(m + 1).slice(0, -1);
        if (m < 0 || m > 99) return result;
        return result.toFixed(m);
    },
    [ '+'](arg1, arg2) { // 加法
        const t1 = getDigitLength(arg1);
        const t2 = getDigitLength(arg2);

        if (!t1 && !t2) return arg1 + arg2;
        const m = 10 ** Math.max(t1, t2);

        return (arg1 * m + arg2 * m) / m;
    },
    ['-'](arg1, arg2) { // 减法
        const t1 = getDigitLength(arg1);
        const t2 = getDigitLength(arg2);

        if (!t1 && !t2) return arg1 - arg2;
        const m = 10 * Math.max(t1, t2);
        const result = ((arg1 * m - arg2 * m) / m);
        const n = Math.max(t1, t2);

        if (n > 0 && n < 99) return result.toFixed(n + 1).slice(0, -1);
        if (n < 0 || n > 99) return result;
        return result.toFixed(n);
    },
    '%': function (arg1, arg2) { // 余数
        const t1 = getDigitLength(arg1);
        const t2 = getDigitLength(arg2);

        if (!t1 && !t2) return arg1 % arg2;
        const m = 10 ** Math.max(t1, t2);

        return this['*'](arg1, m) % this['*'](arg2, m) / m;
    },
    ['**'](arg1, arg2){
        return Math.pow(arg1, arg2);
    },
    'imul': Math.imul,
    'hypot': Math.hypot,
    'atan2': Math.atan2,
    'max': Math.max,
    'min': Math.min,
};

export default str => {
    const OPERATORS = Object.keys(calc);
    return str.split(' ').reduce((acc, cur) => {
        switch (true) {
            case OPERATORS.includes(cur):
                acc.push(calc[cur](...[acc.pop(), acc.pop()].reverse()));
                break;
            case isFinite(cur): // IS_NUMBER.test(cur)
                acc.push(Number(cur));
                break;
            case CONS_NUMBER.includes(cur):
                acc.push(Math[cur]);
                break;
            case Object.hasOwnProperty.call(Math, cur):
                acc.push(Math[cur](acc.pop()));
                break;
            default:
                break;
        }

        return acc;
    }, []).shift();
};


//github.com => https://github.com/noteScript/js-calculation.git
