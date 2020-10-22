const express = require("express");
const app = express();
const axios = require("axios").default;
const cheerio = require("cheerio");


app.get("/testimonials", async function (req, res) {
  const resp = await axios.get("https://assist-software.net/testimonials");
  const html = resp.data;
  $ = cheerio.load(html);
  const myJSON = [];

  $(".testimonial-author").each( /*async uncoment async for quote*/ (i, el) => {

    //for some reason I think the foreach inludes also the closing tags of the elements
    //so here we discard the closing tags by doing i%2==0
    if (i % 2 == 0) {
      const privateLink = $(el).find('a').attr('href');
      const author = $(el).find(".testimonial-author").text().trim();
      const job = $(el).find(".testimonial-job").text().trim();
      const company = $(el).find(".testimonial-company").text().trim();
      const companyLink = $(el).find('.testimonial-company a').attr("href");
      const country = $(el).find(".country").text().match(/.{1,2}/g);
      const imgLink = $(el).find(".img-responsive").attr('src');


      //uncomment if you want the quote also but will be slower
      /* const resp2 = await axios.get(`https://assist-software.net${privateLink}`);
      const html2 = resp2.data;
      $2 = cheerio.load(html2);

      const quote = $2('.begin-quote + p').text();*/      

      const puzzleJSON1 = {
        //uncomment if you want the quote also
        //quote: quote,
        privateLink: privateLink,
        author: author,
        job: job,
        company: company,
        companyLink: companyLink,
        country: country,
        imgLink: imgLink
      };

      myJSON.push(puzzleJSON1);
     

      

    }
  });
  console.log(myJSON);
  res.send(myJSON);
  
});

const PORT = 5000;

app.listen(5000, function () {
  console.log(`server started on port ${PORT}`);
});
