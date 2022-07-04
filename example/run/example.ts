import accuracy, { config } from '../../main.ts';

console.log('Postfix notation: ', accuracy('0.1 0.1 *'));

console.log('Prefix notation: ', accuracy('* 0.1 0.1'));

console.log('Postfix notation: ', accuracy('0.1 0.1 * 0.1 -'));

console.log('Postfix notation: ', accuracy('0.1 0.1 * 0.1 - 0.1 0.1 * +'));

// config({
//     number: 'BigNumber',
//     precision: 64
// });

console.log('Infix notation: ', accuracy('0.1 * 0.1'));
