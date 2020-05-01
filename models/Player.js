const mongodb = require('mongodb');
const getDB = require('../utils/database').getDB;

module.exports = class Player {
    constructor(id, firstName, lastName, birthDate, nationality, imgUrl, team) {
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.nationality = nationality;
        this.imgUrl = imgUrl;
        this.team = team;
    }
    save() {
        const db = getDB();
        let dbOp;
        if (this._id) {
            dbOp = db
                .collection('players')
                .updateOne({ _id: this._id }, { $set: this });
        }else {
            dbOp = db.collection('players').insertOne(this);
        }
        return dbOp.then(result =>{
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    static fetchAll() {
        const db = getDB();
        return db
            .collection('players')
            .find()
            .toArray()
            .then(players => {
                return players;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(playerId) {
        const db = getDB();
        return db
            .collection('players')
            .find({ _id: new mongodb.ObjectId(playerId) })
            .next()
            .then(player => {
                return player;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deletePlayerById(id){
        const db = getDB();
        return db.collection('players')
            .deleteOne({_id: new mongodb.ObjectId(id)})
            .then(response => {
                console.log('deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
};