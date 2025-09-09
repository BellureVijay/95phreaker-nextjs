'use client'
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import ForgotPassword from "@/components/UpdateProfile";
import { useState } from "react";

const LoginPage = () => {
    const[loginType, setLoginType] = useState("login");
    return (
        <div className="min-h-screen bg-blue-100 flex flex-col">
            <div className="w-full">
                {(loginType === "signup" || loginType === "forgotpassword") ? (
                    <h4 className="text-center text-xs sm:text-sm md:text-base bg-blue-500 text-white py-2 px-2 shadow-md">
                        Already have an account{" "}
                        <span
                            onClick={() => setLoginType("login")}
                            className="underline decoration-2 cursor-pointer hover:text-blue-100 font-bold"
                        >
                            Log In
                        </span>
                    </h4>
                ) : (
                    <h4 className="text-center text-xs sm:text-sm md:text-base bg-blue-500 text-white py-2 px-2 shadow-md">
                        If you're new here please{" "}
                        <span
                            onClick={() => setLoginType("signup")}
                            className="underline decoration-2 cursor-pointer hover:text-blue-100 font-bold"
                        >
                            sign up
                        </span>
                    </h4>
                )}
            </div>
            <section className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto gap-4 sm:gap-6 md:gap-10">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mb-4 md:mb-0 px-2">
                        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 text-center md:text-left">
                            Welcome Back!
                        </h1>
                        <span className="text-xs sm:text-base md:text-xl text-gray-700 text-center md:text-left">
                            Connect with <span className="text-orange-400 font-bold">Coders</span> Around the world on 95PhrEAKers!
                        </span>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        {loginType === "signup" ? (
                            <Signup setLoginType={setLoginType} />
                        ) : loginType === "login" ? (
                            <Login setLoginType={setLoginType} />
                        ) : (
                            <ForgotPassword setLoginType={setLoginType} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage
