export const Modal = ({ showModal, closeModal, saveModal, children }) => {

    return (
        showModal ? (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mi"
                >
                    <div className="relative w-auto my-6 mx-auto min-w-[50%] max-w-[80%]">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
                            {/*header*/}
                            <div className="flex items-start justify-between p-2 px-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold dark:text-gray-300">
                                    Add a New Record
                                </h3>
                                <button
                                    className=""
                                    onClick={() => closeModal(false)}
                                >
                                    <span className=" dark:text-gray-300 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative lg:px-6 lg:pt-2 flex-a uto">
                                {children}
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => closeModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-slate-700 text-white active:bg-slate-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => saveModal(false)}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null
    )
}
