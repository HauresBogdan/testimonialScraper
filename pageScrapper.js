const puppeteer = require("puppeteer");
const $ = require("jquery");

module.exports = async function scrape(URL) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  const myJSON = await page.evaluate(() => {
  const data = [];

  //get author info
  $("div[class='testimonial-author']").each((i, el) => {
      
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
    
    });
    const allCountries = [];
    
    //get country code and link
    $("#block-views-8dac7e462763426cfe529f708dbc81d8 > div > div > ul > li > a").each((i,el)=> {
      allCountries.push({countryLink: $(el).attr('href'), countryCode: $(el).text()});
    });
    
    //get total pages
    const totalPagesArray = [];
    var totalPages;

    //make a array of all the text from all the list elemnts in pagination.
    //Converts it to numbers
    //If it can be converted to number push it to an array
    //return the max value of that array witch be the total nr of pages
    if($(".pagination li").length> 2) {
      $(".pagination li").map(function (i, el) {
        !isNaN(Number($(el).text())) &&
          totalPagesArray.push(Number($(el).text()));
          totalPages = Math.max(...totalPagesArray);
      });
    } else {
      totalPages = 0;
    }

    const subheader = document.getElementById("block-block-18");
    
    return {
      totalpages: totalPages,
      countryArray :  allCountries,
      header: document.querySelector("h1").innerText,
      headerIMG: getComputedStyle(document.getElementById("page-header")).backgroundImage,
      subheader: subheader!==null ? subheader.innerText : "" ,

      filterLabel: $(".view-testimonial-author-filters .view-content").find("span:first-child").text(),
      bottomBanner: $(".col-md-12 h2").text().trim(),
      bottomBannerColor: $("#block-block-7").css('background'),
      bottomParagraph: $(".col-md-12 p").text().trim(),
      actionCallText: $(".text-center .btn-default").text(),
      actionCallURL: `https://assist-software.net${$(".text-center .btn-default").attr("href")}`,
      data: data,
    };
  });

  await browser.close();
  return myJSON;
};
