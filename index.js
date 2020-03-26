/*!
 * calculation.js v2.0.3
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

const IS_NUMBER = /^\-?\d*\.?\d*$/; // 注意当前版本不支持直接传入科学计数法的计算，但在框架运行时计算产生的科学计数法是可以被正常处理的
const CONS_NUMBER = ['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2'];

export const calc = {
    '/': function (arg1, arg2) { // 除法
        const t1 = String(arg1).split('.')[1] ? String(arg1).split('.')[1].length : 0;
        const t2 = String(arg2).split('.')[1] ? String(arg2).split('.')[1].length : 0;
        const result = (Number(arg1) * (10 ** t1)) / (Number(arg2) * (10 ** t2));

        return this['*'](result, 10 ** (t2 - t1));
    },
    '*': function (arg1, arg2) { // 乘法
        const s1 = String(arg1);
        const s2 = String(arg2);
        let m = s1.split('.')[1] ? s1.split('.')[1].length : 0;
        m += s2.split('.')[1] ? s2.split('.')[1].length : 0;
        const result = (Number(arg1) * Number(arg2)).toFixed(m + 1).substring(0, m);

        return Number(result);
    },
    '+': function (arg1, arg2) { // 加法
        const r1 = String(arg1).split('.')[1] ? String(arg1).split('.')[1].length : 0;
        const r2 = String(arg2).split('.')[1] ? String(arg2).split('.')[1].length : 0;
        const m = 10 ** Math.max(r1, r2);

        return (arg1 * m + arg2 * m) / m;
    },
    '-': function (arg1, arg2) { // 减法
        const r1 = String(arg1).split('.')[1] ? String(arg1).split('.')[1].length : 0;
        const r2 = String(arg2).split('.')[1] ? String(arg2).split('.')[1].length : 0;
        const m = 10 * Math.max(r1, r2);
        const n = (r1 >= r2) ? r1 : r2;

        return Number(((arg1 * m - arg2 * m) / m).toFixed(n + 1).substring(0, n));
    },
    '%': function (arg1, arg2) { // 余数
        const r1 = String(arg1).split('.')[1] ? String(arg1).split('.')[1].length : 0;
        const r2 = String(arg2).split('.')[1] ? String(arg2).split('.')[1].length : 0;
        const m = 10 ** Math.max(r1, r2);
        return this['*'](arg1, m) % this['*'](arg2, m) / m;
    },
    '**': function (arg1, arg2) { // 幂运算
        const r1 = String(arg1).split('.')[1] ? String(arg1).split('.')[1].length : 0;
        return (arg1 ** arg2).toFixed(this['*'](r1, arg2))
    },
    'imul': function (arg1, arg2) {
        return Math.imul(arg1, arg2)
    },
    'hypot': function (arg1, arg2) {
        return Math.hypot(arg1, arg2)
    },
    'atan2': function (arg1, arg2) {
        return Math.atan2(arg1, arg2)
    },
    'max': function (arg1, arg2) {
        return Math.max(arg1, arg2)
    },
    'min': function (arg1, arg2) {
        return Math.min(arg1, arg2)
    },
};

export default str => {
    const OPERATORS = Object.keys(calc);
    return str.split(' ').reduce((acc, cur) => {
        switch (true) {
            case OPERATORS.includes(cur):
                acc.push(calc[cur](...[acc.pop(), acc.pop()].reverse()));
                break;
            case IS_NUMBER.test(cur):
                acc.push(cur);
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
