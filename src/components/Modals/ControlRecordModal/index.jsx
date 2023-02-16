import { useCallback, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { createProductApi, updateProductApi, uploadImage } from "../../../api";
import { useForm } from "../../../utils";
import { Input, ImageInput, Loader } from "../../index.js";
import { Modal } from "../Modal";
import "./index.css";

export const ControlRecordModal = ({
  showModal = false,
  closeModal = () => {},
  successModal = () => {},
  modalData = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, setValues } = useForm();

  const handleFirstCall = useCallback(() => {
    setValues(modalData);
  }, [modalData, setValues]);

  useEffect(() => {
    handleFirstCall();
  }, [handleFirstCall]);

  // handle change image and banner image form values
  const handleAddImage = async (e, index) => {
    setValues((dataValues) => ({
      ...dataValues,
      images: dataValues.images.map((item, i) =>
        index === i ? e.target.files[0] : item
      ),
    }));
  };

  // handle delete image
  const handleDeleteImage = useCallback(
    (index) => {
      setValues((dataValues) => ({
        ...dataValues,
        images: dataValues.images.filter((_, i) => index !== i),
      }));
    },
    [setValues]
  );

  // handle save and update modal values
  const saveModal = async () => {
    try {
      setIsLoading(true);

      let banner = values?.imageBanner;
      if (typeof values?.imageBanner !== "string") {
        banner = await uploadImage(values?.imageBanner);
      }

      let urlsImages = [];

      for (const element of values?.images) {
        if (element !== "" && typeof element !== "string") {
          const imagesData = await uploadImage(element);
          urlsImages = [...urlsImages, imagesData.data];
        } else {
          urlsImages = [...urlsImages, element];
        }
      }

      const savedData = {
        name: values.name,
        images: urlsImages.filter((item) => item !== ""),
        imageBanner: banner.data,
        description: values.description,
        category: values.category,
      };

      const { success, data } = modalData._id
        ? await updateProductApi(modalData._id, savedData)
        : await createProductApi(savedData);

      successModal(data);
      if (modalData._id) {
        closeModal();
      }

      if (success) {
        setValues({
          name: "",
          description: "",
          category: "",
          images: [""],
          imageBanner: "",
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      title={modalData?.isEdit ? "Edit a Record" : "Add a New Record"}
      closeModal={closeModal}
      saveModal={() => saveModal()}
    >
      <Loader loading={isLoading}>
        <form className="flex-auto p-4 lg:px-10 py-10 pt-0">
          <Input
            label="name"
            name="name"
            values={values}
            handleChange={handleChange}
            max={20}
          />

          <Input
            label="description"
            name="description"
            values={values}
            handleChange={handleChange}
            max={30}
          />

          <Input
            label="category"
            name="category"
            values={values}
            handleChange={handleChange}
            max={10}
          />

          {/* add banner image */}
          <label className="block m-2 text-sm font-medium text-gray-400">
            add banner image for record
          </label>

          <ImageInput
            image={values?.imageBanner}
            _id="banner"
            name="imageBanner"
            displayClose={values?.imageBanner !== ""}
            handleChange={handleChange}
            handleClose={() =>
              setValues((dataValues) => ({ ...dataValues, imageBanner: "" }))
            }
          />

          {/* add  images */}
          <label className="block m-2 text-sm font-medium text-gray-400">
            add images for record
          </label>
          <div className="flex flex-wrap gap-2">
            {values?.images?.map((item, index) => (
              <ImageInput
                image={item}
                _id={index}
                name="images"
                displayClose={values?.images.length > 1}
                handleClose={() => handleDeleteImage(index)}
                handleChange={(e) => handleAddImage(e, index)}
              />
            ))}
            {values?.images && values?.images.length < 5 && (
              <label
                className="image-label-empty"
                onClick={() =>
                  setValues((dataValuesX) => ({
                    ...dataValuesX,
                    images: [...dataValuesX?.images, ""],
                  }))
                }
              >
                <MdAdd className="text-gray-700 w-full h-full" />
              </label>
            )}
          </div>
        </form>
      </Loader>
    </Modal>
  );
};
