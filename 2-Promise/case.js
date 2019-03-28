
let Promise = require('./2-promose');

let p = new Promise(function (resolve, reject) {
    //throw new Error('MSG');
    setTimeout(function () {
        resolve('成功')
    }, 1000)
});
// let pro = p.then(function (value) {
//     return pro;
// }, function (err) {
//     console.log('err' + err)
// });
// pro.then(function (val) {
//     console.log('val' + val)
// }, function (err) {
//     console.log('err2' + err)
// });
let pro = p.then(function (value) {
    return new Promise(function (resolve, reject) {
        resolve('成功')
    });
}, function (err) {
    console.log('err' + err)
}).then(function (val) {
    console.log('val111' + val)
}, function (err) {
    console.log('err2' + err)
});