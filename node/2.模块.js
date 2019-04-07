

// 模块化 解决协同开发
// 避免全局变量 防止重名

// let b = 100;

// function a() {
//     console.log(b)
// }
// a()


//pahtr
let path = require('path')

console.log(path.resolve(__dirname, '../')) ///Users/zhuhongwen/vue/珠峰架构
console.log(path.join(__dirname, '../')) ///Users/zhuhongwen/vue/珠峰架构/

console.log(path.extname('1.php')) // .php
console.log(path.basename('1.php', '.php')) // 1