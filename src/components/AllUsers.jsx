'use client';

import apicall from "@/agent/ApiCall";
import { useEffect, useState,useContext } from 'react';
import { ConnectionContext } from '@/context/pageContext';
import { toast} from "react-toastify";
const AllUsers = () => {
 const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const{setRefreshTrigger } = useContext(ConnectionContext);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apicall.user.getAllUser();
      setUsers(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFriendRequest = async (userName) => {
    try {
      await apicall.connections.sendRequest(userName);
      fetchUsers();
      setRefreshTrigger(prev=>!prev); // Toggle the refresh trigger to update the UI
      toast.success(`Friend request sent to ${userName}`);
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Failed to send friend request");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading Users...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg font-medium">{error}</p>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <div
              key={user.userId}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-semibold">
                  {user.userName?.substring(0, 2).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{user.userName}</h2>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleFriendRequest(user.userName)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
                >
                  Send Friend Request
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm font-medium transition-colors">
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
};

export default AllUsers;
