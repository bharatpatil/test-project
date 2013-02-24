var express = require("express"),
	product = require('./routes/products.js');

var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/products', product.findAll);
app.get('/products/:id', product.findById);
app.post('/products', product.addNew);
app.put('/products/:id', product.updateProduct);
app.delete('/products/:id', product.deleteProduct);

app.listen(3000);

console.log("started on 3000 port");
