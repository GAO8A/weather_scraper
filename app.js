

// var scraperjs = require('scraperjs');

var links = ['http://weather.gc.ca/city/pages/nb-23_metric_e.html'
			,'http://weather.gc.ca/city/pages/nb-25_metric_e.html'
			,'http://weather.gc.ca/city/pages/nb-29_metric_e.html'];

var bar = [];

// var foo = links.map( function(i){

// scraperjs.StaticScraper.create(i)
//     .scrape(function($) {
//         return $("#wxo-conditiondetails .longContent").map(function() {
//             return $(this).text();
//         }).get();
//     }, function(news) {
//     	return JSON.stringify(news);
//         // console.log(news);
//     })

// });



// console.log(foo);


var async = require('async');

var scraperjs = require('scraperjs'),
    router = new scraperjs.Router();

router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});



router.on('http://weather.gc.ca/city/pages/*')
    .createStatic()
    .scrape(function($) {
        return $("#wxo-conditiondetails .longContent").map(function() {
            return $(this).text();
        }).get();
    }, function(data) {
        // path[utils.params.id] = links
		return data[0].toString().trim();

    })

// var bar = links.map(function(i){
// 				router.route(i,function(error,data) {
//                 		return data; 
//                 		});
// 						}, function(e){
// 						 console.log(e);});

function routez(url,callback){
	callback(null,router.route(url,function(error,transformed){
							console.log(transformed);
							bar.push(transformed);
							console.log(bar);
							return bar;
							})

							);
	console.log(callback);

}

async.map(links, routez, function(err,result){ console.log('done'); });




// console.log(qux);
// console.log(qux);

// for(var i = 0; i < links.length; i++){

// 			router.route(links[i],function(error,data) {
                						
//                 console.log(data);
//                 		});


// 			};




// console.log(bar);


// console.log(baz);
