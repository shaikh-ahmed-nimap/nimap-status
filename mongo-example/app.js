// function reverse (num) {
//     let reverse = 0;
//     let rem = 0;
//     while(num > 0) {
//         rem = (num % 10);
//         reverse = (reverse * 10) + rem
//         num = Math.floor(num / 10)
//     }
//     return reverse;
// }

// console.log(reverse(1886))

// function second(arr) {
//     let highest = 0;
//     let second = 0;
//     for (let i of arr) {
//         if (i >  highest) {
//             second = highest;
//             highest = i
//         } else if (i > second && i < highest) {
//             second = i
//         }
//     }
//     return second;
// }

// console.log(second([1, 8, 9, 6,7, 9, 10]))

const obj = {a: 1, b: 2}
function anagram (str1, str2) {
    for (let i in obj) {
        console.log(i)
    }
}

// console.log(anagram('oodd', 'ddoo'));

// console.log([3, 10, 100, 13, 8].sort((a, b) => a - b))

// console.log(['a', 'b', 'c'].sort((a, b) => b, a)); 


const a = ['a', 'b', 'c', 'd']
for (let i of a.values()) {
    console.log(i)
}


