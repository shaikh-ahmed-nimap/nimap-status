const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');

const UpperCaseFirst = (str='') => `${str[0].toUpperCase()}${str.substring(1)}`; 

class Image extends Model {

};

Image.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
}, {sequelize, modelName: 'image'});

class Video extends Model {

};

Video.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
}, {sequelize, modelName: 'video'});

class Comment extends Model{
    getCommentable (options) {
        if (!this.commentableType) return Promise.resolve(null);
        const mixinMethodName = `get${UpperCaseFirst(this.commentableType)}`;
        return this[mixinMethodName](options)
    }
};

Comment.init({
    title: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
}, {sequelize, modelName: 'comment'})

Image.hasMany(Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'image'
    }
})

Comment.belongsTo(Image, {foreignKey: 'commentableId', constraints: false});

Video.hasMany(Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'video'
    }
});

Comment.belongsTo(Video, {foreignKey: 'commentableId', constraints: false});

Comment.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.commentableType === "image" && instance.image !== undefined) {
        instance.commentable = instance.image;
      } else if (instance.commentableType === "video" && instance.video !== undefined) {
        instance.commentable = instance.video;
      }
      // To prevent mistakes:
      delete instance.image;
      delete instance.dataValues.image;
      delete instance.video;
      delete instance.dataValues.video;
    }
  });

let data;

sequelize.sync({force: true})
    .then(() => {
        return Image.create({title: "nature", url: "http://splash.nature.com"})
    })
    .then((image) => {
        data = image;
        return Comment.bulkCreate([
            {title: "awesome"},
            {title: "amazing"},
            {title: "aaah"},
        ]);
    })
    .then((comments) => {
        return data.addComments(comments)
    })
    .then(() => {
        return Video.create({title: 'eFootball', text: "Some large number of text"})
    })
    .then(video => {
        data = video;
        return Comment.bulkCreate([
            {title: "msg to efootball"},
            {title: "msg2 to efootball"},
            {title: "msg3 to efootball"},
        ])
    })
    .then((comments) => {
        return data.addComments(comments)
    })
    .then((result) => {
        return Comment.findAll({include: [Image, Video]});
    })
    // .then(comments => {
    //     return comments.forEach(comment => comment.getCommentable());
    // })
    .then(result => {
        result.forEach(r => console.log(r.commentable.toJSON()));
    })
    // .then(result => {
    //     console.log(result.toJSON())
    // })
    .catch((err) => {
        console.log(err)
    })
