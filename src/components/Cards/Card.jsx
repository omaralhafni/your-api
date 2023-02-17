import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Card = ({ data = {}, userName = "" }) => {
  return (
    <div className="product-card">
      <img
        src={data?.imageBanner}
        alt="product"
        className="product-card-image"
      />
      <Link to={`/public/${userName}/${data?._id}`}>
        <div className="relative px-4 -mt-16 mb-5 cursor-pointer">
          <div className="bg-white py-2 px-6 rounded-lg shadow-lg cursor-pointer">
            <h4 className="card-name">{data?.name}</h4>
            <p className="description">
              {data?.description.length > 55
                ? `${data?.description.slice(0, 55)} ... read more`
                : data?.description}
            </p>
            <div className="product-card-tag">{data?.category}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
