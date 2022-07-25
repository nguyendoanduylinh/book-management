const Connection = require('./connection');

class Product {

    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Connect success!');
            }
        });
    }

    getProducts() {
        return new Promise((resolve, reject) => {

            this.connection.query('select * from products', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    createProduct(product) {
        let insertQuery = `insert into products(name, price, description)
                           VALUES ('${product.name}', ${product.price}, '${product.description}')`;
        this.connection.query(insertQuery, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Insert success')
            }
        });
    }

    getProduct(id) {
        return new Promise((resolve, reject) => {
            let query = `select *
                         from products
                         where id = ${id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    updateProduct(id, product) {
        let query = `update products set name = '${product.name}', price = ${product.price}, description= '${product.description}' where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Update success')
            }
        })
    }

    deleteProduct(id){
        let query = `delete from products where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Delete success')
            }
        })
    }
}

module.exports = Product;
