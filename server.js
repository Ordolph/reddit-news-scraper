// Dependencies 
const express = require('express');
const app = express();
const Sentry = require('@sentry/node');
const exphbs = require('express-handlebars');
// Config
app.use(express.static('public'));

const PORT = process.env.PORT || 3000
Sentry.init({
    dsn: 'https://ff6ab29e391643acb9aaeb041bc36802@sentry.io/1385149'
});

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

//TODO: const routes = require('./controllers');
//TODO: app.use(routes);

app.get('/', function mainHandler(req, res) {
    throw new Error('Broke!');
});

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}.`));