import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BsArrowBarDown } from 'react-icons/bs';
import { fetchSingleProductsForUser } from '../../api/products.api';
import { UserContext } from '../../context';

const Product = () => {
    const { userData: { userName } } = useContext(UserContext);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        category: ""
    });
    const [images, setImages] = useState([]);
    const [active, setActive] = useState(0);
    let { productId } = useParams();

    const fetchData = useCallback(async () => {
        const { data } = await fetchSingleProductsForUser(userName, productId);
        setProductData(data);
        setImages([data?.imageBanner, ...data?.images]);
    }, [productId, userName])


    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div className="w-full lg:h-[92vh] flex flex-col lg:flex-row justify-center items-center ">
            <div className="w-full lg:w-[40%] p-3">
                <h1 className="uppercase font-bold text-3xl lg:text-7xl my-9" >{productData.name}</h1>
                <h3 className="text-2xl lg:text-3xl my-4">{productData.description}</h3>

                <div className="product-card-tag">
                    {productData?.category}
                </div>
            </div>
            <div className="w-full lg:w-[60%] p-3">
                {images && images.map((item, index) =>
                    <div
                        onClick={() => setActive(index)}
                        className={`my-3 cursor-pointer w-full flex flex-col lg:flex-row hover:drop-shadow-2xl`}
                    >
                        <div className="w-full lg:w-[20%] my-3 flex justify-center items-center">
                            {index === active ?
                                <p className="flex flex-col lg:flex-row  justify-center items-center text-center">
                                    {index === 0 ? "BANNER " : "IMAGE "}
                                    <BsArrowBarDown className="lg:-rotate-90" />
                                </p>
                                :
                                null
                            }
                        </div>
                        <div className={`w-full lg:w-[80%] h-full bg-cover bg-center ${index === active ? "h-[50vh]" : "h-8"}`}
                            style={{ backgroundImage: `url(${item})` }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Product