'use client'
import React, { useState,useEffect } from 'react';
import apicall from '@/agent/ApiCall';
import { postCreatedtimeAgo } from '@/utility/DateTimeUtility';
const DashboardSection = ({posted}) => {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchDashboardPosts = async () => {
            try {
                const posts = await apicall.PostingService.getDashBoardPosts();
                setPosts(posts);
            } catch (error) {
                console.error("Error fetching dashboard posts:", error);
            }
        }
        fetchDashboardPosts();
    }, [apicall,posted]);
    return (
        <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
            {posts && posts.map((post) => (
                <div
                    key={post.postDetail.postId}
                    style={{
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: '#fff',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        border: '1px solid #eaeaea'
                    }}
                >
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>@{post.userName}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>{post.postDetail.message}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        {postCreatedtimeAgo(post.postDetail.createdDate)}
                    </p>
                </div>
            ))}
        </div>
    )
};

export default DashboardSection;