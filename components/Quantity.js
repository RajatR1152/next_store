'use client'
import { DataContext } from '@/context/DataContext';
import React, { useContext, useState } from 'react'

export default function Quantity() {

    const { quantity, setQuantity } = useContext(DataContext);

    function inc() {
        if (quantity < 10) {
            setQuantity(quantity + 1)
        }
    }

    function dec() {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
        else {
            alert("quantity could not be 0");
        }
    }

    return (
        <div className="container my-5 flex flex-row gap-0 md:w-4/12 md:ms-32 w-full">
            <button onClick={dec} className="w-2/12 rounded-s-xl border-violet-800 border-2 text-4xl text-white border-e-0 bg-violet-800">-</button>
            <input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} type="number" className="w-8/12 text-xl text-center font-bold text-gray-800 focus:outline-none border-y-2 border-violet-800 p-4" />
            <button onClick={inc} className="w-2/12 bg-violet-800 rounded-e-xl border-2 text-4xl text-white border-violet-800 border-s-0">+</button>
        </div>
    )
}
