const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb+srv://lukas:IQ2Uk7MTiXSVRthM@fotball-jrvgq.mongodb.net/test?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback();

        })
        .catch(err => {
            console.log(err);
            throw err
        });
};

const getDB = () => {
    if(_db)
        return _db;
    throw 'Database not found';
};


exports.mongoConnect = mongoConnect;
exports.getDB = getDB;




