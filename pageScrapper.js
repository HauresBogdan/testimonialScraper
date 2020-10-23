const puppeteer = require("puppeteer");
var $ = require("jquery");

module.exports = async function scrape(currentPage) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://assist-software.net/testimonials?page=${currentPage}`
  );

  const myJSON = await page.evaluate(() => {
    const data = [];
    //get author info
    $(".testimonial-author").each((i, el) => {
      //for some reason I think the foreach inludes also the closing tags of the elements
      //so here we discard the closing tags by doing i%2==0
      if (i % 2 == 0) {
        const privateLink = $(el).find("a").attr("href");
        const author = $(el).find(".testimonial-author").text().trim();
        const job = $(el).find(".testimonial-job").text().trim();
        const company = $(el).find(".testimonial-company").text().trim();
        const companyLink = $(el).find(".testimonial-company a").attr("href");
        const country = $(el).find(".country").text().match(/.{1,2}/g);
        const imgLink = $(el).find(".img-responsive").attr("src");

        const puzzleJSON1 = {
          privateLink: `https://assist-software.net${privateLink}`,
          author: author,
          job: job,
          company: company,
          companyLink: companyLink,
          country: country,
          imgLink: imgLink,
        };

        data.push(puzzleJSON1);
      }
    });

    //get total pages
    const totalPagesArray = [];

    //make a array of all the text from all the list elemnts in pagination.
    //Converts it to numbers
    //If it can be converted to number push it to an array
    //return the max value of that array witch be the total nr of pages
    $(".pagination li").map(function (i, el) {
      !isNaN(Number($(el).text())) &&
        totalPagesArray.push(Number($(el).text()));
    });

    const totalPages = Math.max(...totalPagesArray);

    return {
      totalpages: totalPages,
      header: document.querySelector("h1").innerText,
      headerIMG: getComputedStyle(document.getElementById("page-header")).backgroundImage,
      subheader: document.getElementById("block-block-18").innerText,
      filterLabel: $(".view-testimonial-author-filters .view-content").find("span:first-child").text(),
      bottomHeader: $(".col-md-12 h2").text().trim(),
      bottomParagraph: $(".col-md-12 p").text().trim(),
      actionCallText: $(".text-center .btn-default").text(),
      actionCallURL: `https://assist-software.net${$(".text-center .btn-default").attr("href")}`,
      data: data,
    };
  });

  await browser.close();
  return myJSON;
};
