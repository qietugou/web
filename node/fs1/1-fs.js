//文件操作系统
let fs = require('fs');

function copy(source, target, callback) {
    const BUFFER_SIZE = 2;
    fs.open(source, 'r', function(err, data) {
        let buffer = Buffer.alloc(BUFFER_SIZE);
        function next() {
            fs.open(target, 'a+', function(err, wfd){
                fs.read(data, buffer, 0, BUFFER_SIZE, null, function(err, bytesRead) {
                    if (bytesRead > 0) {
                        fs.write(wfd, buffer, 0, bytesRead, null, function(err, writen){
                            console.log(22222)
                            next();
                        });
                    } else {
                        fs.close(data, ()=>{})
                        fs.close(wfd, ()=>{});
                        callback('拷贝完成');
                    }
                });
            });
        }
        next()
    });
}

copy('./1.text', './2.text', function(data) {
    console.log(data)
})