const scrapePage = require('./pageScrapper');
const isJSON = require('is-valid-json');

const URL = "https://assist-software.net/testimonials";

test("page scraper returns valid JSON", () => {
    expect(isJSON(scrapePage(URL))).toBe(true);
});