const axios = require("axios").default;
const cheerio = require("cheerio");

module.exports = async function scrape(currentPage) {

  const resp = await axios.get(`https://assist-software.net/testimonials?page=${currentPage}`);
  const html = resp.data;
  $ = cheerio.load(html);
  const myJSON = { 
    totalpages: 1,
    data: []
   };
  const data = [];

  //get total pages
  const totalPagesArray = [];

  //make a array of all the text from all the list elemnts in pagination. 
  //Converts it to numbers 
  //If it can be converted to number push it to an array 
  //return the max value of that array witch be the total nr of pages
  $('.pagination li').map(function(i, el) {

    !isNaN(Number($(el).text())) && totalPagesArray.push(Number($(el).text())) 
    
  });
  myJSON.totalpages = Math.max(...totalPagesArray);   
 
  //get author info
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

      data.push(puzzleJSON1);  
      
      myJSON.data = data;

    }
  });
  return myJSON;  
}