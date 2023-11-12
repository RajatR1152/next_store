import React from 'react'
import CardsContainer from './CardsContainer'
import Link from 'next/link'

export default function Featured() {
    return (
        <div className="container w-ful p-5">
            <h1 className="text-6xl my-8 font-bold text-gray-600 text-center">Top Deals</h1>
            <CardsContainer />
            <button className="my-8 bg-violet-800 text-xl p-4 font-bold text-white w-full"><Link href={'/store'} className='w-full' >Explore more</Link></button>
        </div>
    )
}
