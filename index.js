/*!
 * calculation.js v1.0.1
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : (global.calculation = factory());
})(this, function () {
  return {
    division(arg1, arg2) { //除法
      var t1 = String(arg1).split(".")[1] ? String(arg1).split(".")[1].length : 0,
          t2 = String(arg2).split(".")[1] ? String(arg2).split(".")[1].length : 0, 
          r1 = Number(String(arg1).replace(".", "")), 
          r2 = Number(String(arg2).replace(".", ""));
      
      return this.multiplication((r1 / r2), Math.pow(10, t2 - t1));
    },
    multiplication(arg1, arg2) {//乘法
      var s1 = String(arg1), s2 = String(arg2), m = s1.split(".")[1] ? s1.split(".")[1].length : 0;
      m += s2.split(".")[1] ? s2.split(".")[1].length : 0;
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    addition(arg1, arg2) {//加法
      var r1 = String(arg1).split(".")[1] ? String(arg1).split(".")[1].length : 0, 
          r2 = String(arg2).split(".")[1] ? String(arg2).split(".")[1].length : 0,
          m = Math.pow(10, Math.max(r1, r2));
     
      return (arg1 * m + arg2 * m) / m
    },
    subtraction(arg1, arg2) {//减法
      var r1 = String(arg1).split(".")[1] ? String(arg1).split(".")[1].length : 0,
          r2 = String(arg2).split(".")[1] ? String(arg2).split(".")[1].length : 0,
          m =  Math.pow(10, Math.max(r1, r2)), 
          n = (r1 >= r2) ? r1 : r2;
      
      return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    }
  }
});

//github.com => https://github.com/noteScript/js-calculation.git
