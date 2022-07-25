const mysql = require('mysql');

class Connection {

    static createConnection() {
        let configToMySQL = {
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'product_management'
        };
        return mysql.createConnection(configToMySQL);
    }
}
module.exports = Connection;
