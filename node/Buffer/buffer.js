//

// let buf = Buffer.alloc(3) //声明3个字节
// console.log(buf)

// let bufstr = Buffer.from([100,3,4]); //可以放数组
// console.log(bufstr)
// let bufs = Buffer.from('珠峰');
// console.log(bufs, bufs.length); //长度

// let buf = Buffer.alloc(122)
// console.log(buf)





Buffer.prototype.concat = function(list, length = list.reduce((prev, next) => 
prev + next.length, 0)) {
    let buffer = Buffer.alloc(length);
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
        buffer.copy(buffer, offset, 0, list[i].length);
        offset += list[i].length;
    }
    return buffer.slice(0, offset);
}

console.log(Buffer.concat([Buffer.from('珠峰'), Buffer.from('培训')], 6).toString());