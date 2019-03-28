

function after(times, callback) {
    return function () {
        if (--times === 0) {
            callback()
        }
    }
}

let fn = after(3, function () {
    console.log('被调用了');
});
fn();
fn();
fn();

let fs = require('fs')
fs.readFile('./1.html', 'utf8', function (err, data) {
    console.log(data);
});