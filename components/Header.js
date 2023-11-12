'use client'
import { DataContext } from '@/context/DataContext'
import { SearchContext } from '@/context/SearchContext'
import { UserContext } from '@/context/UserContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'

export default function Header() {

    const [showNavs, setShowNavs] = useState(false);
    const { search, setSearch } = useContext(SearchContext);
    const { data, setData, data2, setData2 } = useContext(DataContext);
    const router = useRouter();
    const path = usePathname();
    const [user, setUser] = useState([]);

    function submitSearch() {
        data.map((d) => {
            if (d.title.toLowerCase() == search.toLowerCase() || d.brand.toLowerCase() == search.toLowerCase()) {
                setData2([d])
                router.push('/store');
            }
        })
    }

    useEffect(() => {
        const d = JSON.parse(localStorage.getItem('user'));
        if (d) {
            setUser(d);
        }
    }, [])

    if (path == '/login' || path == '/register') {
        return null;
    }

    return (
        <div>

            <div className="container w-full hidden md:flex flex-row p-5 items-center sticky justify-center">

                <Link href={'/'}><img src="https://cdn.dribbble.com/users/18217/screenshots/14656930/s-steps-logo-design-by-bohdan-harbaruk.png" alt="" className="w-10 h-10 rounded-full" /></Link>

                <div className="container w-4/12 border-gray-300 shadow-xl ms-auto bg-white rounded-full flex flex-row">
                    <input onChange={(e) => { setSearch(e.target.value) }} type="text" className="p-4 bg-transparent w-11/12 border-0 focus:outline-none" placeholder='search...' />
                    <button onClick={submitSearch} className='w-1/12 bg-transparent text-gray-600 font-bold'><AiOutlineSearch size={30} /></button>
                </div>

                <div className="w-fit items-center justify-center me-4 flex ms-auto flex-row gap-6">
                    <Link href={'/'} className="text-lg font-bold text-gray-600">Home</Link>
                    <Link href={'/store'} className="text-lg font-bold text-gray-600">Store</Link>
                    <Link href={'/contact'} className="text-lg font-bold text-gray-600">Contact</Link>
                    <Link href={'/'} className="text-lg font-bold text-gray-600">About Us</Link>
                    <Link href={'/orders'} className="text-lg font-bold text-gray-600">Orders</Link>
                    <Link href={'/cart'} className="text-lg font-bold text-gray-600"><AiOutlineShoppingCart size={30} /></Link>
                    {
                        !user ? <Link href={'/login'} className="px-5 py-2 border-2 bg-transparent border-violet-800 rounded-xl text-violet-800 hover:text-white hover:bg-violet-800 text-xl font-semibold">login</Link>
                            :
                            <Link href={'/profile'} className="text-lg font-bold text-gray-600"><AiOutlineUser size={30} /></Link>
                    }
                </div>

            </div>

            <div className="container w-full md:hidden flex flex-col p-5">

                <div className="container w-full items-center flex flex-row gap-5">
                    {showNavs ? <RxCross2 size={30} className='cursor-pointer' onClick={() => { setShowNavs(false) }} /> : <AiOutlineMenu className='cursor-pointer' onClick={() => { setShowNavs(true) }} size={30} />
                    }
                    <img src="https://cdn.dribbble.com/users/18217/screenshots/14656930/s-steps-logo-design-by-bohdan-harbaruk.png" alt="" className="w-10 h-10 rounded-full" />
                </div>

                {
                    showNavs ? (
                        <>
                            <div className="container w-full my-5 border-gray-300 shadow-xl mx-auto bg-white rounded-full flex flex-row">
                                <input type="text" onChange={(e) => { setSearch(e.target.value) }} className="p-4 bg-transparent w-11/12 border-0 focus:outline-none" placeholder='search...' />
                                <button onClick={submitSearch} className='w-1/12 bg-transparent text-gray-600 font-bold'><AiOutlineSearch size={30} /></button>
                            </div>

                            <div className="w-full items-center justify-center py-5 me-4 flex mx-auto flex-col shadow-lg gap-6">
                                <Link href={'/'} className="text-lg font-bold text-gray-600">Home</Link>
                                <Link href={'/store'} className="text-lg font-bold text-gray-600">Store</Link>
                                <Link href={'/contact'} className="text-lg font-bold text-gray-600">Contact</Link>
                                <Link href={'/'} className="text-lg font-bold text-gray-600">About Us</Link>
                                <Link href={'/orders'} className="text-lg font-bold text-gray-600">Order</Link>
                                <Link href={'/cart'} className="text-lg font-bold text-gray-600"><AiOutlineShoppingCart size={30} /></Link>
                                {
                                    !user ? <Link href={'/login'} className="px-5 py-2 border-2 bg-transparent border-violet-800 rounded-xl text-violet-800 hover:text-white hover:bg-violet-800 text-xl font-semibold">login</Link>
                                        :
                                        <Link href={'/profile'} className="text-lg font-bold text-gray-600"><AiOutlineUser size={30} /></Link>
                                }                            </div>
                        </>
                    )
                        :
                        null
                }
            </div>

        </div>
    )
}
