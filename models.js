var mongoose = require('mongoose');

module.exports = function(wagner){
    mongoose.connect('mongodb://localhost:27017/test');
    var Category = mongoose.model('Category',require('./category'),'categories');
    wagner.factory('Category',function(){
        return Category;
    });
    var Product = mongoose.model('Product',require('./product'),'products');
    wagner.factory('Product',function(){
        return Product;
    });
    var models =  {
        Category:Category,
        Product: Product
    };
    _.each(models,function(value,key){
        wagner.factory(key,function(){
            return value;
        });
    });
    return models;
};