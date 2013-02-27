window.Product = Backbone.Model.extend({

    urlRoot: "/products",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.category = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a Category."};
        };

        this.validators.company_id = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a Company ID."};
        };

        this.validators.price = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter Price."};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        category: "", 
        company_id: "", 
        image: "",
        price: "",
        style_hash: "", 
        style_name: null, 
        stylenumber: ""
    }
});

window.ProductCollection = Backbone.Collection.extend({

    model: Product,

    url: "/products"

});