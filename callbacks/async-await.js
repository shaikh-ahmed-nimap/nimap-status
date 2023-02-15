function promiseEx () {
    return new Promise((resolve, reject) => {
        let error = false
        setTimeout(() => {
            if (!error) {
                console.log('getting data from database')
                resolve({id: 2, username: 'user'})
                return;
            }
            reject(new Error('Something went wrong during data fetching'))
        }, 2000);
    })
}
promiseEx().then((str) => console.log(str)).catch(err => console.log(err))

// // converting promise to async await
