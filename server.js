const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const scrapePage = require('./pageScrapper');
const cors = require('cors');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post("/testimonials", async function (req, res) {

  const page = req.body.page;
  const currentCountry = req.body.currentCountry;
  let currentPage = 0;
  currentPage = page; 
  const URL =`https://assist-software.net${currentCountry.countryLink}?page=${currentPage}`

  scrapePage(URL).then((result) => {    
      res.send(result);
  })
});

const PORT = 5000;

app.listen(5000, function () {
  console.log(`server started on port ${PORT}`);
});
