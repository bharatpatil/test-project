var express = require("express"),
	products = require('./products/products.js');

var app = express();

app.get('/products',products.findAll);

app.get('/products/:id',products.findById);

app.listen(3000);

console.log("started on 3000 port");
