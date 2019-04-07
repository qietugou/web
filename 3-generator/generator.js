
// 迭代器
let likeArr = {1:2, 2:3, 3:4, length:3, [Symbol.iterator](){
    let flag = false;
    let index = 1;
    let that = this;
    return {
        next() {
            return {
                done: index - 1 === that.length,
                value: that[index++]
            }
        }
    }
}}
let arr = [...likeArr];
console.log(arr);

// 生成器
let likeArr1 = {1:2, 2:3, 3:4, length:3, [Symbol.iterator]:function*(){
    let index = 1;
    yield this[index++]
    yield this[index++]
}}
let arr1 = [...likeArr1];
console.log(arr1);


function* gen(){
    for (let i = 0; i < 99; i++) {
        yield i;
    }
}

let g = gen()
let r = {};
do {
    r = g.next()
   console.log(r)
} while(!r.done)
a