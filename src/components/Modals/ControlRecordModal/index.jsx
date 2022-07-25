import { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { createProductApi, updateProductApi, uploadImage } from "../../../api";
import { Input } from "../../Input";
import { Spinner } from "../../Spinner";
import { Modal } from "../Modal";

export const ControlRecordModal = ({ showModal, closeModal, successModal, modalType, modalData }) => {
    const [values, setValues] = useState({});
    const [images, setImages] = useState([""]);
    const [imageBanner, setImageBanner] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // handel states if modal form edit
    useEffect(() => {
        if (modalType === "edit") {
            setValues({
                name: modalData?.name,
                description: modalData?.description,
                category: modalData?.category
            });
            setImages(modalData?.images || [""]);
            setImageBanner(modalData?.imageBanner || "");
        }
    }, [modalData, modalType]);

    // handle change inputs values
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(values => ({ ...values, [name]: value }));
    }

    // handle change image and banner image form values
    const handleAddImage = async (e, i, type) => {
        type === "banner" ?
            setImageBanner(e.target.files[0])
            :
            setImages(images.map((item, index) => i === index ? e.target.files[0] : item))
    }

    // handle delete image
    const handleDeleteImage = (i) => {
        setImages(images.filter((_, index) => i !== index))
    }

    // handle save and update modal values
    const saveModal = async () => {
        try {
            setIsLoading(true)

            let banner = imageBanner
            if (typeof imageBanner !== 'string') {
                banner = await uploadImage(imageBanner);
            }

            let urlsImages = []

            for (const element of images) {
                if (element !== '' && typeof element !== 'string') {
                    const imagesData = await uploadImage(element);
                    urlsImages = [...urlsImages, imagesData.data];
                } else {
                    urlsImages = [...urlsImages, element];
                }
            }

            const savedData = {
                "name": values.name,
                "images": urlsImages.filter((item) => item !== ''),
                "imageBanner": banner.data,
                "description": values.description,
                "category": values.category
            }

            const { success, data } = modalType === "edit" ?
                await updateProductApi(modalData._id, savedData)
                :
                await createProductApi(savedData)

            if (modalType === "edit") {
                successModal(data);
                closeModal()
            }

            if (success) {
                setValues({});
                setImages(['']);
                setImageBanner('')
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <Modal showModal={showModal} closeModal={closeModal} saveModal={saveModal}>
            {isLoading ?
                <div className="w-full h-full p-10" >
                    <Spinner />
                </div>
                :
                <form className="flex-auto p-4 lg:px-10 py-10 pt-0">
                    <Input
                        label="name"
                        name="name"
                        values={values}
                        handleChange={handleChange}
                    />

                    <Input
                        label="description"
                        name="description"
                        values={values}
                        handleChange={handleChange}
                    />

                    <Input
                        label="category"
                        name="category"
                        values={values}
                        handleChange={handleChange}
                    />

                    {/* add banner image */}
                    <label className="block m-2 text-sm font-medium text-gray-400">add banner image for record</label>
                    <div className="w-24 h-24 rounded-lg overflow-hidden relative">
                        <span onClick={() => setImageBanner('')} className={imageBanner === "" ? "hidden" : "absolute p-1 right-2 text-red-300 cursor-pointer"}>x</span>
                        {
                            imageBanner === '' ?
                                <label onChange={(e) => handleAddImage(e, '', 'banner')} htmlFor="banner_images" className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-5">
                                    <BsImages className="text-white w-full h-full" />
                                    <input
                                        id="banner_images"
                                        type="file"
                                        className="hidden"

                                    />
                                </label>
                                :
                                <img src={typeof imageBanner == 'string' ? imageBanner : URL.createObjectURL(imageBanner)} alt="upload" className="w-full h-full" />
                        }
                    </div>

                    {/* add  images */}
                    <label className="block m-2 text-sm font-medium text-gray-400">add images for record</label>
                    <div className="flex flex-wrap gap-2">
                        {images.map((item, index) =>
                            <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative">
                                <span onClick={() => handleDeleteImage(index)} className="absolute p-1 right-2 text-red-300 cursor-pointer">x</span>
                                {
                                    item === '' ?
                                        <label onChange={(e) => handleAddImage(e, index)} htmlFor={`_images_${index}`} className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-5">
                                            <BsImages className="text-white w-full h-full" />
                                            <input
                                                id={`_images_${index}`}
                                                type="file"
                                                className="hidden"

                                            />
                                        </label>
                                        :
                                        <img src={typeof item == 'string' ? item : URL.createObjectURL(item)} alt="upload" className="w-full h-full" />
                                }
                            </div>
                        )}
                        {
                            images.length < 5 ?
                                <label className="flex flex-col justify-center items-center w-24 h-24 bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer divide-dashed hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-100 p-5"
                                    onClick={() => setImages([...images, ''])}
                                >
                                    <MdAdd className="text-gray-700 w-full h-full" />
                                </label>
                                : null
                        }
                    </div>
                </form>
            }

        </Modal>
    )
}