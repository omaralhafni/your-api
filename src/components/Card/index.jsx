import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import './index.css';

export const Card = ({
    data = {},
    handelEditModal = () => { },
    setShowDelete = () => { }
}) => {

    return (
        <>
            <div className="product-card">
                <div className="control-buttons">
                    <div
                        className="control-buttons-icon border-green-700"
                        onClick={() => handelEditModal(data)}>
                        <AiFillEdit color="green" />
                    </div>
                    <div
                        className="control-buttons-icon border-red-600"
                        onClick={() => setShowDelete({ status: true, id: data?._id })}>
                        <AiOutlineDelete color="red" />
                    </div>
                </div>

                <img src={data?.imageBanner} alt="product" className="product-card-image" />

                <Link to={`/Product/${data?._id}`}>
                    <div className="relative px-4 -mt-16 mb-5 cursor-pointer">
                        <div className="bg-white py-2 px-6 rounded-lg shadow-lg">
                            <h4 className="card-name">{data?.name}</h4>
                            <p className="description">
                                {
                                    data?.description.length > 55 ?
                                        `${data?.description.slice(0, 55)} ... read more`
                                        :
                                        data?.description
                                }
                            </p>
                            <div className="product-card-tag">
                                {data?.category}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}