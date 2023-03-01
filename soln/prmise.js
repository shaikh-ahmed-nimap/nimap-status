// console.log(1);

// const prmse = new Promise((resolve, reject) => {
//     console.log('mide')
// })
// console.log(2);

// const promsie1 = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve(2);
// });

// promsie1.then(res => console.log(res));

// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve(2);
//     console.log(3);
// })



// promise.then((res) => console.log(res));

// function promise () {
//     return new Promise((resolve, reject) => {
//         console.log(1);
//         resolve(2);
//         console.log(3);
//     })
// }

// promise().then((res) => console.log(res));

// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve();
// });

// promise.then(res => {console.log(2)});

// const fn = () => (new Promise((resolve, reject) => {
//     console.log(1);
//     resolve('success');
// }));

// console.log('middle');

// fn().then(res => {
//     console.log(res);
// })

// start
// middle
// 1
// end
// success

// Promise.resolve(1).then(res => {console.log(res)});

// Promise.resolve(2).then(res => {console.log(res)});

// setTimeout(() => {
//     console.log('set timeout');
// });

// Promise.resolve(1).then((res) => {
//     console.log(res);
// })

// // start
// // end
// // 1
// // set timeout
// console.log('start');



// console.log('end');

// 4
// 1
// 2
// start timeout
// end timeout
// success


// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log('start timeout');
//         resolve('success');
//         console.log('end timeout');
//     }, 2000);
//     console.log(2);
// });

// promise.then(res => {
//     console.log(res)
// });

// console.log(4);

// 1
// 2
// 4
// success
// start timeout
// end timeout

// timer1
// promise
// timer2
// promise2

// const timer1 = setTimeout(() => {
//     console.log('timer1');
//     const promise1 = Promise.resolve().then((res) => {console.log('promise')}) 
// }, 0);

// Promise.resolve().then(() => console.log('promise2'));

// const timer2 = setTimeout(() => {
//     console.log('timer2');
// }, 0)

// console.log('start');

// const promise1 = Promise.resolve().then(() => {
//   console.log('promise1');
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)
// });

// const timer1 = setTimeout(() => {
//   console.log('timer1')
//   const promise2 = Promise.resolve().then(() => {
//     console.log('promise2')
//   })
// }, 0)

// console.log('end');

// start
// end
// promise1
// timer1
// promise2
// timer2

// function fn () {
//     return new Promise((resolve, reject) => {
//         resolve(2);
//     })
// };

// console.log(fn())


// function addWith2 (fn) {
//     let number = 2;
//     fn(number);
// };

// addWith2((number) => {
//     console.log(number + 2);
// });

// function addWith2Pr () {
//     return new Promise((resolve, reject) => {
//         let number  = 2
//         resolve(number);
//     })
// };

// addWith2Pr().then(res => console.log(res + 2))

function doSomethingCb (fn) {
    let error  = true
    if (error) {
        fn(new Error('error occured callback'))
    } else {
        fn(null, 2);
    }
};

// doSomethingCb((err, number) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(number + 2);
//     }
// });

function doSomethingPr () {
    let error = false;
    return new Promise((resolve, reject) => {
        if (error) {
            reject(new Error('error happend'));
        } else {
            resolve(2);
        }
    })
};

// doSomethingPr().then(res => {
//     console.log(res + 2);
// }).catch(e => {console.log(e.message)});

async function result () {
    try {
        const number = await doSomethingPr();
        console.log(number + 2);
    } catch (e) {
        console.log(e.message)
    }
};

// result();


let arr = [1, 2, 3, 4, 5, 6, 7];
// [4, 3, 5, 2, 6, 1, 7]

// function find(arr) {
//     let wMid = Math.floor(arr.length / 2)
//     let mid = arr.length % 2 === 0 ? arr[wMid - 1] : arr[wMid]
//     let result = Array(arr.length);
//     result.push(mid);
//     let lastEvenIndex = 0;
//     let lastOddIndex = 1;
//     for (let i = arr.indexOf(mid); i >= 0; i--) {
//         result[lastOddIndex] = arr[i];
//         lastOddIndex += 2;
//     }
//     for (let i = arr.indexOf(mid); i <= arr.length - 1; i++) {
//         result[lastEvenIndex] = arr[i];
//         lastEvenIndex += 2;
//     }
//     console.log(result)
// }

// find(arr);
