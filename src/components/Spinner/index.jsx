import React from "react";
import "./index.css";

export const Spinner = ({ customerStyle = "" }) => {
  return (
    <div className={customerStyle}>
      <div className="spinner">
        <div className="spinner spinner2">
          <div className="spinner spinner3"></div>
        </div>
      </div>
    </div>
  );
};
