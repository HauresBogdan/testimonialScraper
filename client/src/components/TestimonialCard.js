import React from "react";

function TestimonialCard(props) {
  return (
    <div className="testimonial-card">
      <a href={props.privateLink}>
        <img className="avatar" src={props.imgLink} alt="avatar" />
      </a>
      <p className="author-name">{props.author}</p>
      <p className="author-job">{props.job}</p>
      <p className="author-company">
        <a href={props.companyLink}>{props.company}</a>
      </p>

      {/* construct country flags */}
      {props.country.length === 1 ? (
        <p className="country">
          {props.country[0] === "UK" ? (
            <span>
              <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg`} alt="flag" />
              {props.country[0]}
            </span>
          ) : (
            <span>
              <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${props.country[0]}.svg`} alt="flag" />
              {props.country[0]}
            </span>
          )}
        </p>
      ) : (
        <p className="country">
          {props.country.map((ctr, i) =>
            props.country.length - 1 !== i ? (
              ctr === "UK" ? (
                <span key={ctr}>
                  <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg`} alt="flag" />
                  {`${ctr}, `}
                </span>
              ) : (
                <span key={ctr}>
                  <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${ctr}.svg`} alt="flag" />
                  {`${ctr}, `}
                </span>
              )
            ) : ctr === "UK" ? (
              <span  key={ctr}>
                <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg`} alt="flag" />
                {ctr}
              </span>
            ) : (
              <span  key={ctr}>
                <img className="flag" src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${ctr}.svg`} alt="flag" />
                {ctr}
              </span>
            )
          )}
        </p>
      )}
    </div>
  );
}

export default TestimonialCard;
