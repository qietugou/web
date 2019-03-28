let fs = require('fs');

// 异步回调嵌套问题  会导致代码难以维护
fs.readFile('./1.html', 'utf8', function () {
    fs.readFile('./1.html', 'utf8', function () {

    });
});