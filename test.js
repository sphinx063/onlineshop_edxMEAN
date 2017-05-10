var wagner = require('wagner-core');
var superagent = require('superagent');
var assert = require('assert');
var BASE_URL = "http://localhost:3000";
describe('Category API Test',function(){
    var server;
    var Category;
    var Product;
    before(function(){
        var app = express();
        models = require('./models')(wagner);
        app.use(require('./api')(wagner));
        server = app.listen(3000);
        Category = models.Category;
        Product = models.Product;
    });
    beforeEach(function(done){
        Category.remove({},function(err){
            assert.ifError(err);
            done();
        });
    });
    after(function(){
        server.close();
    });
    it('can load category by id',function(done){
        Category.create({_id:'Electronics'},function(err,doc){
            assert.ifError(err);
            var url = BASE_URL+'/category/id/Electronics';
            superagent.get(url,function(error,res){
                assert.ifError(error);
                var result;
                assert.doesNotThrow(function(){
                    result = JSON.parse(res.text);
                });
                assert.ok(result.category);
                assert.equal(result.category._id,'Electronics');
                done();
            });
        });
    });
    it('can load parents of category',function(done){
        var url = BASE_URL+'/category/parent/Electronics';
        var categories = [{_id:'Electronics'},
                          {_id:'Phones',parent:'Electronics'},
                          {_id:'Laptops',parent:'Electronics'},
                          {_id:'Bacon',parent:'Food'}
                         ];
        Category.craete(categories,function(err,categories){
            assert.ifError(err);
            superagent.get(url,function(error,res){
                assert.ifError(error);
                var result;
                assert.doesNotThrow(function(){
                    result = JSON.parse(res.text);
                });
                assert.equal(result.categories.length.2);
                assert.equal(result.categories[1]._id,'Laptops');
                done();
            });
        });
    });
    it('can load product by id',function(done){
        var p_id = '00000000001';
        var product = {
            name: 'LG G4',
            _id: p_id,
            price: {
                amount: 300,
                currency: 'USD'
            }
        };
        Product.create(product,function(err,doc){
            assert.ifError(err);
            var url = BASE_URL+'/product/id/'+p_id;
            superagent.get(url,function(error,res){
                assert.ifError(error);
                var result;
                assert.doesNotThrow(function(){
                    result = JSON.parse(res.text);
                });
                assert.ok(result.product);
                assert.equal(result.product.name,'LG G4');
                done();
            });
        });
    });
});
