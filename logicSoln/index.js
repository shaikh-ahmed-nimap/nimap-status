function findSecondLargest (arr) {
    let heighest = -Infinity;
    let second = -Infinity;
    for (let i of arr) {
        if (i > heighest) {
            second = heighest;
            heighest = i
        } else if (i > second && i < heighest) { //Time Complexity will be O(n)
            second = i;
        }
    }
    return second;
}

// console.log(findSecondLargest([20, 39, 34, 3993, 390]));

function reverseInt (number) {
    let reverse = 0;
    while (number > 0) {
        reverse = (reverse * 10) + (number % 10);
        number = Math.floor(number / 10)
    }
    return reverse;
}

// console.log(reverseInt(1234));

function swapNumber(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a, b]
}

// console.log(swapNumber(12, 13));

function anagram (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    const sCount = {};
    const tCount = {};
    for (let i = 0; i < s.length; i++) {
        if (Object.keys(sCount).includes(s[i])) {
            sCount[s[i]]  = sCount[s[i]] + 1;
        } else {
            sCount[s[i]] = 1;
        }
    }
    for (let i = 0; i < t.length; i++) {
        if (Object.keys(tCount).includes(t[i])) {
            tCount[t[i]]  = tCount[t[i]] + 1;
        } else {
            tCount[t[i]] = 1;
        }
    }
    for (let key in tCount) {
        if (tCount[key] !== sCount[key]) {
            return false;
        } else {
            continue;
        }
    }
    return true;
}

// console.log(anagram('username', 'uamenser'))

function reverse (string) {
    let result = '';
    for (let i = string.length - 1; i >= 0; i--) {
        result += string[i];
    }
    return result;
}

// console.log(reverse('username'));

function palindrome (s) {
    let temp = '';
    for (let i = s.length - 1; i >= 0; i--) {
        temp += s[i]
    }
    if (temp === s) {
        return true
    }
    return false;
}

function fiboWithRecursion (n) {
    if (n <= 1) {
        return n
    }
    return fiboWithRecursion(n - 1) + fiboWithRecursion(n - 2)
}

function generateFibo (n) {
    const arr = []
    for (let i = 0; i < n + 1; i++) {
        let result = fiboWithRecursion(i)
        arr.push(result)
    }
    return arr;
}

// console.log(generateFibo(5))

function fiboWithoutRecursion (n) {
    const arr = []
    let a = 0;
    let b = 1;
    let temp;
    arr.push(a, b)
    for (let i = 2; i <= n; i++ ) {
        temp = a + b;
        a = b;
        b = temp;
        arr.push(temp)
    }
    return arr;
}
// console.log(fiboWithoutRecursion(5))

// console.log(palindrome('madame'))
// console.log(25 ** (1/2))
// console.log(Math.sqrt(25))

function primeValues(n) {
    let arr = [2];
    for (let i = 2; i < n + 1; i++) {
        for(let j = 2; j < i; j++) {
            if (i % j === 0) {
                break;
            } else if (j === i - 1) {
                arr.push(i);
            } else {
                continue;
            }
        }
    }
    return arr;
}

// console.log(primeValues(100))

function sqrt(num) {
    return (num ** (1/2))
}

// console.log(sqrt(225))

function missingValueInArrya(arr = []) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] + 1 !== arr[i + 1]) {
            console.log(arr[i] + 1);
        }
    }
}

// function missingArray(arr, N) {
//     let i;
//     let temp = [];

//     for (i =0; i <= N; i++) {
//         temp[i] = 0;
//     }
//     console.log(temp);
//     for (i = 0; i < N; i++) {
//         temp[arr[i] - 1] = 1
//     }
//     let ans = 0
//     for (let i = 0; i < temp.length; i++) {
//         if (temp[i] === 0) {
//             ans = i + 1
//         }
//     }
//     console.log(ans)
// }

// missingValueInArrya([1, 2, 3, 5, 6, 8, 10])

function findPair (arr, sum) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === sum) {
                result.push([arr[i], arr[j]])
            }
            else continue;
        }
    }
    return result;
}

// console.log(findPair([80, 60, 10, 50, 30, 100, 0, 50], 100));

// Find Even number
function findEvenNumber (arr) {
    const result = []
    for (let num of arr) {
        if (num % 2 === 0) {
            result.push(num)
        }
    }
    return  result;
}

// console.log(findEvenNumber([20, 30, 10, 35, 45, 60]))

function findDuplicate (arr) {
    const obj = {};
    const result = [];
    for (let num of arr) {
        if (obj[num]) {
            obj[num] += 1
        } else {
            obj[num] = 1;
        }
    }
    for (let key in obj) {
        if (obj[key] > 1) {
            result.push(Number(key))
        }
    }
    return result;
};

// console.log(findDuplicate([1, 1, 2, 5, 60, 5, 33]))

function findDuplicateSec (arr) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j] && result.indexOf(arr[i] === -1)) {
                result.push(arr[i])
            }
        }
    }
    return result;
}

// console.log(findDuplicateSec([1, 1, 2, 5, 60, 5, 33]))


function stringSol (s) {
    let num = [];
    let str = [];
    for (let i = 0; i < s.length; i++) {
        let number = '';
        if (isNaN(s[i])) {
            str.push(s[i])
        } else {
            if (!isNaN(s[i])) {
                number += s[i]
            }
            num.push(number)
        }
    }
    console.log(num, str)
}

// stringSol('a2b4c10d8');

const findMedian = (num1, num2) => {
    let mArr = [...num1, ...num2];
    mArr = mArr.sort((a, b) => a - b);
    let median = 0;
    if (mArr.length % 2 === 0) {
        // console.log(mArr[mArr.length /2 - 1])
        // console.log(mArr[1])
        median = (mArr[(mArr.length / 2)] + mArr[mArr.length / 2 - 1])  / 2
        // console.log(median)
    } else {
        median = mArr[Math.floor(mArr.length / 2)]
    }
    return median;
}

// console.log(findMedian([1, 3], [2]));
function add (a, b, sum) {
    sum(a, b)
}

add(2, 3, function (a, b) {
    console.log(a + b)
})