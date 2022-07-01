import accuracy from '../../main.ts';

console.log(accuracy('0.1 0.1 *'));

console.log(accuracy('0.1 0.1 * 0.1 -'));

console.log(accuracy('0.1 0.1 * 0.1 - 0.1 0.1 * +'));
