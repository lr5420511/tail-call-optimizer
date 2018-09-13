'use strict';

const tailOptimizer = module.exports = function() {
    return Object.assign([], arguments).map((src, i) => function() {
        //不需要考虑闭包问题，因为这里使用的是回调函数，i的值不会发生变化。
        const opt = new Optimizer(src, this, ...arguments);
        if (i++) return opt;
        let res = opt;
        while ((res = res.execute()) && res instanceof Optimizer);
        return res;
    });
};

const Optimizer = tailOptimizer.Optimizer = function(method, ctx) {
    this.method = method;
    this.context = ctx;
    this.args = [].slice.call(arguments, 2);
};

Optimizer.prototype = {
    constructor: Optimizer,
    execute: function() {
        const args = this.args.length ?
            this.args : Object.assign([], arguments);
        return this.method.call(
            this.context, ...args
        );
    }
};