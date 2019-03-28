function Promise(executor) {

    let self = this;
    self.value = undefined; //成功的值
    self.reason = undefined; //失败的值
    //保存当前promise 状态值
    self.stauts = 'pending';

    function resolve(value) {
        console.log(value);
        if (self.stauts === 'pending') {
            self.value = value;
            self.stauts = 'resolved';
        }
    }

    function reject(reason) {
        if (self.stauts === 'pending') {
            self.reason = reason;
            self.stauts = 'rejected';
        }
    }
    executor(resolve, reject);
}
Promise.prototype.then = function(onFufilled, OnRejected){
    let self = this;
    if (self.stauts === 'resolved') {
        onFufilled(self.value);
    }
    if (self.stauts === 'rejected') {
        OnRejected(self.reason);
    }
};
module.exports = Promise;