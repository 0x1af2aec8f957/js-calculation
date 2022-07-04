import type { BigNumber } from 'https://esm.sh/mathjs';

import { bignumber, evaluate } from 'https://esm.sh/mathjs';

import { isNumber, isConstantNumber, isOperator, isFunction, OPERATOR } from './utils.ts';

export function computedPrefix(expr: string | string[]) { // 前缀表达式
    const nodes = typeof expr === 'string' ? expr.split(/\s+/) : expr; // 表达式节点
    const _nodes: BigNumber[] = [];

    for (let index = 0; index < nodes.length;){
        const node = nodes[index];

        if (isNumber(node, false)) {
            _nodes.push(bignumber(node)); // 数字存储
            index += 1;
            continue;
        }

        if (isConstantNumber(node)) {
            _nodes.push(bignumber(Math[node as keyof Math] as number)); // 常量存储为数字
            index += 1;
            continue;
        }

        if (isFunction(node)) { // 方法计算
            const paramsLength = (Math[node as keyof Math] as Function).length;
            _nodes.push(bignumber((Math[node as keyof Math] as Function)(
                ...new Array(paramsLength)
                .fill(undefined)
                .map((_, _index) => nodes[index + _index + 1])
            )));

            index += paramsLength;
            continue;
        };

        if (isOperator(node)) { // 运算符计算
            const paramsLength = OPERATOR[node as keyof typeof OPERATOR].length;
            _nodes.push(bignumber((OPERATOR[node as keyof typeof OPERATOR] as Function)(
                ...new Array(paramsLength)
                .fill(undefined)
                .map((_, _index) => nodes[index + _index + 1])
            )));

            index += paramsLength;
            continue;
        }

        index += 1;
    }

    return _nodes.pop() as BigNumber;
}

export function computedInfix(expr: string | string[]): number { // 中缀表达式
    const _expr = typeof expr === 'string' ? expr : expr.join(''); // 表达式节点
    return evaluate(_expr);
}

export function computedPostfix(expr: string | string[]) { // 后缀表达式
    const nodes = typeof expr === 'string' ? expr.split(/\s+/) : expr; // 表达式节点

    return nodes.reduce<BigNumber[]>((_nodes, node) => { // 数字存储
        if (isConstantNumber(node)) { // 常量存储为数字
            _nodes.push(bignumber(Math[node as keyof Math] as number));
            return _nodes;
        }

        if (isFunction(node)) { // 方法计算
            _nodes.push(bignumber((Math[node as keyof Math] as Function)(
                ...new Array((Math[node as keyof Math] as Function).length)
                .fill(undefined)
                .map(() => _nodes.pop() as BigNumber)
                .reverse()
            )));
            return _nodes;
        }

        if (isOperator(node)) { // 运算符计算
            _nodes.push(bignumber((OPERATOR[node as keyof typeof OPERATOR] as Function)(
                ...new Array(OPERATOR[node as keyof typeof OPERATOR].length)
                .fill(undefined)
                .map(() => _nodes.pop() as BigNumber)
                .reverse()
            )));
            return _nodes;
        }

        if (isNumber(node, false)) {
            _nodes.push(bignumber(node));
        }

        return _nodes;

    }, []).shift() as BigNumber;
};