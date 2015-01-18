'use strict';


var links = [];

 for(var i = 1;i<5;i++){
    if (i == 7) continue; // nb-7 doesnt exist
    links.push('http://weather.gc.ca/city/pages/nb-' + i + '_metric_e.html');
 }

/*
 * Dependencies.
 */

var fs,
    Scraper,
    async,
    json;

fs = require('fs');
Scraper = require('scraperjs').StaticScraper;
async = require('async');
json = require('jsonify');

/**
 * Scrape.
 *
  * @param {Object} jQuery for StaticScraper
 * @return {Array.<string>}
 */


function replacer(key,value){

        return '{"'+value+'"},';
    
}

function scrape($) { 

        return $("#wxo-conditiondetails").map(function(data) {

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

//     var obj = {};

//     values = values[0].toString().trim().split('\n');

//     if( typeof fields === 'object') {
//    values.each(function(value) {
//       var c = value.split(':');
//       obj[c[0]] = c[1];
//    });
// }


//     console.log(obj);

//     return obj;

    values = json.parse(json.stringify(values[0],replacer,''))
                .toString()
                .replace(/\n/g,'')
                .replace(/\s\s\s/g,'')
                .replace(/:\s\s/g,':')
                .replace(/"\s\s/g,'"')
                .replace(/\d:\d/g,'')
                .replace(/:/g,'":"')
                .replace(/\sDewpoint/g,'\n"Dewpoint')
                .replace(/\sTendency/g,'\n"Tendency')
                .replace(/\sHumidity/g,'\n"Humidity')
                .replace(/\sTemperature/g,'\nTemperature')
                .replace(/\s\s/g,'",\n"')
                .replace(/\w\n/g,'",\n');            


                

    console.log(values);

    return values;

}

/**
 * Write clean data.
 *
 * @param {Array.<string>} results - Raw data.
 */
function save(results) {
    fs.appendFile('data/windspeed.json', parse(results),function(err){if (err) throw err;});
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

                    if (error) throw error;
                    return result;

                });