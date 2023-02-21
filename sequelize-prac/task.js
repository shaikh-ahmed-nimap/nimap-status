const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const TUser = sequelize.define('tUser', { name: DataTypes.STRING }, { timestamps: false });
const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false });
const Tool = sequelize.define('tool', {
  name: DataTypes.STRING,
  size: DataTypes.STRING
}, { timestamps: false });

TUser.hasMany(Task);
Task.belongsTo(TUser);
TUser.hasMany(Tool, {as: 'Instruments'});

let user;

sequelize.sync()
    .then(() => {
        // return TUser.create({
        //     name: "John Doe"
        // })
        // return Task.findAll({include: TUser});
        return TUser.findAll({include: [
            {
                model: Task
            }
        ], order: [[Task, 'id', 'ASC']]})
    })
    // .then((data) => {
    //     user = data;
    //     return data.getTools();
    // })
    // .then(task => {
    //     return user.removeTask(task);
    // })
    .then(result => {
        console.log(result.map(user => console.log(user.toJSON())))
    })
    .catch(err => console.log(err))

