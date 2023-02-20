

const sequelize = require('./db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

const Profile = sequelize.define('Profile', {
    profile_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bio: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [10, 100],
                msg: 'Bio must be between 10 to 100 words'
            }
        }
    }
}, {
    timestamps: false
});

const Post = sequelize.define('Post', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: false,
});

const Tag = sequelize.define('Tag', {
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tag_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const PostHasTags = sequelize.define('PostHasTags', {
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'post_id'
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'tag_id'
        }
    }
})

User.hasOne(Profile, {onDelete: 'CASCADE'});
Profile.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Post);
Post.belongsTo(User, {foreignKey: 'user_id'});

Post.belongsToMany(Tag, {through: PostHasTags});
Tag.belongsToMany(Post, {through: PostHasTags});



    // .then(() => {
    //     return User.bulkCreate([
    //         {
    //             username: 'user1',
    //         },
    //         {
    //             username: 'user2',
    //         },
    //         {
    //             username: 'user3',
    //         },
    //         {
    //             username: 'user4',
    //         },
    //         {
    //             username: 'user5',
    //         },
    //         {
    //             username: 'user6',
    //         },
    //         {
    //             username: 'user7',
    //         },
    //         {
    //             username: 'user8',
    //         },
        
    //     ])
    // })
    // .then(() => {
    //     return Profile.bulkCreate([
    //         {bio: 'user1 bio'},
    //         {bio: 'user2 bio'},
    //         {bio: 'user3 bio'},
    //         {bio: 'user4 bio'},
    //         {bio: 'user5 bio'},
    //         {bio: 'user6 bio'},
    //         {bio: 'user7 bio'},
    //         {bio: 'user8 bio'},
    //     ])
    // })

let user;
let profiles;
let post;
// sequelize.sync({force:true})
//     .then(() => {
//         return User.findOne({where: {user_id: 1}});
//     })
    // .then((data) => {
    //     user = data;
    //     return Profile.findOne({where: {profile_id: 1}});
    // })
    // .then((profile) => {
    //     user.setProfile(profile);
    // })
    // .then((data) => {
    //     user = data
    //     return Post.create({
    //         title: 'user1 post',
    //         body: "This is post is posted by user1"
    //     })
    // })
    // .then((post) => {
    //     post.setUser(user);
    // } )
    // .then(() => {
    //     return Tag.bulkCreate([
    //         {tag_name: 'tag1'},
    //         {tag_name: 'tag2'},
    //         {tag_name: 'tag3'},
    //     ])
    // })
    // .then(() => {
    //     return Post.findOne({where: {post_id: 2}})
    // })
    // .then((data) => {
    //     post = data;
    //     return Tag.findAll({where: {tag_id: {[Op.in]: [1, 2]}}})
    // })
    // .then((tags) => {
    //     return tags.map(tag => tag.toJSON())
    // })
    // .then(tags => {
    //     post.setTags(tags.map(tag => tag.tag_id))
    // })
    // .then((result) => {
    //     result.forEach(tag => {
    //         console.log(tag.toJSON())
    //     })
    // })
    // .then(() => {
    //     return Profile.findOne({where: {profile_id: 1}, include: User})
    // })
    // .then(() => {
    //     // return Post.findOne({where: {post_id: 2}, include: Tag})
    //     return User.findOne({where: {user_id: 1}})
    // })
    // .then(user => {
    //     return user.getPosts()
    // })
    // .then(result => {
    //    console.log(result.map(data => data.toJSON()))

    // })
    // .catch(err => {
    //     console.log('something went wrong', err);
    // })