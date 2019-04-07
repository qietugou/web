let http = require('http')
let fs = require('fs')
let start = 0;
let ws = fs.createWriteStream('./test.text')
function dowload() {
    http.get({
        host: '127.0.0.1',
        port:3000,
        headers: {
            'Range':`bytes=${start}-${start + 4}`
        }
    }, function(res) {
        let total = res.headers['content-range'].split('/')[1];
            res.on('data', function(data){
                ws.write(data)
                if (start < total + 5) {
                    start += 5;
                    dowload();
                }
            })

    });
}
dowload()