let EventEmitter = require('events')
let fs = require('fs')
class ReadStream extends EventEmitter{
    constructor(path, options = {}){
        super()
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end || null;
        this.highWaterMark = options.highWaterMark || 64 * 1024;

        //默认非流动模式  监听 on data 就是流动模式
        this.flowing = null;
        //读取到文件的位置
        this.pos = this.start; 

        this.on('newListener',(type)=> {
            
            switch(type) {
                case 'data':
                    this.flowing = true;
                    this.open();
                    this.read();
                break;
                default:

            }
        });
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err)
            }
            this.fd = fd;
            this.emit('open', fd)
        })
    }
    read() {
        if (typeof this.fd !== 'number') {
            this.once('open', ()=> this.read())
            return;
        }
        let buffer = Buffer.alloc(this.highWaterMark);
        let howMuchtoTed = this.end
            ? Math.min((this.end - this.pos + 1), this.highWaterMark) 
            : this.highWaterMark;
 
        fs.read(this.fd, buffer, 0, howMuchtoTed, this.pos, (err, bytesRead) => {
            this.pos += bytesRead;
            if (bytesRead > 0 && this.flowing) {
                this.emit('data', buffer.slice(0, howMuchtoTed))
                this.read();
            } else {
                this.flowing = null;
                this.emit('end', '关闭了')
                return this.close();
            }
        })
    }
    close(){
        fs.close(this.fd, ()=>{})
        this.emit('close', 'close')
    }
}


module.exports = ReadStream