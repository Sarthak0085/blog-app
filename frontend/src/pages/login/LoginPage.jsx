import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import MainLayout from "../../components/MainLayout";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/Users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userActions } from "../../store/reducers/UserReducer";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector((state) => state.user);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return login({ email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            console.log(data);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    })

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const { register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValue: {
            email: "",
            password: "",
        },
        mode: "onBlur"
    })

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password })
    }



    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full mx-auto max-w-sm">
                    <h1 className="font-roboto font-bold text-dark-hard mb-8 text-2xl text-center">Login</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
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
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password length must be at least 8 characters",
                                    },
                                })}
                                placeholder="Enter your password..."
                                className={`text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${errors.password ? "border-red-500" : "border-primary"}`}
                            />
                            {errors.password?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <Link
                            to="/forgot-password"
                            className="text-sm font-semibold text-primary underline"
                        >
                            Forgot Password
                        </Link>
                        <button
                            type="submit"
                            disabled={!isValid || isLoading}
                            className="font-bold font-roboto text-lg py-4 px-8 rounded-lg w-full my-6 bg-primary text-white hover:bg-black disabled:cursor-not-allowed"
                        >
                            Sign In
                        </button>
                        <p className="text-sm font-semibold text-[#5A7184] opacity-90">
                            Don`t have an account? <Link to="/register" className="text-primary underline ">Register</Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    )
}

export default LoginPage