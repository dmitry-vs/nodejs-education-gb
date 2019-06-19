const request = require('request');
const cheerio = require('cheerio');

request('https://yandex.ru', (err, response, body) => {
    if(!err && response.statusCode === 200) {
        news = getNews(body);
        console.log('Yandex news headlines:');
        for(let i in news) {
            console.log(`${+i + 1}. ${news[i]}`);
        }
    }
    else {
        console.log('Failed to load page content');
    }
});

// function to parse html and get news headlines
let getNews = htmlContent => {
    const $ = cheerio.load(htmlContent);
    const newsAnchors = $('div#news_panel_news li a');

    result = [];
    for(let i = 0; i < newsAnchors.length; i++) {
        result.push($(newsAnchors[i]).text());
    }
    return result;
}