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
}).catch(function(val) {
    console.log('---catch' + val)
    return Promise.reject('失败');
}).finnaly(function(e){
    console.log('---finnaly' + e)
}).then(function(v){
    console.log('---finnaly-then' + v)
}, function(ee){
    console.log('---finnaly-then-err' + ee)
})

Promise.all([1,3,4]).then(function(arr){
    console.log('all' + arr)
}, function(err) {
    console.log('err' + err)
})

Promise.race([1,3,4]).then(function(arr){
    console.log('all' + arr)
}, function(err) {
    console.log('err' + err)
})