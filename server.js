const express = require("express");
const app = express();
const scrapePage = require('./pageScrapper');

app.get("/testimonials", async function (req, res) {
  
 let currentPage = 0;

 scrapePage(currentPage).then((result) => {    
    res.send(result);
 })


});

const PORT = 5000;

app.listen(5000, function () {
  console.log(`server started on port ${PORT}`);
});
