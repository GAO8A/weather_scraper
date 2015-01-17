'use strict';


var links = [];

 for(var i = 1;i<37;i++){
    if (i == 7) continue; // nb-7 doesnt exist
    links.push('http://weather.gc.ca/city/pages/nb-' + i + '_metric_e.html');
 }

/*
 * Dependencies.
 */

var fs,
    Scraper,
    async;

fs = require('fs');
Scraper = require('scraperjs').StaticScraper;
async = require('async');

/**
 * Scrape.
 *
  * @param {Object} jQuery for StaticScraper
 * @return {Array.<string>}
 */


function scrape($) { 

        return $("#wxo-conditiondetails").map(function(data) {
            console.log($(this).text());
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

// non async version

// links.map(function(i){

// Scraper.create(i).scrape(scrape, save);

// });



async.map(links,function(item,callback)
                {
                    callback(null,Scraper.create(item).scrape(scrape,save));

                },function(error,result){
                    return result

                });