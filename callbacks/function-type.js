// Named function 
function add(num1,  num2) {
    return num1 + num2
}

console.log(add(1, 2));

// anonymous function
const sum = function (num1, num2) {
    return num1 + num2
}

sum(2, 4)

// self invoked function
let result = (function (a,b) {
    return a + b
})(2, 3)

console.log(result)