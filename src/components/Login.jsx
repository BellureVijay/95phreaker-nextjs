'use client'
import React, { useState } from 'react'
import Image from "next/image"
import MainLogo from '../../public/images/logo.png'
import { useRouter } from "next/navigation";
import apicall from "@/agent/ApiCall";
import { jwtDecode } from "jwt-decode"
import { Eye, EyeOff,LoaderCircle } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'

const Login = ({ setLoginType }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const[loader, setLoader]=useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        try {
            setLoader(true);
            const response = await apicall.authentication.login({
                email,
                password
            });
            const user = jwtDecode(response?.access_Token);
            document.cookie = `token=${response?.access_Token}; path=/; max-age=3600`;
            localStorage.setItem("user", JSON.stringify(user));
            router.push('/');
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials.");
        }
        finally{
            setLoader(false);
        }
    }
    const handleGoogleSuccess = async (googleUser) => {
    try {
        const user = jwtDecode(googleUser?.credential);

        const response =await apicall.authentication.register({
            email: user.email,
            password: user.sub,
            userName:  (user.email.split('@')[0]),
            mobileNumber: "0000000000",
            isGoogleUser: true
        });


        document.cookie = `token=${response?.access_Token}; path=/; max-age=3600`;
        localStorage.setItem("user", JSON.stringify(jwtDecode(response?.access_Token)));
        router.push('/');
    } catch (error) {
        console.error("Google Sign-In failed:", error);
        setError("Google Sign-In failed. Please try again.");
    }
};




    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl p-3 sm:p-6 shadow-xl flex flex-col items-center justify-center">
            <div className="w-full space-y-4 sm:space-y-6">
                <div>
                    <Image src={MainLogo} width={80} height={80} className="mx-auto h-12 w-12 sm:h-16 sm:w-25" alt="95PhrEAKers Logo" priority />
                    <h2 className="mt-4 text-center text-base sm:text-lg md:text-2xl font-extrabold text-gray-900">
                        Sign in to your <span className="text-orange-400">account</span>
                    </h2>
                </div>
                <form className="space-y-3 sm:space-y-4" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <div className="mb-2">
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-t-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="mb-2 relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-b-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <Eye color="black" size={20} />
                                ) : (
                                    <EyeOff color="black" size={18} />
                                )}
                            </button>
                        </div>
                        <div
                            onClick={() => { setLoginType("forgotPassword") }}
                            className="text-xs sm:text-sm text-gray-600 cursor-pointer"
                        >
                            Forgot your password? <span className="text-blue-500 hover:underline">Click here</span> to reset it.
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                            >
                            {loader ?
                                <LoaderCircle id='circle'/>:
                         "Log In"}
                        </button>
                        {error && (
                            <div className="mt-2 text-red-600 text-xs text-center">
                                {error}
                            </div>
                        )}
                    </div>
                    <div className="text-xs sm:text-sm text-right mt-2">
                        Don't have an account? <span onClick={() => setLoginType("signup")} className="text-blue-500 cursor-pointer font-bold hover:underline">Sign up</span> now!
                    </div>
                    <hr />
                    <div className="flex justify-center mt-2">
                        <GoogleLogin
                            logo_alignment="center"
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                setError("Google Sign-In failed. Please try again.");
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
