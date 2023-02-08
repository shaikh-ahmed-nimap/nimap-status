function validateUser (registerUser, users) {
    let errors = {}
    if (!registerUser.username) {
        errors.username = 'username is required'
    }
    errors = {...errors, ...validateCredentials(registerUser.email, registerUser.password)}
    const findUser = users.filter((user) => {
        if (user.email === registerUser.emai || user.username === registerUser.username) {
            return user
        }
    });
    if (findUser.length) {
        if (registerUser.email === findUser[0].email) {
            errors.email = 'user with this email already exists'
        }
        if (registerUser.username === findUser[0].username) {
            errors.username = 'user with this username already exists'
        }
    }
    return errors;
}

function validateCredentials (email, password) {
    const errors = {}
    if (!email) {
        errors.email = 'email is required'
    }
    if (!password) {
        errors.password = 'password is required'
    }
    return errors;
}

module.exports = {validateUser, validateCredentials}