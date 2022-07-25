import React, { useCallback, useContext, useEffect, useState } from 'react'
import { fetchProductsForUser } from '../../api/products.api';
import { AddProduct, Card, NoProducts, SearchInput, Spinner } from '../../components';
import { UserContext } from '../../context';

const Home = () => {
    const { userData: { userName } } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [controlSearch, setControlSearch] = useState(false);

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

    // handle edit item from page [state]
    const editItem = (editData) => {
        setData(data.map(item => item._id === editData._id ? editData : item));
    }

    // handle delete item from page [state]
    const deleteItem = (id) => {
        setData(data.filter(item => item._id !== id));
    }

    // handle search from products
    const handleSearch = async (e, searchKey) => {
        e.preventDefault();
        setControlSearch(true)
        setIsLoading(true);
        setNumPages(0);
        const { data: { products, total } } = await fetchProductsForUser(userName, { numPages, keyword: searchKey });
        setData(products);
        setTotalProducts(total);
        setIsLoading(false);
    }

    return (
        <>
            <AddProduct />

            <SearchInput handleSearch={handleSearch} fetchData={fetchData} controlSearch={controlSearch} />
            {
                isLoading ?
                    <div className="w-full h-full p-10">
                        <Spinner color="#374151" />
                    </div>
                    :


                    data.length > 0 ?
                        <>
                            {/* <section className={`container mx-auto flex flex-col flex-wrap items-center md:h-[2700px] lg:h-[${1450}px] `} > */}
                            <section className={`container mx-auto grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-4`} >
                                {data?.map((element, index) =>
                                    <Card
                                        key={index}
                                        data={element}
                                        deleteItem={deleteItem}
                                        editItem={editItem}
                                    />
                                )}
                            </section>
                            {/* </div> */}
                            <div className="flex justify-center m-6 pb-24 lg:pb-0" >
                                {data.length !== totalProducts &&
                                    <button
                                        onClick={() => fetchDataByPageNum(numPages + 1)}
                                        className="bg-transparent w-30 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Show More
                                    </button>
                                }
                            </div>
                        </>
                        : <NoProducts />


            }
        </>
    )
}

export default Home;