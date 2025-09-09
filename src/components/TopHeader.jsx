'use client'
import Image from "next/image" 
import MainLogo from '../../public/images/logo.png'
import { useState, useRef, useEffect } from "react";
import { stringToColor } from "@/utility/color";
import Link from "next/link";


function TopHeader({user,handleLogoutConfirm}) {
  const userName = user?.name || "User";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const initials = userName
    .substring(0, 2)
    .toUpperCase();


  const avatarBg = stringToColor(userName);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-label="Open sidebar"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Image src={MainLogo} width={50} height={50} className="h-8 me-3" alt="95PhrEAKers Logo" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              PhrEAKers!
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative flex items-center ms-3" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-transparent rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-label="Open user menu"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <span
                    className={`w-10 h-10 flex items-center justify-center text-white text-lg border-2 border-white dark:border-gray-400  rounded-full ${avatarBg}`}
                  >
                    {initials}
                  </span>
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 top-8 mt-0 w-48 bg-white rounded-md shadow-lg z-50 dark:bg-gray-700">
                  <div className="py-2">
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      aria-label="User profile"
                    >
                     <Link href="/profile" >{userName}</Link>
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      aria-label="Profile Settings"
                    >
                      Profile Settings
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      aria-label="Logout"
                      onClick={handleLogoutConfirm}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopHeader
