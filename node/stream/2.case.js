// let fs = require('fs')

// let ws = fs.createWriteStream('1.txt', {
//     highWaterMark:1
// });

// let i = 0;


// function write()
// {
//     let flag = true;
//     while (i < 9 && flag) {
//         flag = ws.write(i++ + '');
//         console.log(flag)
//         console.log(i)
//     }
// }
// ws.on('drain', ()=>{

//     write();
// })