'use strict';

const tailOptimizer = require('./index');

let ex1 = counter =>
    (counter > 0 && ex2(counter)) || counter;

let ex2 = counter =>
    ex1(counter - 3);

[ex2, ex1] = tailOptimizer(ex2, ex1);

console.log(ex2(100000));