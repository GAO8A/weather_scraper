'use strict';

/*
 * Dependencies.
 */

 var links = ['http://weather.gc.ca/city/pages/nb-23_metric_e.html'
            ,'http://weather.gc.ca/city/pages/nb-25_metric_e.html'
            ,'http://weather.gc.ca/city/pages/nb-29_metric_e.html'];

var fs,
    Scraper;

fs = require('fs');
Scraper = require('scraperjs').DynamicScraper;

/**
 * Scrape.
 *
 * @return {Array.<string>}
 */


function scrape() {
        return $("#wxo-conditiondetails .longContent").map(function(data) {
            console.log(data);
            return $(this).text();
        });
}

/**
 * Clean scraped data.
 *
 * @param {Array.<string>} values
 * @return {Array.<string>}
 */
function parse(values) {

    values = values[0].toString().trim();

    console.log(values);
    return values;
}

/**
 * Write clean data.
 *
 * @param {Array.<string>} results - Raw data.
 */
function save(results) {
    fs.appendFile('data/windspeed.txt', parse(results).concat('\n'),function(err){if (err) throw err;});
}

/*
 * Scraper.
 */
links.map(function(i){

Scraper.create(i).scrape(scrape, save);

});