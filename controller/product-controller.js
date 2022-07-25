const Product = require('../model/product');
const fs = require('fs');
const qs = require('qs');

class ProductController {
    constructor() {
        this.product = new Product();
    }

    showProductListPage(req, res) {
        fs.readFile('views/products/list.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                let products = await this.product.getProducts();
                let tbody = '';
                //     products.map((product, index) => {
                //         tbody += `<tr>
                //     <td>${index + 1}</td>
                //     <td>${product.name}</td>
                //     <td>${product.price}</td>
                //     <td><a href="/products/edit/${product.id}" class="btn btn-primary">Edit</a></td>
                //     <td><a href="/products/delete/${product.id}" class="btn btn-danger">Delete</a></td>
                // </tr>`;
                //     });
                for (let index = 0; index < products.length; index++) {
                    tbody += ` <tr>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck${index + 1}">
                                                                <label class="custom-control-label" for="customCheck${index + 1}">&nbsp;</label>
                                                            </div>
                                            </td>
                                            <td>${products[index].name}</td>
                                            <td>${products[index].price}</td>
                                            <td>
                                                <a href="javascript:void(0);" class="action-icon btn btn-primary text-white">Edit</a>
                                                <a href="javascript:void(0);" class="action-icon  btn btn-danger  text-white">Delete</a>
                                            </td>
                                        </tr>`;
                }
                data = data.replace('{products}', tbody);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    showProductFormCreate(req, res) {
        fs.readFile('views/products/create.html', 'utf-8', (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    createProduct(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let product = qs.parse(data);
            this.product.createProduct(product);
            res.writeHead(301, {
                location: '/products'
            });
            return res.end();
        });
    }

    showProductEditForm(req, res, idUpdate) {
        fs.readFile('views/products/edit.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                let product = await this.product.getProduct(idUpdate);
                if (product.length > 0) {
                    data = data.replace('{id}', product[0].id);
                    data = data.replace('{name}', product[0].name);
                    data = data.replace('{price}', product[0].price);
                    data = data.replace('{description}', product[0].description);
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }

    editProduct(req, res, id) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let product = qs.parse(data);
            this.product.updateProduct(id, product);
            res.writeHead(301, {
                location: '/products'
            });
            return res.end();
        });
    }
}

module.exports = ProductController;
