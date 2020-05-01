const express = require('express');
const path = require('path');
const multer = require('multer');
//var cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('images'));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const indexRouter = require('./routes/index');
const playersRouter = require('./routes/players');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Server', 'Heroku');
  next();
});

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/api', apiRouter);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
  });
});


mongoConnect(() =>{
});

module.exports = app;
