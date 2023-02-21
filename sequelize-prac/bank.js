const {DataTypes} = require('sequelize');
const sequelize = require('./db');

// const Bank = sequelize.define('bank', {
//     bank_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// const Branch = sequelize.define('branch', {
//     branch_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     branch_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

// Bank.hasMany(Branch, {onDelete: 'CASCADE'});
// Branch.belongsTo(Bank, {
//     foreignKey: 'id_of_branch'
// });


// let bank;
// sequelize.sync()
//     // .then(() => {
//     //     return Bank.bulkCreate([
//     //         {name: 'bank1'},
//     //         {name: 'bank2'},
//     //         {name: 'bank3'},
//     //         {name: 'bank4'},
//     //         {name: 'bank5'},
//     //     ])
//     // })
//     // .then(() => {
//     //     return Bank.findOne({where: {bank_id: 1}});
//     // })
//     // .then((data) => {
//     //     return data.createBranch({branch_name: 'branch1 of bank1'})
//     // })
//     // .then((result) => {
//     //     console.log(result)
//     // })
//     .then(() => {
//         return Bank.findOne({where: {bank_id: 1}});
//     })
//     .then((data) => {
//         bank = data
//         return data.getBranches();
//     })
//     .then(result => {
//         result[0].branch_name = 'changed name';
//         result[0].save();
//         bank.save();
//     })
//     .then()
//     .catch(err => {
//         console.log(err)
//     })

// Association between table without primary key
const Ship = sequelize.define('ship', {
    name: {
        type: DataTypes.TEXT
    }
});
const Captain = sequelize.define('captain', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }
});

Ship.belongsTo(Captain, {targetKey: 'name', foreignKey: 'captainName'});

// const Foo = sequelize.define('foo', {
//     name: {
//         type: DataTypes.STRING,
//         unique: true
//     }
// }, {timestamps: false})

// const Bar = sequelize.define('bar', {
//     name: {
//         type: DataTypes.STRING,
//         unique: true
//     }
// }, {timestamps: false});

// const Baz = sequelize.define('baz', {
//     name: {
//         type: DataTypes.STRING
//     }
// }, {timestamps: false})

// Foo.hasOne(Bar, {sourceKey: 'name', foreignKey: 'foo_name'});
// Bar.hasMany(Baz, {sourceKey: 'name', foreignKey: 'bar_name'});




let captain;
let ship;

sequelize.sync({alter: true})
    // .then(() => {
    //     return Captain.create({name: "Jack Sparrow"});
    // })
    // .then((data) => {
    //     captain = data;
    //     return Ship.create({name: "Black Pearl"})
    // })
    // .then(result => {
    //     return result.setCaptain(captain)
    // })
    // .then(() => {
    //     return Ship.findOne({where: {id: 1}});
    // })
    // .then((data) => {
    //     console.log(data)
    //     return data.getCaptain();
    // })
    // .then((result) => {
    //     console.log(result.toJSON())
    // })
    .then(() => {
        return Ship.findAndCountAll({include: [{model: Captain, where: {name: 'Jack Sparrow'}}]})
    })
    .then((ships) => {
        console.log(ships.rows.map(ship => console.log(ship.toJSON())))
    })
    .catch(err => {
        console.log(err)
    })



