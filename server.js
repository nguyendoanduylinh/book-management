const http = require('http');
const url = require('url');
const qs = require('qs');
const fs = require('fs');
const HomeController = require("./controller/home-controller");
const ErrorController = require("./controller/error-controller");
const ProductController = require("./controller/product-controller");
const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "min.js": "text/javascript",
    "css": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
};
let homeController = new HomeController();
let errorController = new ErrorController();
let productController = new ProductController();

let server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let urlPath = urlParse.pathname;
    let method = req.method;
    const filesDefences = req.url.match(/\.js|.css|.jpg|.png|.gif|min.js|min.css/);
    if (filesDefences) {
        let filePath = filesDefences[0].toString();
        let extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        if (filePath.includes('/css')){
            extension = mimeTypes[filesDefences[0].toString().split('/')[1]];
        }
        if (extension.includes('?')){
            extension = extension.split('?')[0];
        }
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res)
    }
    switch (urlPath) {
        case '/': {
            homeController.showHomePage(req, res);
            break;
        }
        case '/products': {
            productController.showProductListPage(req, res);
            break;
        }
        // case '/products/create': {
        //     if (method === 'GET') {
        //         productController.showProductFormCreate(req, res);
        //     } else {
        //         productController.createProduct(req, res);
        //     }
        //     break;
        // }
        // case '/products/edit': {
        //     let query = qs.parse(urlParse.query);
        //     let idUpdate = query.id;
        //     if (method === 'GET') {
        //         productController.showProductEditForm(req, res, idUpdate);
        //     } else {
        //         productController.editProduct(req, res, idUpdate);
        //     }
        //     break;
        // }
        // default: {
        //     errorController.showError404Page(req, res);
        //     break;
        // }
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
