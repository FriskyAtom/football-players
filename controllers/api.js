const Player = require('../models/Player');

exports.apiIndex = (req, res, next) => {
    res.status(200).json({
        'info' : 'welcome to football players API'
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};

exports.getPlayers = (req, res, next) => {
    Player.fetchAll()
        .then(players => {
            console.log(players);
            res.status(200).json(players)
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};