import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowBarDown } from "react-icons/bs";
import { UserContext } from "../../../context";
import { fetchSingleProductsForUser } from "../../../api/products.api";
import "./index.css";
import { Loader } from "../../../components";

const Product = () => {
  const {
    userData: { userName },
  } = useContext(UserContext);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  // fetch product data
  const fetchData = useCallback(async () => {
    const { data } = await fetchSingleProductsForUser(
      userName || params?.userName,
      params?.productId
    );
    setProductData(data);
    setImages([data?.imageBanner, ...data?.images]);
    setIsLoading(false);
  }, [params?.productId, params?.userName, userName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Loader loading={isLoading}>
      <div className="product-container">
        <div className="w-full lg:w-[40%] p-3">
          <h1 className="product-title">{productData.name}</h1>
          <h3 className="text-2xl lg:text-3xl my-4">
            {productData.description}
          </h3>

          <div className="product-card-tag">{productData?.category}</div>
        </div>
        <div className="w-full lg:w-[60%] p-3">
          {images &&
            images.map((item, index) => (
              <div onClick={() => setActive(index)} className="product-image">
                <div className="w-full lg:w-[20%] my-3 flex justify-center items-center">
                  {index === active ? (
                    <p className="product-image-description">
                      {index === 0 ? "BANNER " : "IMAGE "}
                      <BsArrowBarDown className="lg:-rotate-90" />
                    </p>
                  ) : null}
                </div>
                <div
                  className={`w-full lg:w-[80%] h-full bg-cover bg-center ${
                    index === active ? "h-[50vh]" : "h-8"
                  }`}
                  style={{ backgroundImage: `url(${item})` }}
                />
              </div>
            ))}
        </div>
      </div>
    </Loader>
  );
};

export default Product;
