'use client'
import React, { useState } from 'react'
import data from '@/assets/CarouselItems'


export default function Carousel() {

    const [index, setIndex] = useState(0);
    let i = 1;
    for (i = 1; i < data.length; i++) {
        setTimeout(() => {
            changeIndex();
        }, 5000);
    }

    function changeIndex() {
        if (index == data.length - 1) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }

    return (
        <div className="container w-11/12 mx-auto h-[600px] flex flex-col rounded-2xl">

            <div className="container w-full mx-auto h-[300px] md:h-[200px]">
                <img src={data[index].image} alt="" className="md:w-4/12 animate-trans-right mt-4 md:relative ms-auto h-auto " />
            </div>

            <div className="container w-full md:text-left text-center  mx-auto h-[400px] mt-auto rounded-2xl bg-gradient-to-t shadow-xl from-slate-200 to-slate-100">
                <h1 className="md:text-8xl text-4xl transition-shadow animate-left bg-gradient-to-r from-pink-500 via-purple-800 md:w-9/12 to-pink-700 bg-clip-text text-transparent md:ms-10 mt-10 font-bold">{data[index].name}</h1>
                <h1 className="md:text-5xl text-2xl mt-10 md:ms-64 animate-left bg-gradient-to-r from-pink-500 via-purple-800 to-pink-700  bg-clip-text text-transparent font-bold">upto {data[index].off}% off</h1>
            </div>

        </div>
    )
}
