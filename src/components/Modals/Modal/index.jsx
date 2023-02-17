import { RiCloseFill } from "react-icons/ri";
import "./index.css";

export const Modal = ({
  showModal = false,
  title = "",
  closeModal = () => {},
  saveModal = () => {},
  children = null,
}) => {
  return (
    showModal && (
      <>
        <div
          className="container-modal"
          onClick={(e) => e.target === e.currentTarget && closeModal(false)}
        >
          <div className="relative w-auto my-6 mx-auto min-w-[50%] max-w-[80%]">
            {/*content*/}
            <div className="content-modal">
              {/*header*/}
              <div className="header-modal">
                <h3 className="text-2xl md:text-3xl font-semibold dark:text-gray-300 uppercase">
                  {title}
                </h3>
                <button className="btn-close-modal-x" onClick={closeModal}>
                  <RiCloseFill className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              {/*body*/}
              <div className="relative lg:px-6 lg:pt-2 flex-a uto">
                {children}
              </div>
              {/*footer*/}
              <div className="footer-modal">
                <button
                  className="btn-modal text-red-500 background-transparent "
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="btn-modal text-white "
                  type="button"
                  onClick={saveModal}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-bg-shadow" />
      </>
    )
  );
};
