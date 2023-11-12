'use client'
import PersonalInfo from '@/components/PersonalInfo';
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { AiFillSetting } from 'react-icons/ai'

export default function page() {

  const router = useRouter();
  const { setIsLogedIn, setUserData } = useContext(UserContext);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      router.push('/login');
    }
  })

  function logOut() {
    setIsLogedIn(false);
    setUserData({});
    localStorage.removeItem('user');
    localStorage.removeItem('isLogedIn');
    router.push('/login');
  }

  return (
    <div className="container w-full flex flex-row h-[700px]">

      <div className="container w-2/12 hidden md:flex flex-col bg-slate-50 p-5 h-full">
        <button className="bg-transparent p-3 my-2 text-left w-full text-lg hover:text-white font-semibold text-gray-800 rounded-xl hover:bg-gray-400">personal information</button>
        <Link href={'/orders'} passHref>
          <p className="bg-transparent p-3 my-2 text-left w-full text-lg hover:text-white font-semibold text-gray-800 rounded-xl hover:bg-gray-400">active orders</p>
        </Link>
        <button className="bg-transparent p-3 my-2 text-left w-full text-lg hover:text-white font-semibold text-gray-800 rounded-xl hover:bg-gray-400">previous orders</button>
        <Link href={'/cart'} passHref>
          <p className="bg-transparent p-3 my-2 text-left w-full text-lg hover:text-white font-semibold text-gray-800 rounded-xl hover:bg-gray-400">cart</p>
        </Link>
        <button className="bg-transparent p-3 my-2 text-left w-full text-lg hover:text-white font-semibold text-gray-800 rounded-xl hover:bg-gray-400">wish list</button>
        <Link href={'/store'} passHref>
          <p className="bg-transparent p-3 my-2 text-left w-full text-lg hover:text-white font-semibold text-gray-800 rounded-xl hover:bg-gray-400">recommendation</p>
        </Link>
        <button onClick={() => { logOut }} className="p-3 w-full text-lg my-12 font-semibol rounded-xl bg-violet-800 text-white">log out</button>
        <piFillSetting size={25} className='my-auto ms-auto' />
      </div>

      <div id='div' className="container p-0 md:p-6 w-full md:w-10/12">
        <PersonalInfo />
      </div>

    </div>
  )
}

