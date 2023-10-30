import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import MainLayout from "../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getUserProfile, updateUserProfile } from "../../services/Users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostProfilePicture from "../../components/PostProfilePicture";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/UserReducer";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state?.user);

    const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
    } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState?.userInfo?.token })
        },
        queryKey: ["profile"]
    })


    const { mutate, isLoading: updateProfileIsLoading } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return updateUserProfile({
                token: userState?.userInfo?.token,
                userData: { name, email, password }
            });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(['profile']);
            toast.success("Profile updated successfully");
            console.log(data);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    })

    useEffect(() => {
        if (!userState?.userInfo) {
            navigate("/");
        }
    }, [navigate, userState?.userInfo]);


    const { register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValue: {
            name: "",
            email: "",
            password: "",
        },
        values: useMemo(() => {
            return {
                name: profileLoading ? "" : profileData?.name,
                email: profileLoading ? "" : profileData?.email,
            }
        }, [profileData?.email, profileData?.name, profileLoading]),
        mode: "onBlur"
    })

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
    }



    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full mx-auto max-w-sm">
                    <PostProfilePicture avatar={profileData?.avatar} />
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="name" className="text-[#5A7184] font-semibold block">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    minLength: {
                                        value: 3,
                                        message: "Name length must be at least 3 character",
                                    },
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                })}
                                placeholder="Enter your name..."
                                className={`text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${errors.name ? "border-red-500" : "border-primary"}`}
                            />
                            {errors.name?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="email" className="text-[#5A7184] font-semibold block">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                {...register("email", {
                                    pattern: {
                                        value:
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Enter a valid email",
                                    },
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                })}
                                placeholder="Enter your E-mail..."
                                className={`text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${errors.email ? "border-red-500" : "border-primary"}`}
                            />
                            {errors.email?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="password" className="text-[#5A7184] font-semibold block">
                                New Password (optional)
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password")}
                                placeholder="Enter your new password..."
                                className={`text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${errors.password ? "border-red-500" : "border-primary"}`}
                            />
                            {errors.password?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!isValid || profileLoading || updateProfileIsLoading || profileError}
                            className="font-bold font-roboto text-lg py-4 px-8 rounded-lg w-full my-6 bg-primary text-white hover:bg-black disabled:cursor-not-allowed"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </MainLayout>
    )
}

export default ProfilePage