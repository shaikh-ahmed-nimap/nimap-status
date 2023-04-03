const obj = [{id: 1, name: 'shaikh'}, {id: 2, name: 'user'},{id:8,name:'hihih'}];

function convert (obj) {
    let result = {};
    for (let i = 0; i < obj.length; i++) {
        result[obj[i]['name']] = obj[i]['id']
    };
    return result;
}

// console.log(convert(obj))

function fn(arg) {
    // arg.name = 'js'
    if(arg.toString()=={name: 'js'}) {
        return 'its wokring'
    } else {
        return 'something wrong'
    }
}

// console.log(fn({name:'js'}));

// (function () {
//     var a = b = 3;
// })();
// console.log(b);
// console.log(a);
// console.log(a, b)

// function print2 () {
//     return new Promise((resolve) => {
//         setTimeout(() => {resolve(2)}, 1000)
//     })
// };

function print() {
    return new Promise((resolve) => {
        resolve(2)
    })  
}
async function result () {
    console.log(1);
    const r = await print();
    console.log(r)
    console.log(3)
};

// result();

function facto (n) {
    if (n === 1) {
        return n;
    };

    return facto(n - 1) * n;
};

// console.log(facto(5))

function reverse (str) {
    let result = '';
    for(let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    };
    return result;
};

// console.log(reverse('user'));

function findSec (arr) {
    let heighest = -Infinity;
    let second = -Infinity;
    for (let each of arr) {
        if (heighest < each) {
            second = heighest;
            heighest = each;
        } else if (each > second && each < heighest) {
            second = each;
        } else {
            continue;
        }
    };
    return second;
};

// console.log(findSec([20, 30, 41, 20, -40, 45]));



// function sum (arr, sign) {
//     let result = arr[0];
//     for (let i = 1; i < arr.length; i++) {
//         switch(sign) {
//             case '+':
//                 result += arr[i];
//                 continue;
//             case '-':
//                 result -= arr[i];
//                 continue;
//             case '*':
//                 result = result * arr[i];
//                 continue;
//             case '/':
//                 result = result / arr[i];
//                 continue;
//             case '%':
//                 result = result % arr[i];
//                 continue;
//         }
//     };
//     return result;
// }

// function calc (arr, sign) {
//     return eval(arr.join(sign));
// }

function calc(arr, sign) {
    return arr.reduce((curr, acc) => {
        return eval(acc + sign + curr)
    })
}

console.log(calc([1, 2, 3, 4], '*'));





