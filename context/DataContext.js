'use client'

import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const DataContext = createContext();

export default function DataContextProvider({ children }) {

    const [data2, setData2] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products').then((res) => {
            setData(res.data.products);
        })
    }, [])

    return (
        <DataContext.Provider value={{ data, setData, data2, setData2, quantity,setQuantity }}>
            {children}
        </DataContext.Provider>
    )
}