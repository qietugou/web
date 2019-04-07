let ReadStream = require('./readstream')

let read = new ReadStream('1.text', {
    flags:'r',
    encoding: null,
    autoClose: true,
    start: 0,
    end: null,
    highWaterMark:6
});

read.on('open', function(data) {
    console.log('open' + data)
});
read.on('data', function(data) {
    console.log(data)
});
read.on('error', function(data) {
    console.log(data)
})
read.on('end', function(data) {
    console.log('end' + data)
})
read.on('close', function(data) {
    console.log('close' + data)
})