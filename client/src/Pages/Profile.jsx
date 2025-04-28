import { useAppStore } from '@/store/store.js'
import React from 'react'

const Profile = () => {
  const {userInfo} = useAppStore();
  return (
    <div>
      <h1>Profile</h1>
      <div className='flex flex-col gap-2'>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Id:</strong> {userInfo.id}</p>
      </div>
    </div>
  )
}

export default Profile