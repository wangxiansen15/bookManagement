const mysql = require('mysql');

exports.base = (sql,data,callback) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '111',
        database : 'mybook',
        multipleStatements: true
    });

    connection.connect();

    connection.query(sql, data,function(error, result, fields) {
        if (error) throw error;
        callback(result);
    });

    connection.end();
}