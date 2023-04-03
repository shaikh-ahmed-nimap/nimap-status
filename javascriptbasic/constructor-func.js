const circle = {
    radius: 10,
    diameter: 20,
}

// Factory function
// function createCircle (radius) {
//     return {
//         radius,
//     }
// } 

// function Circle (radius) {
//     this.radius = radius
// }

// const circle1 = new Circle(10)
// const circle2 = createCircle(20)
// const newCircle = {}
// Circle.call(newCircle, 5)
// console.log(newCircle)
// console.log(circle2.constructor)
// console.log(circle1.constructor)

// if ('radius' in circle) {
//     console.log(circle['radius'])
// }


// const addr = {
//     zipCode: 400009,
//     country: 'india',
//     street: 'baiganwadi'
// }
// function showAddress(addr) {
//     for (let key in addr) {
//         console.log(key, addr[key])
//     }
// }

// showAddress(addr)

function arrayFromRange(min, max) {
    let arr = []
    for (let i = min; i <= max; i++) {
        arr.push(i)
    }
    return arr;
}

const arr = arrayFromRange(-9, 4);

// console.log(arr)

function includes (arr, value) {
    for (let num of arr) {
        if (num === value) {
            return true
        }
    }
    return false
}

// console.log(includes(arr, 8))

function exclude(arr, arr2) {
    const newArr = []
    for (let num of arr) {
        if (!arr2.includes(num)) {
            newArr.push(num)
        }
    }
    return newArr;
}

// console.log(exclude(arr, [2, -7, 6]))

// function shiftArr(arr, index, offset) {
//     const position = index + offset;
//     if (position)
// }

// console.log([1, 2, 3, 4].splice(0, 1, 7, 5))

const video = {
    title: 'a',
    tags: ['a', 'b', 'c'],
    show() {
        this.tags.forEach( function (tag) {
            console.log(this.title, tag)
        }, this)
    }
}

// video.show();

// const sooor =  () => {
//     const a = 0;
//     let b = 50;
//     return function username () {
//         console.log(a);
//         console.log(b);
//         d = 5000
//     };
// }

// function sooor(a, b) {
//     return function () {
//         console.log(a , b);
//     }
//
// const username = sooor(2, 3);
// username();

// let user = 'username';
// user ||= "user2";
// console.log(user);

function fib(num) {
    if (num < 2) {
        return num
    }
    return fib(num - 1) + fib(num - 2)
}

function printFib(num) {
    for (let i = 0; i <= num; i++) {
        console.log(fib(i))
    }
};

printFib(1)

