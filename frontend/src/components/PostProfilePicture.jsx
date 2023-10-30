/* eslint-disable react/prop-types */
import { useState } from "react";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { createPortal } from "react-dom";
import CropEasy from "./crop/cropEasy";
import { updateProfilePicture } from "../services/Users";
import { userActions } from "../store/reducers/UserReducer";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

const PostProfilePicture = ({ avatar }) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const [openCrop, setOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null);

    const handlerFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto({ url: URL.createObjectURL(file), file });
        setOpenCrop(true);
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ token, formData }) => {
            return updateProfilePicture({
                token: token,
                formData: formData,
            });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            setOpenCrop(false);
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile Photo is removed");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete your profile picture")) {
            try {
                const formData = new FormData();
                formData.append("profilePicture", undefined);

                mutate({ token: userState.userInfo.token, formData: formData });
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }
    };

    return (
        <>
            {
                openCrop &&
                createPortal(
                    <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
                    document.getElementById("portal")
                )}
            <div className="w-full flex items-center gap-x-4 mb-6">
                <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden">
                    <label htmlFor="profilePicture" className="cursor-pointer absolute inset-0 bg-transparent rounded-full">
                        {avatar ? (
                            <img src={stables?.UPLOAD_FOLDER_BASE_URL + avatar} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex justify-center items-center bg-blue-50/50">
                                <HiOutlineCamera className="w-7 h-auto text-primary" />
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="profilePicture"
                        onChange={handlerFileChange}
                        className="sr-only"
                    />
                </div>
                <button
                    onClick={handleDeleteImage}
                    type="button"
                    className="border border-red-500 px-4 py-2 rounded-lg "
                >
                    Delete
                </button>
            </div>
        </>

    )
}

export default PostProfilePicture