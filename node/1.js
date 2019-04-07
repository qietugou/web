console.log(this) // {} 文件中的this 是指向module.exports

//console.log(global) //global 全局变量


console.log(process.argv)


function sum(a, b) {
    let r = a + b;
    c(r); 
} 

function c(r){
    console.log(r)
}
sum(1, 2);