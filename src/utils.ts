import { hasNumericValue, add, subtract, multiply, divide, mod, pow } from 'https://esm.sh/mathjs';

import ASTNode from './node.ts';

export const OPERATOR = { // 运算符
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': mod,
    '**': pow,
};

export function isConstantNumber(token: string) { // 是否是Math携带的常量
    // const CONS_NUMBER = ['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2']; // Math对象下的常量
    return Object.hasOwnProperty.call(Math, token) && typeof Math[token as keyof Math] === 'number';
}

export function isFunction(token: string){ // 是否是Math携带的方法
    return Object.hasOwnProperty.call(Math, token) && typeof Math[token as keyof Math] === 'function';
}

export function isOperator(token: string){ // 是否是运算符
    return Object.keys(OPERATOR).includes(token);
}

export function isNumber(token: string, hasConstant: boolean = true){ // 是否是数字
    // return isFinite(token as unknown as number);
    return hasNumericValue(token) || (hasConstant && isConstantNumber(token));
}

export function isTreeNode(obj: Object){ // 是否是ast-tree
    return obj instanceof ASTNode;
}