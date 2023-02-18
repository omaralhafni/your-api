import { BsImages } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";

export const ImageInput = ({
  image = "",
  _id = "",
  name = "",
  displayClose = false,
  handleChange = () => {},
  handleClose = () => {},
}) => {
  return (
    <div className="w-24 h-24 rounded-lg overflow-hidden relative">
      {displayClose && (
        <RiCloseFill
          onClick={handleClose}
          className={
            image === ""
              ? "hidden"
              : "absolute p-1 right-1 top-1 text-2xl text-red-300 hover:text-red-600 cursor-pointer"
          }
        />
      )}
      {image === "" || image === undefined ? (
        <label htmlFor={`image${_id}`} className="image-label">
          <BsImages className="text-white w-full h-full" />
          <input
            type="file"
            className="hidden"
            id={`image${_id}`}
            name={name}
            onChange={handleChange}
          />
        </label>
      ) : (
        <img
          src={typeof image == "string" ? image : URL.createObjectURL(image)}
          className="w-full h-full"
          alt="upload"
        />
      )}
    </div>
  );
};
