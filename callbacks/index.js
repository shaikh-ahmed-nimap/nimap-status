const { readFile, writeFile } = require('node:fs');

// CODE WITH MOSH EXERCISE
// callback hell
getUser(1, getUserCB);

// Named Functions
function displayCommits (commits) {
    console.log(commits)
}

function getReposCb (repo) {
    getCommits(repo, displayCommits)
}

function getUserCB (user) {
    getRepos(getReposCb)
    console.log(user)
}

function getUser(id, callback) {
    setTimeout(() => {
        callback({username: 'user', id})
    }, 2000)
}

function getRepos (callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3'])
    }, 1000)
    
}

// function errorCall (num, cb) {
//     if (num < 10) {
//         cb(null, num)
//     } else {
//         cb(new Error('Number is greater than 10'))
//     }
// }

// errorCall(11, function (err, num) {
//     if (err) throw err
//     else console.log(num);
// })


function callbackEx (a) {
    add(a, 20)
}

function add(a,b) {
    console.log(a + b)
}

callbackEx(10)

// TASK
readFile(__dirname + '/test.txt', 'utf-8', (err, result) => {
    if (err) console.log(err.message);
    else{
        writeFile(__dirname + '/result.txt', result, (error, result) => {
            if (error) {
                console.log(error.message)
                return
            }
            readFile(__dirname + '/result.txt', 'utf-8', (error, result) => {
                if (error) {
                    console.log(error.message)
                    return;
                }
                console.log(result)
            })
        })
    }
})