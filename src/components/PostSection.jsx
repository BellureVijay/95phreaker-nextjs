"use client";
import React, { use, useState } from "react";
import apicall from "@/agent/ApiCall";
import { getUser } from "@/utility/user";

const PostSection = ({onCloseCreatePost,setPosted}) => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const user= getUser();
  const handleChange = (e) => {
    setMessage(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      await apicall.PostingService.createPost(message,user?.email);
      setMessage("");
      setSubmitted(true);
      if(onCloseCreatePost){
        onCloseCreatePost();
      }
      setPosted(prev=>!prev);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="w-full mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-lg font-bold text-blue-700 dark:text-blue-300">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="text-gray-900 dark:text-white font-medium text-lg">
            Create Post
          </span>
        </div>
        <textarea
          id="message"
          rows="4"
          value={message}
          onChange={handleChange}
          className="block p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
          placeholder="What's on your mind?"
        ></textarea>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={!message.trim() || message.trim().length < 4}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-semibold"
          >
            Post
          </button>
        </div>
        {message.trim().length > 0 && message.trim().length < 4 && (
          <div className="mt-2 text-red-400 text-sm text-center">
            Post must be at least 4 letters.
          </div>
        )}
        {submitted && (
          <div className="mt-2 text-green-600 text-sm text-center">
            Posted
          </div>
        )}
      </form>
    </div>
  );
};

export default PostSection;
