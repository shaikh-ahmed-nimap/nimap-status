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

let a = 33
var b = 45;


