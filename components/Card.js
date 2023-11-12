import React from 'react'
import FormatPrice from './FormatPrice.js'
import { AiFillHeart } from 'react-icons/ai'
import Link from 'next/link.js'

export default function Card({ data }) {
    return (
        <Link href={`/singleproduct/${data.title}`} className="group inline-block pb-4 h-fit md:h-[600px] tece text-center my-5 bg-gradient-to-tr from-slate-50 to-slate-200 shadow-xl shadow-gray-800 text-black overflow-hidden rounded-2xl hover:shadow-md transition">
            <figure className="w-full aspect-square overflow-hidden">
                <img
                    className="w-full mx-auto object-cover transition group-hover:scale-125"
                    src={data.images[0]}
                />
            </figure>
            <div className="p-4">
                <h3 className="text-xl font-bold my-3">{data.title}</h3>
                <h3 className="text-md font-bold my-3">{data.description}</h3>
                <p className="text-xl font-bold"><FormatPrice price={data.price} /></p>
            </div>
            <footer className="flex gap-2 px-4">
                <button className="text-blue-400 hover:text-red-400">
                    <AiFillHeart className="fa-solid fa-heart" />
                </button>
            </footer>
        </Link>
    )
}
