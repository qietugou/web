let http = require('http')
let fs = require('fs')
let fileObj = fs.statSync('./1.txt', ()=>{})
http.createServer(function(req, res) {
    console.log(req.headers)
    let range = req.headers.range;
    if (range) {
        console.log(range)
        let [,start, end] = range.match(/bytes=(\d*)-(\d*)/);
        start = start ? Number(start) : 0;
        end = end ? Number(end) : fileObj.size;
        res.statusCode = 206;
        res.setHeader('Content-Range',`bytes ${start}-${end}/${fileObj.size}`)
        res.setHeader('Accept-Ranges', 'bytes'); 
        fs.createReadStream('./1.txt', {start, end}).pipe(res);
    } else {
        fs.createReadStream('./1.txt').pipe(res);
    }
}).listen('3000', '127.0.0.1', function(){
    console.log('127.0.0.1:3000');
});

