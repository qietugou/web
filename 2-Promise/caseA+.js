let Promise = require('./3-promiseA+');

let p = new Promise(function(reslove, reject){
    setTimeout(function () {
        reject('是啊比')
    }, 1000)
});
// p.then(function(val){
//     console.log(val)
// }, function(err){
//     console.log('err-' + err);
// }).then(function(val){
//     console.log('s' + val)
// }, function(err){
//     console.log('e' + err)
// });
p.then().then().then().then(function(val){
    console.log(val)
}, function(err) {
    console.log('---' + err)
})