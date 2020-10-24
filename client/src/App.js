import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header.js";
import Filter from "./components/Filter.js";
import TestimonialCard from "./components/TestimonialCard.js";
import Footer from "./components/Footer.js";
import Pagination from "react-js-pagination";
import classNames from "classnames";

function App() {
  const [response, setResponse] = useState({ data: [],countryArray: [], totalpages: 1 });
  const [page, setPage] = useState({activePage: 1});
  const [currentCountry, setCurentCountry] = useState({countryCode: "All", countryLink: "/testimonials"});
  const [scraping, setScraping] = useState(false);

  function handleCountryChange(c) {
    setCurentCountry(c);
    setPage({activePage: 1});
  }

  function handlePageChange(pageNumber) {
    setPage({activePage: pageNumber});
  }

  useEffect(() => {
    setScraping(true);
    axios({
      method: "post",
      url: "http://localhost:5000/testimonials",
      data: {
        //api pages begin from 0
        page: page.activePage-1,
        currentCountry: currentCountry
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setResponse(res.data);
        setScraping(false);
      })
      .catch((err) => console.log(err));
  }, [page.activePage,currentCountry]);

  return (
    <>
    {/*if data arived make page else print Scraping*/}
    {response.header ?
    <div className="App">
      <Header url={response.headerIMG} header={response.header} subheader={response.subheader} />
      <div className="container-filter">
      <Filter filterLabel={response.filterLabel} />
      </div>
      <div className="container-filter2">
      <ul className="country-list">
      { response.countryArray.map(country => 
        <li key={country.countryCode} onClick={() =>{handleCountryChange(country)}} 
        className={classNames('', { 'flag-active': country.countryCode === currentCountry.countryCodeS})}>
          {country.countryCode === "All" ? "":  country.countryCode === "UK" ? 
          <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg`}  alt="flag"/> :
          <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.countryCode}.svg`} alt="flag"/>}
           {country.countryCode}</li>
        )} 
      </ul>
      </div>
      
      {scraping ? <div className="loading">Loading...</div> :
      <div className="my-container">
       { response.data.map((person) => (
          <TestimonialCard key={person.author} author={person.author} company={person.company} companyLink={person.companyLink} country={person.country} 
          imgLink={person.imgLink} job={person.job} 
          privateLink={person.privateLink} />
        ))}
        </div>}
      
      {response.totalpages !==0 &&
      <Pagination
          activePage={page.activePage}
          itemsCountPerPage={1}
          totalItemsCount={response.totalpages}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          innerClass="ul-pagination"
          itemClass="li-pagination"
          linkClass="a-pagination"
          activeClass="active-li"
          activeLinkClass="active-a"
        />}
      <Footer bottomHeader={response.bottomBanner} bottomParagraph={response.bottomParagraph} actionCallText={response.actionCallText} 
      actionCallURL={response.actionCallURL} bottomBannerColor={response.bottomBannerColor}/>
    </div> :
    <div className="loading">Scraping...</div>
    }
    </>
  );
}

export default App;
