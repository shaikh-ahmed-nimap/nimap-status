const config = require('config');
const mysql = require('mysql')
const util = require('node:util');


const CONFIG_OBJ = {
    host: config.get('host'),
    port: config.get('port'),
    database: config.get('database'),
    user: config.get('user'),
    password: config.get('password')
}

const connection = mysql.createConnection(CONFIG_OBJ);
module.exports = connection;