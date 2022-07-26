import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BsArrowBarRight } from 'react-icons/bs';
import { fetchSingleProductsForUser } from '../../api/products.api';
import { UserContext } from '../../context';

const Product = () => {
    const { userData: { userName } } = useContext(UserContext);
    const [productData, setProductData] = useState({});
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

    console.log('data', productData)


    return (
        <div className="w-full lg:h-[92vh] flex flex-col lg:flex-row justify-center items-center ">
            <div className="w-full lg:w-[40%] p-3">
                <h1 className="uppercase font-bold text-7xl my-9" >{productData.name}</h1>
                <h3 className="text-3xl my-4">{productData.description}</h3>

                <div className="product-card-tag">
                    {productData?.category}
                </div>
            </div>
            <div className="w-full lg:w-[60%] p-3">
                {images && images.map((item, index) =>
                    <div
                        onClick={() => setActive(index)}
                        className={`my-3 cursor-pointer w-full flex hover:drop-shadow-2xl ${index === active ? "h-[50vh]" : "h-8"} `}
                    >
                        <div className="w-[20%] flex justify-center items-center">
                            {index === active ?
                                <p className="flex justify-center items-center">
                                    {index === 0 ? "BANNER " : "IMAGE "}
                                    <BsArrowBarRight />
                                </p>
                                :
                                null
                            }
                        </div>
                        <div className="w-[80%] h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item})` }}
                        ></div>


                    </div>
                )}
            </div>
        </div>
    )
}

export default Product