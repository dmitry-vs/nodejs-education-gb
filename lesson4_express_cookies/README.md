# News Form

Express web application to get news headlines from Yandex home page and show them on web page.

User sets number of headlines to fetch (1 to 10), and news category (country or region) using form controls.

Form values can be set automatically if GET parameters are provided:

    http://localhost:3000/news?news_count=7&news_category=country

`Request` module is used to get Yandex home page content.

`Cheerio` module is used to parse content.

Cookies are used to remember user settings.

`Handlebars` template engine is used to show resulting page.