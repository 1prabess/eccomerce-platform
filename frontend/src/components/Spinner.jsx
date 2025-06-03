import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="relative mx-auto mt-[10rem] h-16 w-16">
      <div id="sq1" className="square"></div>
      <div id="sq2" className="square"></div>
      <div id="sq3" className="square"></div>
      <div id="sq4" className="square"></div>
      <div id="sq5" className="square"></div>
      <div id="sq6" className="square"></div>
      <div id="sq7" className="square"></div>
      <div id="sq8" className="square"></div>
      <div id="sq9" className="square"></div>
    </div>
  );
};

export default Spinner;
