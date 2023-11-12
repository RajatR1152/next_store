'use client'
import Card from '@/components/Card';
import FormatPrice from '@/components/FormatPrice';
import { DataContext } from '@/context/DataContext';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { BsFillGrid3X3GapFill, BsList } from 'react-icons/bs'

export default function page() {

    const { data, setData, data2, setData2 } = useContext(DataContext);
    const [view, setView] = useState("grid");

    useEffect(() => {

        setData2(data);

    }, [data]);

    function category(c) {

        let arr = [];

        data.map((d) => {
            if (d.category == c) {
                arr.push(d);
            }
            setData2(arr)
        })

    }

    function handle() {
        let v = document.getElementById('category').value;
        if (v == 'all') {
            viewAll();
        }
        else {
            category(v);
        }

    }

    function viewAll() {
        setData2(data)
    }

    return (
        <div className="w-full flex flex-row bg-white">

            <div className="container md:block hidden w-2/12 bg-slate-50 rounded-e-xl p-5 h-screen">
                <button onClick={() => { category('smartphones') }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>smartphones</b> </button>
                <button onClick={() => { category('laptops') }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>laptops</b> </button>
                <button onClick={() => { category('fragrances') }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>fragrances</b> </button>
                <button onClick={() => { category('skincare') }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>skincare</b></button>
                <button onClick={() => { category('groceries') }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>groceries</b></button>
                <button onClick={() => { category('home-decoration') }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>home-decoration</b></button>
                <button onClick={() => { viewAll() }} className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> <b>View all</b></button>
            </div>

            <div className="container w-full md:w-10/12 bg-white overflow-y-auto p-5 h-screen">
                <div className="container flex gap-5 w-full md:w-fit flex-row items-center justify-center">
                    <BsFillGrid3X3GapFill className='cursor-pointer' onClick={() => { setView("grid") }} size={30} />
                    <BsList className='cursor-pointer' onClick={() => { setView("list") }} size={40} />
                    <div className="container w-full p-1">
                        <select className='p-3 md:hidden' onChange={() => { handle() }} name="category" id="category">
                            <option value='smartphones' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> smartphones </option>
                            <option value='laptops' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> laptops </option>
                            <option value='fragrances' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> fragrances </option>
                            <option value='skincare' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> skincare</option>
                            <option value='groceries' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> groceries</option>
                            <option value='home-decoration' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> home-decoration</option>
                            <option value='all' className="bg-transparent hover:bg-gray-300 p-4 rounded-xl text-lg font-semibold text-gray-700 w-full capitalize"> View all</option>
                        </select>
                    </div>
                </div>
                {
                    view === 'grid' ?
                        <div className='container md:columns-3 items-center justify-center w-full md:p-5'>
                            {
                                data2.map((d, i) => {
                                    return (
                                        <Card key={i} data={d} />
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="contianer w-full flex-col">
                            {
                                data2.map((d, i) => {
                                    return (
                                        <Link href={`/singleproduct/${d.title}`} className="w-full container my-5 rounded-xl shadow-xl p-3 bg-slate-50 h-[400px] flex flex-row">

                                            <div className="w-4/12 p-1">
                                                <img src={d.images[0]} alt="" className="h-full rounded-xl mx-auto object-cover transition group-hover:scale-125" />
                                            </div>

                                            <div className="containe w-8/12 p-5">
                                                <h3 className="text-2xl font-bold my-5">{d.title}</h3>
                                                <h3 className="text-md font-bold my-5">{d.description}</h3>
                                                <p className="text-xl my-5 font-bold"><FormatPrice price={d.price} /></p>
                                            </div>

                                        </Link>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}
