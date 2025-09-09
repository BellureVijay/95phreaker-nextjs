'use client'
import React from 'react'
import { useState, useEffect,useContext } from 'react'
import apicall from "@/agent/ApiCall";
import { ConnectionContext } from '@/context/pageContext';

const SentRequests = () => {
    const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const{ refreshTrigger } = useContext(ConnectionContext);
    const fetchSentRequests = async () => {
        setLoading(true);
        try {
            const response = await apicall.connections.sentRequests();
            setUsers(response);
            setError(null);
        } catch (err) {
            setError("Failed to fetch sent requests");
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchSentRequests();
    },[refreshTrigger])
return (
    <div className="container mx-auto px-4 py-8">
        {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading Users...</p>
        ) : error ? (
            <p className="text-center text-red-600 text-lg font-medium">{error}</p>
        ) : users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.userId}
                        className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold mb-4">
                            {user.userName?.substring(0, 2).toUpperCase() || "U"}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{user.userName}</h2>
                        <div className="flex flex-col gap-2 mt-4 w-full">
                            <button 
                                disabled
                                className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
                            >
                                Requested
                            </button>
                            <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium">
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

export default SentRequests
