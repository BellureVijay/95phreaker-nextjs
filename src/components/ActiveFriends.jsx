"use client"
import React from "react";
import { useState, useEffect } from "react";
import apicall from "@/agent/ApiCall";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ConnectionContext } from "@/context/pageContext";

const ActiveFriends = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { refreshTrigger } = useContext(ConnectionContext);
    const router = useRouter();
    const fetchActiveFriends = async () => {
        setLoading(true);
        try {
            const response = await apicall.connections.GetFriends();
            setUsers(response);
            setError(null);
        } catch (err) {
            setError("Failed to fetch active friends");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchActiveFriends();
    }, [refreshTrigger]);
return (
    <div className="container mx-auto px-4 py-8">
        {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading Users...</p>
        ) : error ? (
            <p className="text-center text-red-600 text-lg font-medium">{error}</p>
        ) : users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.map((user) => (
                    <div
                        key={user.userId}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center text-2xl font-semibold mb-3">
                            {user.userName?.substring(0, 2).toUpperCase() || "U"}
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">{user.userName}</h2>
                        <div className="flex flex-col gap-2 w-full">
                            <button
                                onClick={async () => {
                                    const text = prompt(`Send a message to ${user.userName}:`);
                                    if (!text) return;
                                    try {
                                        await apicall.chat.sendMessage(user.userName, text);
                                        alert('Message sent');
                                    } catch (err) {
                                        console.error(err);
                                        alert('Failed to send message');
                                    }
                                }}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium"
                            >
                                Send Message
                            </button>
                            <button 
                                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-600 text-lg">No users found.</p>
        )}
    </div>
)
}

export default ActiveFriends
