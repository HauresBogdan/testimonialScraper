import React from "react";

function TestimonialCard(props) {
  return (
    <div className="testimonial-card">

      <a href={props.privateLink}><img className="avatar" src={props.imgLink} alt="avatar" /></a>
      <p className="author-name">{props.author}</p>
      <p className="author-job">{props.job}</p>
      <p className="author-company"><a href={props.companyLink}>{props.company}</a></p> 
      {props.country.length === 1 ? <p className="country">{props.country[0]}</p> :
       <p className="country"> {props.country.map((ctr,i) => props.country.length-1 !==i ? `${ctr}, ` : ctr )}</p> 
      }
      
    </div>
  );
}

export default TestimonialCard;
