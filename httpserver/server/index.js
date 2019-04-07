let http = require('http')
let url = require('url')
let path = require('path')
let ejs = require('ejs')
let mime = require('mime')
let fs = require('mz/fs')
let chalk = require('chalk')
let debug = require('debug')('dev')
let zlib = require('zlib')
let  {readFileSync} = require('fs')
let templ = readFileSync(path.join(__dirname, 'template.html'), 'utf8');
class Server {
    constructor(config) {
        this.config = config
        this.templ = templ;
    }
    async handleRequest(req, res){
        let {dir} = this.config;
        let {pathname} = url.parse(req.url)
        console.log(pathname)
        let realPath = decodeURIComponent(path.join(dir, pathname))
        try {
            let statObj = await fs.stat(realPath)
            if (statObj.isDirectory()) { //是目录
                let html = path.join(realPath, 'index.html')
                try {
                    await fs.access(html);
                    this.sendFile(req, res, null, html)
                } catch {
                    let dirs = await fs.readdir(realPath)
                    dirs = dirs.map(item=>({
                        name: item,
                        path: path.join(pathname, item)
                    }));
                    let renderStr = ejs.render(this.templ, {data:{
                        dirs:dirs
                    }})
                    res.setHeader('Content-Type', 'text/html;charset=utf8')
                    res.end(renderStr)
                }
            } else {
                this.sendFile(req, res, statObj, realPath)
            }
        } catch(e) {
            this.sendError(req, res, e)
        }  
    
    }
    sendFile(req, res, statObj, realPath){
        res.setHeader('Content-Type', mime.getType(realPath)+';charset=utf8')
        // 缓存 304 
        // 压缩
        let gzip;
        if (gzip = this.gzip(req, res)) {
            console.log(gzip)
            fs.createReadStream(realPath).pipe(gzip).pipe(res)
            return;
        }
        // 206 范围请求
        fs.createReadStream(realPath).pipe(res)
    }
    gzip(req, res) {
        let gzip = req.headers['accept-encoding']
        if (gzip) { //返回一个压缩流
            if (gzip.match(/\bgzip\b/)) { //gzip
                res.setHeader('content-encoding', 'gzip')
                return zlib.createGzip();
            } else if (gzip.match(/\bdeflate\b/)) {
                res.setHeader('content-encoding', 'bdeflate')
                return zlib.createDeflate();
            }
        }
        return false;
    }
    sendError(req, res, e) {
        console.log(e)
        debug(chalk.red(JSON.stringify(e)))
        res.end('Not Fount')
    }
    start() {
        let server = http.createServer(this.handleRequest.bind(this))
        let {port, host} = this.config;
        server.listen(port, host, () => {
            debug(`http://${host}:${chalk.red(port)},listen`)
        })
    }
}

module.exports = Server;