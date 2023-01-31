// getUsers(1, (user) => {
//     console.log(user)
//     getRepos(repos => {
//         console.log(repos)
//     })
// })

// function getUsers(id, cb) {
//     setTimeout(() => {
//         console.log('running getUsers timeout')
//         cb({id, username: 'username'})
//     }, 2000)
// }

// function getRepos(cb) {
//     setTimeout(() => {
//         console.log('running getRepos timeout')
//         cb(['repo1', 'repo2'])
//     }, 2000)
// }

// converting callback to promise

// function getUser (id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('running getUsers Promise')
//             resolve({id, username: 'username'})
//         }, 2000)
//     })
// }

// function getRepos() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('running getRepos promise')
//             resolve(['repo1', 'repo2'])
//         }, 2000)
//     })
// }

// getUser(1).then(data => {
//     console.log(data)
//     return getRepos();
// })
// .then(repos => console.log(repos))
// .catch(err => console.log(err))

function getUser (id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({id, username: 'username', isGold: false, email: 'user@mail.com'})
        }, 2000)
    });
}

function getTopMovies (user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user.isGold) {

                resolve({movies: ['movie1', 'movie2','movie3'], customer: user})
            } else {
                reject(new Error('user is not Gold'))
            }
        })
    })
}

function sendEmail (userEmail, movies, calback) {
    calback()
}

getUser(1).then((customer) => {
    console.log('customer', customer)
    return getTopMovies(customer)
}).then(({movies, customer}) => {
    console.log('movies', movies)
    sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
    })
}).catch(err => console.error(err.message))

// TASK
// function getUser () {
//     return new Promise((resolve, reject) => {
//         let error = true
//         setTimeout(() => {
//             if (!error) {
//                 console.log('getting data from database')
//                 resolve({id: 2, username: 'user'})
//                 return;
//             }
//             reject(new Error('Something went wrong during data fetching'))
//         }, 2000);
//     })
// }

// promise chaining
// getUser().then((str) => console.log(str)).catch(err => console.log(err))

// async await
// async function fetchUser() {
//     try {
//         const user = await getUser();
//         console.log(user)
//     } catch (err) {
//         throw err
//     }
// }

// fetchUser();