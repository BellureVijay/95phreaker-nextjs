'use client'
import ActiveFriends from '@/components/ActiveFriends'
import ActiveRequest from '@/components/ActiveRequest'
import AllUsers from '@/components/AllUsers'
import SentRequests from '@/components/SentRequests'
import React,{useState} from 'react'
import { ConnectionContext } from '@/context/pageContext'

const page = () => {
  const[refreshTrigger, setRefreshTrigger] = useState(false);
  return (
    <ConnectionContext.Provider value={{setRefreshTrigger, refreshTrigger}}>
    <div>
      <ActiveFriends/>
      <ActiveRequest/>
      <SentRequests/>
      <AllUsers/>
    </div>
    </ConnectionContext.Provider>
  )
}

export default page
