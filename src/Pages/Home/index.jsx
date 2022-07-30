import React, { useCallback, useContext, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { UserContext } from "../../context";
import { deleteProductApi, fetchProductsForUser } from "../../api/products.api";
import { Card, NoProducts, SearchInput, Spinner, ControlRecordModal, DeleteModal } from "../../components";
import "./index.css";
const Home = () => {
    const { userData: { userName } } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [controlSearch, setControlSearch] = useState(false);

    const [modalData, setModalData] = useState({
        name: "",
        description: "",
        category: "",
        images: [""],
        imageBanner: ""
    });
    const [modalType, setModalType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState({ status: false, id: -1 });


    // function fetch first data
    const fetchData = useCallback(async () => {
        const { data: { products, total } } = await fetchProductsForUser(userName);
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
    const fetchDataByPageNum = useCallback(async (num) => {
        const { data: { products, total } } = await fetchProductsForUser(userName, { numPages: num });
        setNumPages(num)
        setData((oldData) => [...oldData, ...products]);
        setTotalProducts(total);
    }, [userName]);

    // handle add modal 
    const handleAddProduct = () => {
        setShowModal(true);
        setModalType("add");
        setModalData({
            name: "",
            description: "",
            category: "",
            images: [""],
            imageBanner: ""
        });
    }

    // handle edit data by modal
    const handelEditModal = (currentCardData) => {
        setModalType("edit");
        setModalData(currentCardData);
        setShowModal(true);
    }

    // handle edit item from page [state]
    const addItem = (newtData) => {
        data.length / 12 !== 1 && setData(items => ([...items, newtData]));
    }

    // handle edit item from page [state]
    const editItem = (editData) => {
        setData(data.map(item => item._id === editData._id ? editData : item));
    }

    // handle delete item from page [state]
    const deleteItem = (id) => {
        setData(data.filter(item => item._id !== id));
    }

    // handle delete
    const handleDelete = async () => {
        const { success } = await deleteProductApi(showDelete.id);
        if (success) {
            setShowDelete({ status: false, id: -1 });
            deleteItem(showDelete.id)
        }
    }

    // handle search from products
    const handleSearch = async (e, searchKey) => {
        e.preventDefault();
        setIsLoading(true);
        setControlSearch(true)
        setNumPages(0);
        const { data: { products, total } } = await fetchProductsForUser(userName, { numPages, keyword: searchKey });
        setData(products);
        setTotalProducts(total);
        setIsLoading(false);
    }

    return (
        <>
            <IoIosAddCircleOutline
                className="add-product-icon"
                onClick={() => handleAddProduct()}
            />

            <SearchInput handleSearch={handleSearch} fetchData={fetchData} controlSearch={controlSearch} />
            {
                isLoading ?
                    <div className="w-full h-full p-10">
                        <Spinner color="#374151" />
                    </div>
                    :
                    data.length > 0 ?
                        <>
                            <section className="home-container" >
                                {data?.map((element, index) =>
                                    <Card
                                        key={index}
                                        data={element}
                                        editItem={editItem}
                                        handelEditModal={handelEditModal}
                                        deleteItem={deleteItem}
                                        setShowDelete={setShowDelete}
                                    />
                                )}
                            </section>
                            <div className="flex justify-center m-6 pb-24 lg:pb-0" >
                                {data.length !== totalProducts &&
                                    <button
                                        onClick={() => fetchDataByPageNum(numPages + 1)}
                                        className="show-more-btn ">
                                        Show More
                                    </button>
                                }
                            </div>

                            {/* update modal */}
                            <ControlRecordModal
                                showModal={showModal}
                                closeModal={() => setShowModal(false)}
                                successModal={modalType === "edit" ? editItem : addItem}
                                modalType={modalType}
                                modalData={modalData}
                            />
                            {/* delete modal */}
                            <DeleteModal
                                showModal={showDelete.status}
                                closeModal={() => setShowDelete({ status: false, id: -1 })}
                                confirm={() => handleDelete()}
                            />
                        </>
                        : <NoProducts />
            }
        </>
    )
}

export default Home;