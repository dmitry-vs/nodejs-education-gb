# News

Console script to fetch news headlines from Yandex home page.

Uses `request` module to get page content and `cheerio` module to parse it.

## Example

    >node news.js
    Yandex news headlines:
    1. Посол Австрии будет вызван в МИД России
    2. Эксперт прокомментировал слова экс-главы штаба РВСН о «Периметре»
    3. В России предложили ввести новую систему техосмотра автомобилей
    4. В Госдуме прокомментировали предложение лишить Ефремова звания
    5. Mitsubishi представила обновлённый пикап L200
    6. В Роскачестве рассказали, как выбрать идеальные пельмени
    7. Эксперт оценил идею депутата Рады «запретить зиму» из-за цен на газ
    8. Нефтяники решили защититься от санкций
    9. Опубликовано видео частично затонувшего норвежского фрегата
    10. В Совете Европы опасаются возможного выхода России из организации

---

# Translate

Console script to translate Russian text to English using Yandex Translate API.

API key is required to perform requests using Yandex Translate API.

## Example

    >node translate.js
    Input Russian text to be translated to English
    :>Кошка
    Translation result:
    Cat