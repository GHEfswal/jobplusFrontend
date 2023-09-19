import React from "react";
import "./alert.scss";

/*
export default function Alert({ type, data }) {
  
  if (!data.message) return null;
  
  return (
    // <div className="alert alert--error">
    // convert className to a string interpolation
    <div className={`alert alert--${type}`}>
    <p className="alert__message">{data?.message}</p>
    <ul className="alert__details">
    {data?.details?.map((detail, index) => (
      <li key={index} className="alert__detail">
      {detail.message}
      </li>
      ))}
      </ul>
      </div>
      );
    }
    */

/*

// Alternatively ( Using Spread )

export default function Alert({ type, data: { message, details = [] } }) {
  if (!message) return null;

  return (
    // <div className="alert alert--error">
    // convert className to a string interpolation
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details?.map((detail, index) => (
          <li key={index} className="alert__detail">
            {detail.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

*/

// Alternatively

export default function Alert({
  data: { message, details = [], type = "error" },
}) {
  if (!message) return null;

  return (
    // <div className="alert alert--error">
    // convert className to a string interpolation
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details?.map((detail, index) => (
          <li key={index} className="alert__detail">
            {detail.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
