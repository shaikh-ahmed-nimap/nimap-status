const {sequelize, DataTypes} = require('./config');


const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Post = sequelize.define('post', {
    post_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

User.hasMany(Post, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Post.belongsTo(User, {foreignKey: 'user_id'});
let user, posts;
sequelize.sync({alter: true})
    // .then(() => {
    //     return User.findOne({where: {user_id: 1}})
    // })
    // .then((data) => {
    //     user = data;
    //     return Post.create({
    //         title: 'user 1 first post',
    //         body: 'this is users first post where user id is 1'
    //     })
    // })
    // .then((data) => {
    //     post = data;
    //     post.setUser(user);
    // })
    // .then(() => {
    //     return Post.findAll();
    // })
    // .then((data) => {
    //     posts = data;
    //     return User.findOne({where: {user_id: 1}});
    // })
    // .then((data) => {
    //     user = data
    //     return user.countPosts()
    // })
    // .then(data => {
    //     console.log(data)
    // })
    .then(() => {
        return Post.findAll();
    })
    .then(data => {
        posts = data;
        return User.findOne();
    })
    .then(data => {
        user = data;
        user.removePosts(posts)
    })
    .catch (err => {
        console.log('connection failed', err)
    })