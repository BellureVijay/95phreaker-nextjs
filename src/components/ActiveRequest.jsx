'use client'
import React, {useState, useEffect,useContext } from 'react'
import apicall from "@/agent/ApiCall";
import { ConnectionContext } from '@/context/pageContext';
import { toast } from "react-toastify";
const ActiveRequest = () => {
  const[users, setUsers] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  const{ refreshTrigger,setRefreshTrigger } = useContext(ConnectionContext);
  const fetchActiveRequests = async () => {
    setLoading(true);
    try {
      const response = await apicall.connections.activeRequests();
      setUsers(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch active requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (username) => {
    try {
      await apicall.connections.acceptRequest(username);
      toast.info(`You and ${username} are friends now`);
      fetchActiveRequests();
      setRefreshTrigger(preconnect => !preconnect); 
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Failed to accept friend request");
    }
  }

  useEffect(() => {
    fetchActiveRequests();
  }, [refreshTrigger]);

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
                  onClick={() => handleAcceptRequest(user.userName)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold"
                >
                  Accept Request
                </button>
                <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
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
  );
}

export default ActiveRequest
