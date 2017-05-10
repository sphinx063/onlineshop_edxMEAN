var mongodb = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/video';
mongodb.MongoClient.connect(url,function(err,db){
    assert.equal(null,err)
    console.log('Connected Successfully to mongod server.');
    db.collection('movieDetails').find().toArray(function(err,docs){
        assert.equal(null,err);
        console.log('Movie Titles');
        docs.forEach(function(doc){
            console.log(doc.title);
        });
    });
});
