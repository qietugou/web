

let fs = require('fs')
let path = require('path')
//同步
function removeSync(dir) {
    let stat = fs.statSync(dir); //查询文件状态
    if (stat.isDirectory()) { //判断是否是目录
        let dirs = fs.readdirSync(dir); //读取当前文件夹
        //拼接路径
        dirs = dirs.map(d => path.join(dir, d));
        console.log(dirs)
        dirs.forEach(d => {
            removeSync(d);
        });
        fs.rmdirSync(dir);
    } else {
        fs.unlinkSync(dir); //是文件 直接delete
    }
}
//removeSync('a')

function removeAsync(dir, callback) {
    console.log(dir)
    fs.stat(dir, function(err, stat) {
        if (stat.isDirectory()) {
            fs.readdir(dir, function(err, file) {
                let dirs =  file.map(d => path.join(dir, d));
                function next(index) {

                    if (index === dirs.length) {
                        return fs.rmdir(dir,  callback);
                    }
                    let currpath = dirs[index];
                    removeAsync(currpath, ()=>next(index + 1));
                }
                next(0);
            }); //读取当前文件夹
        } else {
            fs.unlink(dir, callback); //是文件 直接delete
        }
    });
}
// 异步删除
// removeAsync('a', function(){
//     console.log('成功')
// })

//Prmise版本
function removePromise(dir) {
    return new Promise(function(reslove, reject){
        fs.stat(dir, function(err, stat) {
            if (stat.isDirectory()) {
                fs.readdir(dir, function(err, file) {
                    let dirs =  file.map(d => removePromise(path.join(dir, d)));
                    Promise.all(dirs).then(data=>{
                        fs.rmdir(dir, reslove);
                    })
                }); //读取当前文件夹
            } else {
                fs.unlink(dir, reslove); //是文件 直接delete
            }
        });
    })
}
// removePromise('a')

let {promisify} = require('util'); 
let stat = promisify(fs.stat)
let readdir = promisify(fs.readdir)
let unlink = promisify(fs.unlink)
let rmdir = promisify(fs.rmdir)
async function removeAsyncAwait(dir) {
    let stat1 = await stat(dir);
    if (stat1.isDirectory) {
        let files = await readdir(dir);
        let dirs = files.map(d => removeAsyncAwait(path.join(dir, d)));
        await Promise.all(dirs);
        await rmdir(dir)
    } else {
        await unlink(dir)
    }
}
//await版本 深度优先
//removeAsyncAwait('a')


function wide(dir) {
  let arr = [dir]; //基于队列实现广度优先 
  let index = 0;
  let currpath = '';
  while (currpath = arr[index++]) {
      let statObj = fs.statSync(currpath);
      if (statObj.isDirectory()) {
          let dirs = fs.readdirSync(currpath); //读取当前文件夹
          dirs = dirs.map(d => path.join(currpath, d));
          arr = [...arr, ...dirs];
      }
  }
  arr.reverse().forEach(function(val) {
     let statObj = fs.statSync(val);
     if (statObj.isDirectory()) {
         fs.rmdirSync(val)
     } else {
         fs.unlinkSync(val)
     }
  })
  console.log(arr);
}

// wide('a');

//异步广度优先
function removeAsyncFirst(dir, arr) {
    fs.stat(dir, function(err, stat) {
        if (stat.isDirectory()) {
            fs.readdir(dir, function(err, file) {
                if (file.length == 0) { //遍历终止
                    arr.reverse().forEach(function(val) {
                        fs.stat(val, function(err, star) {
                            if (star.isDirectory()) {
                                fs.rmdir(val, ()=>{})
                            } else {
                                fs.unlink(val, ()=>{})
                            }
                        });
                     })
                }
                let dirs =  file.map(d =>{
                    let f = path.join(dir, d);
                    arr.push(f);
                    removeAsyncFirst(f, arr);
                });
            })
        }
    });
}

//removeAsyncFirst('a', ['a'])

async function removeFile(file) {
    let stat1 = await stat(file);
    if (stat1.isDirectory) {
        await rmdir(file)
    } else {
        await unlink(file)
    }
}
async function removeAsyncAwaitFirst(dir, arr) {
    let stat1 = await stat(dir);
    if (stat1.isDirectory) {
        let files = await readdir(dir);
        if (files.length === 0) {
            arr.reverse().forEach(function(val) {
                removeFile(val);
            });
        }
        let dirs = files.map(d => {
            let p = path.join(dir, d);
            arr.push(p);
            removeAsyncAwaitFirst(p, arr);
        });
    } 
}
// await async 广度实现
removeAsyncAwaitFirst('a', ['a'])