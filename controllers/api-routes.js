// Dependencies
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../models/articles.js');

module.exports = function (app) {
    app.get('/scrape', function (req, res) {
        console.log('Scraping...');

        request('https://old.reddit.com/r/news/top', function (error, response, html) {
            const $ = cheerio.load(html);
            const results = [];

            $('div.thing').each(function (i, element) {
                const headline = $(element).find('a.title').text();
                const url = $(element).find('a.title').data('href-url');

                results.push({
                    headline: headline,
                    url: url,
                });
            });
            console.log(results);
            Article.insertMany(results)
                .then(dbNews => {
                    console.log(dbNews);
                })
                .catch(err => {
                    console.log(err.message);
                });
        });
        res.end();
    });
}