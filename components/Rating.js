import React from 'react'
import { FaStar, FaStarHalf } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai"

export default function Rating({ stars }) {

    const rating = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {
                    stars >= index + 1 ? (
                        <FaStar size={20} className='fill-yellow-500' />
                    ) : stars >= number ? (
                        <FaStarHalf size={20} className='fill-yellow-500' />
                    ) : (<AiOutlineStar size={20} className='fill-yellow-500' />)
                }
            </span>
        )
    })

    return (
        <div className='flex gap-2 my-5 flex-row'>
            {rating}
        </div>
    )
}
