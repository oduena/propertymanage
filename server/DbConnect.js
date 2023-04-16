const mysql = require('mysql');

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'padmin1',
//     password: 'All0w4cc3s$',
//     //database: 'pms_prod',
//     database: 'pmsauth2',
// });

const db = mysql.createPool({
    host: 'localhost',
    user: 'pmsadmin_padmin',
    password: 'All0w4cc3s$',
    //database: 'pms_prod',
    database: 'pmsadmin_pmsprod',
});

module.exports = db;