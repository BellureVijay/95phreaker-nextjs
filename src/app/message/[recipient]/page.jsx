import React from 'react'
import PrivateChat from '@/components/PrivateChat'

const Page = ({ params }) => {
  const { recipient } = params;
  return (
    <div className="p-4">
      <PrivateChat recipient={recipient} />
    </div>
  )
}

export default Page
