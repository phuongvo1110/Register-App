import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
function Login() {
    const { loginUser } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8083/api/v1/session/signin",
                data
            );
            loginUser(response.data.data);
            navigate("/");
        } catch (error) {
            if (error) {
                setErrorMessage(error.response.data.message);
                console.log(errorMessage);
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            // Redirect user to Google's OAuth sign-in
            window.location.href =
                "http://localhost:8083/api/v1/session/google/signin";
        } catch (error) {
            console.error("Google Sign-In error:", error);
            alert("Failed to initiate Google Sign-In. Please try again.");
        }
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-xs">
                                    {errorMessage}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Login
                            </button>
                        </form>
                        <div className="px-6 sm:px-0 max-w-sm">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                            >
                                <svg
                                    className="mr-2 -ml-1 w-4 h-4"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="google"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                    ></path>
                                </svg>
                                Sign up with Google<div></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
