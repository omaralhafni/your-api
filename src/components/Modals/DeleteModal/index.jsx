import { RiCloseFill, RiErrorWarningLine } from "react-icons/ri";
import "./index.css";

export const DeleteModal = ({
    showModal = false,
    closeModal = () => { },
    confirm = () => { }
}) => {

    return (
        showModal ? (
            <>
                <div
                    className="container-modal"
                    onClick={(e) => e.target === e.currentTarget && closeModal(false)}
                >
                    <div className="h-full w-full max-w-md p-4 md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="btn-close-modal-x"
                                onClick={closeModal}
                            >
                                <RiCloseFill className="h-5 w-5 text-gray-400" />
                            </button>
                            <div className="p-6 text-center">
                                <RiErrorWarningLine className="h-16 w-16 text-gray-400 m-auto mb-5" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button
                                    type="button"
                                    className="btn-save-modal bg-red-600 "
                                    onClick={confirm}>
                                    Yes, I'm sure
                                </button>
                                <button
                                    type="button"
                                    className="btn-close-delete-modal"
                                    onClick={closeModal}>No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-bg-shadow" />
            </>
        ) : null
    )
}