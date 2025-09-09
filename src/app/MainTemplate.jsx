'use client';
import Leftbar from "@/components/Leftbar";
import { usePathname } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PageContext } from "@/context/pageContext";
import { useState } from 'react';

export default function MainTemplate({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const [messages, setMessages] = useState([]);

    return (
        <>
        <PageContext.Provider value={{messages, setMessages}}>
            <GoogleOAuthProvider clientId="554114483740-pfvm2dn7808rab8c7qd4c05igvqgbqpp">
                <div className="flex flex-col min-h-screen sm:flex-row">
                    {!isLoginPage && <Leftbar />}
                    <main className={`flex-1${!isLoginPage ? ' p-4 sm:ml-64 sm:mt-16' : ''}`}>
                        {children}
                    </main>
                </div>
                <ToastContainer
                     position="bottom-right"
  autoClose={1500}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
                />
            </GoogleOAuthProvider>
        </PageContext.Provider>
        </>
    );
}