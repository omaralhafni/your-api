import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

import "./index.css";
import { ControlRecordModal } from "../Modals";

const AddProduct = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <IoIosAddCircleOutline
                className="add-product-icon"
                onClick={() => setShowModal(true)} />
            <ControlRecordModal showModal={showModal} closeModal={closeModal} />
        </>
    )
}

export default AddProduct