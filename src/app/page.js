'use client';
import React, { useState } from "react";
import PostSection from "@/components/PostSection";
import DashboardSection from "@/components/DashboardSection";

export default function Home() {
  const[posted,setPosted]=useState(false);
    return (
      <div className="">
        <PostSection setPosted={setPosted}/>
        <DashboardSection posted={posted}/>
      </div>
    );

}
