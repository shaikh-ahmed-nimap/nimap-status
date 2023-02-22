const { Model, DataTypes } = require("sequelize");
const sequelize = require('./db')

class Document extends Model {}
Document.init({
    author: DataTypes.STRING
}, { sequelize, modelName: 'document' });

class Version extends Model {}
Version.init({
  timestamp: DataTypes.DATE
}, { sequelize, modelName: 'version' });

Document.hasMany(Version); // This adds documentId attribute to version
Document.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId'
});

sequelize.sync().then(() => console.log('yes')).catch((err) => console.log(err));