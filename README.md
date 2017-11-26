> calculation.js@1.0.0

##### matters needing attention

Due to release errors, js-accuracy is changed to js-calculation from now on！

This only applies to small projects, and if you're building a large project, recommend that you use [math.js](https://github.com/josdejong/mathjs) to meet your needs!

## install calculation.js

```bash

npm install js-calculation

```

## use calculation.js

> node import

``` bash

const accuracy=require('js-calculation');
//import accuracy from 'js-calculation'

// division example

console.log(accuracy.division(0.1,0.1));

// multiplication example

console.log(accuracy.multiplication(0.1,0.1));

// addition example

console.log(accuracy.addition(0.1,0.1));

// subtraction example

console.log(accuracy.subtraction(0.1,0.1));

```

> script label

``` bash

<script src="~/calculation/index.js">
// to do ...
// adopt window.calculation use
</script>

```

##  License

[MIT](http://opensource.org/licenses/MIT)

[calculation.js@1.0.0](https://github.com/noteScript/js-calculation.git)
