let _path = require('path')
let _fs = require('fs')
let _vm = require('vm')
function Module(filename) {
    this.id = filename;
    this.exports = {

    }
}
Module._extensions = {
    '.js' (module) {
       let content =  _fs.readFileSync(module.id, 'utf8');
       let moduleWarp = [
           '(function(exports, module, require, __filename,__dirname){',
           '})'
        ];
        let script = moduleWarp[0] + content + moduleWarp[1];
        // console.log(script)
        _vm.runInThisContext(script).call(module.exports, module.exports, module, re)
    },
    '.json' () {

    }
}
Module._resolveFilename = function(filename) {
    let r = _path.resolve(__dirname, filename)
    if (!_path.extname(r)) {
    
        let ps = Object.keys(Module._extensions);
        for (let i = 0; i < ps.length; i++) {
            let p = `${r}${ps[i]}`;
            try {
                _fs.accessSync(p); //如果能访问路径
                return p;
            } catch(e) {
                console.log(p + '不存在')
            }
        }
    }
    throw new Error('文件不存在')
}
Module._load = function(filename) { 
   let path = Module._resolveFilename(filename)
   //创建模块
   let module = new Module(path);
   //记载模块
   let ext = _path.extname(module.id);
   Module._extensions[ext](module);
   return module.exports;
}

function re(id) {
   return Module._load(id)
}
let r = re('./3-user');
console.log(r.name)