import React, { useCallback, useContext, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { UserContext } from "../../../context";
import {
  deleteProductApi,
  fetchProductsForUser,
} from "../../../api/products.api";
import {
  ControlledCard,
  NoProducts,
  SearchInput,
  ControlRecordModal,
  DeleteModal,
  Loader,
} from "../../../components";
import "./index.css";

const initialModalValue = {
  name: "",
  description: "",
  category: "",
  images: [""],
  imageBanner: "",
};

const HomeDash = () => {
  const {
    userData: { userName },
  } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [controlSearch, setControlSearch] = useState(false);
  const [modalData, setModalData] = useState(initialModalValue);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState({ status: false, id: -1 });

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

  // handle edit data by modal
  const handelEditModal = (currentCardData = initialModalValue) => {
    console.log("🚀 ~ file: index.jsx:70 ~ handelEditModal ~ handelEditModal");
    setShowModal(true);
    if (currentCardData._id) {
      setModalData({ ...currentCardData, isEdit: true });
    } else {
      setModalData(initialModalValue);
    }
  };

  // handle edit item from page [state]
  const addItem = (newtData) => {
    data?.length / 12 !== 1 && setData((items) => [...items, newtData]);
  };

  // handle edit item from page [state]
  const editItem = (editData) => {
    setData(data.map((item) => (item._id === editData._id ? editData : item)));
  };

  // handle delete item from page [state]
  const deleteItem = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  // handle delete
  const handleDelete = async () => {
    setDeleteLoading(true);
    const { success } = await deleteProductApi(showDelete.id);
    if (success) {
      setShowDelete({ status: false, id: -1 });
      deleteItem(showDelete.id);
    }
    setDeleteLoading(false);
  };

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
        <IoIosAddCircleOutline
          className="add-product-icon"
          onClick={handelEditModal}
        />
        {data?.length > 0 ? (
          <>
            <section className="home-container">
              {data?.map((element, index) => (
                <ControlledCard
                  key={index}
                  data={element}
                  handelEditModal={handelEditModal}
                  setShowDelete={setShowDelete}
                />
              ))}
            </section>
            <div className="flex justify-center m-6 pb-24 lg:pb-0">
              {data?.length !== totalProducts && (
                <button
                  onClick={() => fetchDataByPageNum(numPages + 1)}
                  className="show-more-btn "
                >
                  SHOW MORE
                </button>
              )}
            </div>
            {/* delete modal */}
            <DeleteModal
              showModal={showDelete.status}
              isLoading={isDeleteLoading}
              closeModal={() => setShowDelete({ status: false, id: -1 })}
              confirm={() => handleDelete()}
            />
          </>
        ) : (
          <NoProducts />
        )}
        {/* update modal */}
        <ControlRecordModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          successModal={modalData._id ? editItem : addItem}
          modalData={modalData}
        />
      </Loader>
    </>
  );
};

export default HomeDash;
