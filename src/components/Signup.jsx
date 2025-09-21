'use client'
import React, { useState } from 'react'
import Image from "next/image"
import MainLogo from '../../public/images/logo.png'
import apicall from '@/agent/ApiCall'

const Signup = ({ setLoginType }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [step, setStep] = useState(1);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otp, setOtp] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',
        mobileNumber: ''
    });

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

      const handleInputChangeUserName = (e) => {
    const { name, value } = e.target;
    
    const isValidName = /^[a-zA-Z0-9]*$/.test(value);
    
    if (isValidName) {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' }); 
    } else {
      setErrors({ ...errors, [name]: 'username cannot contain special characters or spaces.' });
    }
  };
 
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
       
        const { email, password, userName, mobileNumber } = formData;

let validationError = "";

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email) {
    validationError = "Email is required.";
} else if (!emailRegex.test(email)) {
    validationError = "Please enter a valid email address.";
}

// Password validation
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
if (!password) {
    validationError = "Password is required.";
} else if (!passwordRegex.test(password)) {
    validationError = "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long.";
}

// Username validation (at least 3 chars, only letters & numbers allowed)
if (!userName) {
    validationError = "Username is required.";
} else if (userName.length < 3) {
    validationError = "Username must be at least 3 characters long.";
} else if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
    validationError = "Username can only contain letters, numbers, and underscores.";
}

// Mobile number validation (Indian style: 10 digits)
if (!mobileNumber) {
    validationError = "Mobile number is required.";
} else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
    validationError = "Please enter a valid 10-digit mobile number.";
}

if (validationError) {
    setError(validationError);
    return;
}


        try {
            const otpValue = generateOtp();
            setGeneratedOtp(otpValue);

            await apicall.EmailService.sendOtp(
                email,
                'Your OTP for Registration',
                `Your OTP is ${otpValue}. Please use this to complete your registration.`
            );

            setSuccess('OTP sent to your email. Please enter it below.');
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtpAndRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!otp) {
            setError('Please enter the OTP.');
            return;
        }
        if (otp !== generatedOtp) {
            setError('Invalid OTP.');
            return;
        }

        try {
            const { email, password, userName, mobileNumber } = formData;
            await apicall.authentication.register({
                email,
                password,
                userName,
                mobileNumber
            });
            setSuccess('Registration successful. You can now log in.');
            setTimeout(() => setLoginType("login"), 1500);
        } catch (error) {
            setError("Error " + (error?.response?.data?.error || "Registration failed. Please try again."));
        }
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl p-3 sm:p-6 shadow-xl flex flex-col items-center justify-center">
            <div className="w-full space-y-4 sm:space-y-6">
                <div>
                    <Image src={MainLogo} width={80} height={80} className="mx-auto h-12 w-12 sm:h-16 sm:w-25" alt="95PhrEAKers Logo" priority />
                    <h2 className="mt-4 text-center text-base sm:text-lg md:text-2xl font-extrabold text-gray-900">
                        Create new <span className="text-orange-400">account</span>
                    </h2>
                </div>
                {step === 1 && (
                    <form className="space-y-3 sm:space-y-4" onSubmit={handleSendOtp}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div>
                            <div className="mb-2">
                                <label htmlFor="userName" className="sr-only">UserName</label>
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    autoComplete="userName"
                                    required
                                    value={formData.userName}
                                    onChange={handleInputChangeUserName}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-t-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="User Name"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-t-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="mobileNumber" className="sr-only">Mobile Number</label>
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="text"
                                    autoComplete="mobileNumber"
                                    required
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-t-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your Mobile Number"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-b-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                            >
                                Send OTP
                            </button>
                            {error && (
                                <div className="mt-2 text-red-600 text-xs text-center">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="mt-2 text-green-600 text-xs text-center">
                                    {success}
                                </div>
                            )}
                        </div>
                        <div className="text-xs sm:text-sm text-right">
                            Already have an account? <span onClick={() => setLoginType("login")} className="text-blue-500 cursor-pointer font-bold hover:underline">Log in</span>!
                        </div>
                    </form>
                )}
               
                {step === 2 && (
                    <form className="space-y-3 sm:space-y-4" onSubmit={handleVerifyOtpAndRegister}>
                        <div className="mb-2">
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter OTP"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            Verify OTP & Register
                        </button>
                        <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 mt-2 border border-blue-600 text-xs sm:text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                            onClick={() => {
                                setStep(1);
                                setOtp('');
                                setError('');
                                setSuccess('');
                            }}
                        >
                            Back to Registration
                        </button>
                        {error && (
                            <div className="mt-2 text-red-600 text-xs text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mt-2 text-green-600 text-xs text-center">
                                {success}
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    )
    }

export default Signup