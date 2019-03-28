function Promise(executor) {

    let self = this;
    self.value = undefined; //成功的值
    self.reason = undefined; //失败的值
    //保存当前promise 状态值
    self.stauts = 'pending';
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {

        if (self.stauts === 'pending') {
            self.value = value;
            self.stauts = 'resolved';
            self.onResolvedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }

    function reject(reason) {
        if (self.stauts === 'pending') {
            self.reason = reason;
            self.stauts = 'rejected';
            self.onRejectedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }
    //如果执行失败直接走失败
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
function resolvePromise(x, promise, resolve, reject) {
    if (x  === promise) { //自己不能等待自己完成
        return reject(new TypeError('循环引用'));
    }
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let x_then = x.then; //取出原型链方法
            if (typeof x_then === 'function') { //是 promise
                x_then.call(x, function (y) { //利用call 调用自己
                    resolve(y)
                }, function (r) {
                    resolve(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            reject('当前调用失败' + e);
        }
    } else { //普通值得情况直接返回
        resolve(x);
    }
}

Promise.prototype.then = function(onFufilled, OnRejected){
    let self = this;
    //调用then 返回一个Promise实例
    let promise = new Promise(function (resolve, reject) {
        if (self.stauts === 'resolved') {
            let x = onFufilled(self.value);
            resolvePromise(x, promise, resolve, reject);
        }
        if (self.stauts === 'rejected') {
            let x = OnRejected(self.reason);
            resolvePromise(x, promise, resolve, reject);
        }

        //存储对应的 异步
        if (self.stauts === 'pending') {
            self.onResolvedCallbacks.push(function () {
                let x = onFufilled(self.value);
                resolvePromise(x, promise, resolve, reject);
            });
            self.onRejectedCallbacks.push(function () {
                let x = OnRejected(self.reason);
                resolvePromise(x, promise, resolve, reject);
            });
        }
    });
    promise.name = 'promise2';
    return promise;
};
module.exports = Promise;