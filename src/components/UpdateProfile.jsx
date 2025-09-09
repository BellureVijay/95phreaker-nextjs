import React, { useState } from 'react';
import Image from 'next/image';
import MainLogo from '../../public/images/logo.png';
import apicall from '@/agent/ApiCall';

const UpdatePassword = ({ setLoginType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const otpValue = generateOtp();
            setGeneratedOtp(otpValue);

            // Send OTP and email to backend to trigger email sending
            await apicall.EmailService.sendOtp(
                email,
                'Your OTP for Password Update',
                `Your OTP is ${otpValue}. Please use this to update your password.`
            );

            setSuccess('OTP sent to your email. Please enter it below.');
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
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
            await apicall.authentication.updateProfile({ email, password });
            setSuccess('Password updated and logged in successfully.');
            setTimeout(() => setLoginType("login"), 1500);
        } catch (err) {
            setError('Failed to update password.');
        }
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl p-3 sm:p-6 shadow-xl flex flex-col items-center justify-center">
            <div className="w-full space-y-4 sm:space-y-6">
                <div>
                    <Image src={MainLogo} width={120} height={80} className="mx-auto h-12 w-12 sm:h-16 sm:w-25" alt="95PhrEAKers Logo" priority />
                    <h2 className="mt-4 text-center text-base sm:text-lg md:text-2xl font-extrabold text-gray-900">
                        Update your <span className="text-orange-400">password</span>
                    </h2>
                </div>
                {step === 1 && (
                    <form className="space-y-3 sm:space-y-4" onSubmit={handleUpdatePassword}>
                        <div className="mb-2">
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="sr-only">New Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="New password"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            Send OTP
                        </button>
                           <button onClick={() => setLoginType("login")} className="w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                            Log In!
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
                {step === 2 && (
                    <form className="space-y-3 sm:space-y-4" onSubmit={handleVerifyOtp}>
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
                            Verify OTP and Update Password
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
    );
};

export default UpdatePassword;
