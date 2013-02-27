var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/products');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 4000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/products', wine.findAll);
app.get('/products/:id', wine.findById);
app.post('/products', wine.addProduct);
app.put('/products/:id', wine.updateProduct);
app.delete('/products/:id', wine.deleteProduct);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
