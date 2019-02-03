// Dependencies
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    headline: {
        type: String,
        trim: true,
        required: 'Headline not present and is required.'
    },
    url: {
        type: String,
        trim: true,
        required: 'URL not present and is required.',
        default: 'a'
    },
    date: {
        type: Date,
        default: Date.now
    }
    // thumbnail: String
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;