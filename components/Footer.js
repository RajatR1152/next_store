'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'
import { RxTwitterLogo } from 'react-icons/rx'

export default function Footer() {

    const path = usePathname();

    if (path == '/login' || path == '/register') {
        return null;
    }

    return (
        <div className="cotnainer w-full h-fit p-5 bg-slate-800 text-white">
            <h2 className="text-3xl font-bold">@Shop123</h2>
            <div className="container w-full my-20">
                <table className='table-auto text-center md:w-7/12'>
                    <tbody>
                        <tr className='w-full'>
                            <th className='w-3/12'><h2 className="text-md font-bold">About</h2></th>
                            <th className='w-3/12'><h2 className="text-md font-bold">Help</h2></th>
                            <th className='w-3/12'><h2 className="text-md font-bold">Policy</h2></th>
                            <th className='w-3/12'><h2 className="text-md font-bold">Payments</h2></th>
                        </tr>
                        <tr className='w-full p-5'>
                            <td className='w-3/12'><h2 className="text-sm">Contact Us</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">FAQ</h2></td>
                            <td className='w-3/12'><h2 className="text-sm"> sitemap</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">wholesells</h2></td>
                        </tr>
                        <tr className='w-full p-5'>
                            <td className='w-3/12'><h2 className="text-sm">About Us</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">report</h2></td>
                            <td className='w-3/12'><h2 className="text-sm"> security</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">press</h2></td>
                        </tr>
                        <tr className='w-full p-5'>
                            <td className='w-3/12'><h2 className="text-sm"> Careers</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">terms of use</h2></td>
                            <td className='w-3/12'><h2 className="text-sm"> privacy</h2></td>
                            <td className='w-3/12'><h2 className="text-sm"> clear trip</h2></td>
                        </tr>
                        <tr className='w-full p-5'>
                            <td className='w-3/12'><h2 className="text-sm">Stories</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">Contact Us</h2></td>
                            <td className='w-3/12'><h2 className="text-sm">terms of use</h2></td>
                            <td className='w-3/12'><h2 className="text-sm"> checks</h2></td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="container flex md:flex-row flex-col">
                <div className="container md:w-6/12 p-5 w-full">
                    <h1 className="text-2xl my-5 font-bold">Headquater : </h1>
                    Building Number : 21
                    Street Name : Menon Street
                    Street Address : 62, Manpreet Society, Kharadi
                    State : Odisha
                    City : Darjeeling
                    Post Code : 123574
                </div>
                <div className="container md:mt-0 mt-10 md:w-fit md:ms-auto md:me-8">
                    <h1 className="text-2xl my-5 font-bold">Connect with us : </h1>
                    <div className="flex gap-10 flex-row items-center justify-center">
                        <AiFillInstagram size={50} />
                        <AiFillFacebook size={50} />
                        <RxTwitterLogo size={50} />
                    </div>

                </div>
            </div>


        </div>
    )
}
