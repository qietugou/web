
let fs = require('fs')

let read = fs.createReadStream('1.text', {
    flags:'r',
    encoding: null,
    autoClose: true,
    start: 0,
    end: 1,
    highWaterMark:4
});

read.on('data', function(data) {
    console.log(data)
})
read.on('end', function() {
    console.log('读取完毕')
})