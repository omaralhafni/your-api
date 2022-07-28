import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ControlRecordModal } from "../Modals";
import "./index.css";

export const AddProduct = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <IoIosAddCircleOutline
                className="add-product-icon"
                onClick={() => setShowModal(true)} />
            <ControlRecordModal
                showModal={showModal}
                closeModal={() => setShowModal(false)} />
        </>
    )
}
