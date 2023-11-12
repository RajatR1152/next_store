'use client'
import Carousel from '@/components/Carousel'
import Featured from '@/components/Featured'
import { UserContext } from '@/context/UserContext'
import React, { useContext, useEffect } from 'react'

export default function page() {

  const { setUserData, setIsLogedIn } = useContext(UserContext);

  useEffect(() => {
    const d = localStorage.getItem('user');
    const li = localStorage.getItem('isLogedIn');
    setUserData(d);
    setIsLogedIn(li);
  }, [])

  return (
    <div>
      <Carousel />
      <Featured />
    </div>
  )
}
