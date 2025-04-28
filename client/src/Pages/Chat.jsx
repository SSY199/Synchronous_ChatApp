import React from 'react'
import { useAppStore } from '@/store/store.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'

const Chat = () => {

  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast.error("Please complete your profile setup!");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div>Chat</div>
  )
}

export default Chat