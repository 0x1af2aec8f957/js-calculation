> calculation.js@2.0.4

##### matters needing attention

Due to release errors, js-accuracy is changed to js-calculation from now on！

This only applies to small projects, and if you're building a large project, recommend that you use [math.js](https://github.com/josdejong/mathjs) to meet your needs!

You need to use Babel with it

## install calculation.js

```bash

npm install js-calculation

```

## use calculation.js

``` javascript

import calc from 'js-calculation'

calc('0.1 0.1 *') // 0.01
calc('0.1 0.1 * 0.1 -') // -0.09
calc('0.1 0.1 * 0.1 - 0.1 0.1 * +') // -0.08

```

## mark

+ [逆波兰表示法·RPN](https://zh.wikipedia.org/wiki/%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)
+ [调度场算法·Shunting Yard Algorithm](https://zh.wikipedia.org/wiki/%E8%B0%83%E5%BA%A6%E5%9C%BA%E7%AE%97%E6%B3%95)

##  License

[MIT](http://opensource.org/licenses/MIT)

[calculation.js@2.0.4](https://github.com/noteScript/js-calculation.git)
