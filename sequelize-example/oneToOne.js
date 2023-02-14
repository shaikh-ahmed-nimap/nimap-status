const {sequelize, DataTypes} = require('./config');

const Country = sequelize.define('country', {
    countryName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

const Capital = sequelize.define('capital', {
    capitalName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

Country.hasOne(Capital, {foreignKey: 'country_id', onDelete: 'CASCADE'});
Capital.belongsTo(Country, {foreignKey: 'country_id', onDelete: 'CASCADE'});
let country;
let capital;
sequelize.sync({alter: true})
    // .then(() => {
    //     console.log('Connection to database successfull');
    //     Country.bulkCreate([
    //         {countryName: 'Spain'},
    //         {countryName: 'England'},
    //         {countryName: 'France'},
    //         {countryName: 'Germany'}
    //     ])
    // })
    .then(() => {
        // return Country.findOne({where: {countryName: 'England'}})
        return Country.destroy({where: {countryName: 'France'}});
    })
    // .then(data => {
    //     country = data;
    //     // return Capital.findOne({where: {capitalName: 'London'}})
    //     return Capital.findOne({where: {capitalName: 'Paris'}})
    // })
    // .then(data => {
    //     capital = data;
    //     // country.setCapital(capital);
    //     capital.setCountry(country)
    // })
    .then(() => {
        
    })
    .catch ((err) => {
        console.log('Connection failed with error: ', err)
    })