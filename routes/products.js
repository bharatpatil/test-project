var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('productdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'productdb' database");
        db.collection('products', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'productdb' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving product: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('products', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProduct = function(req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.insert(product, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProduct = function(req, res) {
    var id = req.params.id;
    var product = req.body;
    delete product._id;
    console.log('Updating product: ' + id);
    console.log(JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, product, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating product: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(product);
            }
        });
    });
}

exports.deleteProduct = function(req, res) {
    var id = req.params.id;
    console.log('Deleting product: ' + id);
    db.collection('products', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
var populateDB = function() {

    var products = [
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-R9-P-MXM.jpg",
          "price": "$375",
          "style_hash": "AE-R9-P-MXM", 
          "style_name": null, 
          "stylenumber": "AE-R9-P-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33",           
          "image": "AE-R9-P-MXM-2.jpg", 
          "price": "$375", 
          "style_hash": "AE-R9-P-MXM-2", 
          "style_name": null, 
          "stylenumber": "AE-R9-P-MXM-2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-S9-P-MXM.jpg", 
          "price": "$375", 
          "style_hash": "AE-S9-P-MXM", 
          "style_name": null, 
          "stylenumber": "AE-S9-P-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-S9-P-MXM-2.jpg", 
          "price": "$375", 
          "style_hash": "AE-S9-P-MXM-2", 
          "style_name": null, 
          "stylenumber": "AE-S9-P-MXM-2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-R15-P-MXM.jpg", 
          "price": "$550", 
          "style_hash": "AE-R15-P-MXM", 
          "style_name": null, 
          "stylenumber": "AE-R15-P-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-R15-P-MXM-2.jpg", 
          "price": "$550", 
          "style_hash": "AE-R15-P-MXM-2", 
          "style_name": null, 
          "stylenumber": "AE-R15-P-MXM-2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-S15-P-MXM.jpg", 
          "price": "$550", 
          "style_hash": "AE-S15-P-MXM", 
          "style_name": null, 
          "stylenumber": "AE-S15-P-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "AE-S15-P-MXM-2.jpg", 
          "price": "$550", 
          "style_hash": "AE-S15-P-MXM-2", 
          "style_name": null, 
          "stylenumber": "AE-S15-P-MXM-2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "DE101-220-GB13-MXM-7.jpg", 
          "price": "$925", 
          "style_hash": "DE101-220-GB13-MXM-7", 
          "style_name": null, 
          "stylenumber": "DE101-220-GB13-MXM-7"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "GDE-2OVHPL-MXM-4.jpg", 
          "price": "$525", 
          "style_hash": "GDE-2OVHPL-MXM-4", 
          "style_name": null, 
          "stylenumber": "GDE-2OVHPL-MXM-4"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "E-2LTMX-CP-MXM2.jpg", 
          "price": "$695", 
          "style_hash": "E-2LTMX-CP-MXM2", 
          "style_name": null, 
          "stylenumber": "E-2LTMX-CP-MXM2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "EHSSG-1915LT-MXM2.jpg",
          "price": "$695", 
          "style_hash": "EHSSG-1915LT-MXM2", 
          "style_name": null, 
          "stylenumber": "EHSSG-1915LT-MXM2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "LE812-MXM.jpg", 
          "price": "$495", 
          "style_hash": "LE812-MXM", 
          "style_name": null, 
          "stylenumber": "LE812-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "LE812-MXM-2.jpg", 
          "price": "$495", 
          "style_hash": "LE812-MXM-2", 
          "style_name": null, 
          "stylenumber": "LE812-MXM-2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "LEG-3-MXM.jpg", 
          "price": "$550", 
          "style_hash": "LEG-3-MXM", 
          "style_name": null, 
          "stylenumber": "LEG-3-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "FE-GF4-SH-MXM-2.jpg", 
          "price": "$495", 
          "style_hash": "FE-GF4-SH-MXM-2", 
          "style_name": null, 
          "stylenumber": "FE-GF4-SH-MXM-2"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "E-190-S-3FH-MXM.jpg", 
          "price": "$650", 
          "style_hash": "E-190-S-3FH-MXM", 
          "style_name": null, 
          "stylenumber": "E-190-S-3FH-MXM"
      }, 
      {
          "category": "Earrings", 
          "company_id": "33", 
          "image": "SE-M-WT-MXM-4.jpg", 
          "price": "$375", 
          "style_hash": "SE-M-WT-MXM-4", 
          "style_name": null, 
          "stylenumber": "SE-M-WT-MXM-4"
      }
];

    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });

};