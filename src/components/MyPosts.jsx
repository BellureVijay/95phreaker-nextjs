'use client'
import apicall from '@/agent/ApiCall'
import React, { useEffect, useState, useCallback } from 'react'
import { postCreatedtimeAgo } from '@/utility/DateTimeUtility'

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apicall.PostingService.getPosts();
      setPosts(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts,error]);

  const handleDeletePost = async (postId) => {
    try {
      await apicall.PostingService.deletePost(postId);
      await fetchPosts(); // Refresh posts after deletion
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading Posts..</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg font-medium">{error}</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post.postId} className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <p className="text-xl font-bold text-gray-800 mb-2">{post.message}</p>
              <p className="text-sm text-gray-500 mb-4 italic">{postCreatedtimeAgo(post.createdDate)}</p>
              <button
                onClick={() => handleDeletePost(post.postId)}
                className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">You don't have posts.</p>
      )}
    </div>
  );
};

export default MyPosts;
