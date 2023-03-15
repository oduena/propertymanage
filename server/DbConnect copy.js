const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'padmin1',
    password: 'All0w4cc3s$',
    database: 'pmsauth2',
});

module.exports = db;