import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsForUser } from "../../../api/products.api";
import { Card, Loader, NoProducts, SearchInput } from "../../../components";

const PublicUserPage = () => {
  const { userName } = useParams();
  const [data, setData] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [controlSearch, setControlSearch] = useState(false);

  // function fetch first data
  const fetchData = useCallback(async () => {
    const {
      data: { products, total },
    } = await fetchProductsForUser(userName);
    setData(products);
    setTotalProducts(total);
    setIsLoading(false);
    setControlSearch(false);
  }, [userName]);

  // effect for fetch page data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // function fetch page data
  const fetchDataByPageNum = useCallback(
    async (num) => {
      const {
        data: { products, total },
      } = await fetchProductsForUser(userName, { numPages: num });
      setNumPages(num);
      setData((oldData) => [...oldData, ...products]);
      setTotalProducts(total);
    },
    [userName]
  );

  // handle search from products
  const handleSearch = async (e, searchKey) => {
    e.preventDefault();
    setIsLoading(true);
    setControlSearch(true);
    setNumPages(0);
    const {
      data: { products, total },
    } = await fetchProductsForUser(userName, { numPages, keyword: searchKey });
    setData(products);
    setTotalProducts(total);
    setIsLoading(false);
  };

  return (
    <>
      <SearchInput
        handleSearch={handleSearch}
        fetchData={fetchData}
        controlSearch={controlSearch}
      />
      <Loader loading={isLoading}>
        {data.length > 0 ? (
          <>
            <section className="home-container">
              {data?.map((element, index) => (
                <Card key={index} data={element} userName={userName} />
              ))}
            </section>
            <div className="flex justify-center m-6 pb-24 lg:pb-0">
              {data.length !== totalProducts && (
                <button
                  onClick={() => fetchDataByPageNum(numPages + 1)}
                  className="show-more-btn "
                >
                  SHOW MORE
                </button>
              )}
            </div>
          </>
        ) : (
          <NoProducts />
        )}
      </Loader>
    </>
  );
};

export default PublicUserPage;
