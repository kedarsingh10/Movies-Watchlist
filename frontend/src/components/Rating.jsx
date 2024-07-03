import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Rating = ({ value }) => {
  const [spans, setSpans] = useState([]);
  const generateSpans = () => {
    const newSpans = [];
    for (let i = 0; i < 5; i++) {
      newSpans.push(
        <span key={i} className="">
          {value >= i + 1 ? (
            <FaStar color="gold" />
          ) : value >= i + 0.5 ? (
            <FaStarHalfAlt color="gold" />
          ) : (
            <FaRegStar />
          )}
        </span>
      );
    }
    return newSpans;
  };

  useEffect(() => {
    setSpans(generateSpans());
  }, [value]);

  return (
    <div className="rating">
      {spans.map((span, index) => (
        <span key={index}> {span} </span>
      ))}
    </div>
  );
};

export default Rating;
