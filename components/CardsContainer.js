'use client'
import React, { useContext, useEffect } from 'react'
import Card from './Card'
import { DataContext } from '@/context/DataContext'

export default function CardsContainer() {

    const { data, data2, setData2 } = useContext(DataContext);

    useEffect(() => {

        setData2(data);

    }, [data])

    return (
        <div className='container md:columns-4 items-center justify-center w-full md:p-5'>
            {
                data2.map((d, i) => {
                    while (i < 8) {
                        return (
                            <Card key={i} data={d} />
                        )
                    }
                })
            }
        </div>
    )
}
