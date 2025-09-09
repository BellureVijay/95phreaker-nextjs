import React from 'react';
import PostSection from './PostSection';

const CreatePostModal = ({isOpen,onCloseCreatePost}) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-5 flex items-center justify-center z-1">
      <div className="bg-white dark:bg-gray-50 rounded-xl shadow-2xl p-6 w-full max-w-xl mx-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          onClick={onCloseCreatePost}
        >
          ✕
        </button>

        <PostSection  onCloseCreatePost={onCloseCreatePost}/>
      </div>
    </div>
  );
};

export default CreatePostModal;
