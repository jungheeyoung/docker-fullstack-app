var mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'navi0208!',
    database: 'myapp'
});

exports.pool = pool;