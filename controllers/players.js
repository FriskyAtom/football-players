const Player = require('../models/Player');

exports.getIndex = (req, res, next) => {
    Player.fetchAll()
        .then(players => {
            res.render('players/index', {
                players: players,
                pageTitle: 'Seznam hráčů',
                path: '/'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddPlayer = (req, res, next) => {
    res.render('players/edit-player', {
        pageTitle: 'Přidat Hráče',
        path: '/player/add-player',
        editing: false
    });
};

exports.postAddPlayer = (req, res, next) => {
    const image = req.file;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const nationality = req.body.nationality;
    //const imgUrl = req.body.imgUrl;
    const team = req.body.team;

    if (!image) {
        return res.status(422).render('player/add', {
            pageTitle: 'Přidat Hráče',
            path: '/player/add',
            editing: false,
            hasError: true,
            errorMessage: 'Attached file is not an image.',
        });
    }

    const imgUrl = image.path;
    //res.redirect('/players');
    const player = new Player(null, firstName, lastName, birthDate, nationality, imgUrl, team);
    player
        .save()
        .then(result => {
            //console.log(result);
            console.log('Created Product');
            res.redirect('/players');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getEditPlayer = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const playerId = req.params.playerId;
    Player.findById(playerId)
        // Product.findById(prodId)
        .then(player => {
            if (!player) {
                return res.redirect('/');
            }
            res.render('players/edit-player', {
                pageTitle: 'Edit player',
                path: '/player/edit',
                editing: editMode,
                player: player
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postEditPlayer = (req, res, next) => {
    const playerId = req.body.playerId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const nationality = req.body.nationality;
    const team = req.body.team;

    const player = new Player(playerId, firstName, lastName, birthDate, nationality, imgUrl, team);
    player
        .save()
        .then(result => {
            res.redirect('/players');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postDeletePlayer = (req,res, next) => {
    const playerId = req.body.playerId;
    Player.deletePlayerById(playerId)
        .then(() => {
            console.log('Deleted player');
            res.redirect('/players');
        })
        .catch((err) =>{
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};