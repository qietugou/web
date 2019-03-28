
//解决回调地狱

let p = new Promise(function (resolve, reject) {
    resolve(1);
});
p.then(function (value) {
    console.log(value);
}, function (reason) {
    console.log(reason);
});

let fs = require('fs');
function read(url, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, encoding, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
};
//会一直then 下去
read('./1-callback.js', 'utf8').then(function (data) {
    // console.log(data);
}, function (err) {
    console.log(err);
}).then(function (data) {
    console.log('成功' + data);
    return Promise.reject('err')
}, function (err) {

}).then(function (data) {
    console.log(data);
},function (err) {
    console.log('我是' + err);
    throw new Error('msgerr');
}).then(function () {

}, function (err) {
    console.log(err);
});

Promise.all([1,2,4,5]).then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
})