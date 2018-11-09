const request = require('request');
const readline = require('readline');

const yandexApiKey = require('./yandex_translate_api_key.js').yandexTranslateApiKey;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let translateEnglishToRussian = (text) => {
    if(!text) {
        console.log('Incorrect input');
        return;
    }

    let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    let lang = 'ru-en';
    let req = `${url}?key=${yandexApiKey}&lang=${lang}&text=${encodeURIComponent(text)}`;

    request(req, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            console.log(`Translation result:\n${JSON.parse(body).text[0]}`);
        }
        else {
            console.log('Error occured during request');
        }
    });
}

rl.question('Input Russian text to be translated to English\n:>', (answer) => {
    translateEnglishToRussian(answer);
    rl.close();
    process.stdin.destroy();
});