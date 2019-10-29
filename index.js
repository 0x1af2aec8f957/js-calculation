/*!
 * calculation.js v2.0.0
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

const IS_NUMBER = /^\-?\d*\.?\d?$/;

const calc = {
    '/': function (arg1, arg2) { // 除法
        const t1 = String(arg1).split('.')[1] ? String(arg1).split('.')[1].length : 0;
        const t2 = String(arg2).split('.')[1] ? String(arg2).split('.')[1].length : 0;
        const r1 = Number(String(arg1).replace('.', ''));
        const r2 = Number(String(arg2).replace('.', ''));

        return this['*']((r1 / r2), 10 ** (t2 - t1));
    },
    '*': function (arg1, arg2) { // 乘法
        const s1 = String(arg1);
        const s2 = String(arg2);
        let
            m = s1.split('.')[1] ? s1.split('.')[1].length : 0;
        m += s2.split('.')[1] ? s2.split('.')[1].length : 0;
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m);
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

        return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    },
};

export default str => {
    const OPERATORS = Object.keys(calc);
    return str.split(' ').reduce((acc, cur) => {
        if (OPERATORS.includes(cur)) acc.push(calc[cur](acc.pop(), acc.pop()));
        else if (IS_NUMBER.test(cur)) acc.push(cur);
        return acc;
    }, []).shift();
};


//github.com => https://github.com/noteScript/js-calculation.git
