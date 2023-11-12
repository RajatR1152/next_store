'use client'
import { db } from '@/app/shared/FirebaseConfig';
import axios from 'axios';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

    const param = useParams();
    let p = param.product.replace("%20", " ");
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('https://dummyjson.com/products').then((res) => {
            setData(res.data.products);
        });

        setUser(JSON.parse(localStorage.getItem('user')));

        const foundProduct = data.find(d => p === d.title);
        if (foundProduct) {
            setProduct(foundProduct);
        }

    }, [data, param.product]);

    async function buy(d) {
        const q = query(collection(db, 'users'), where("email", "==", user.email));
        const res = await getDocs(q);

        res.forEach(async (doc) => {
            const userRef = doc.ref;
            const userData = doc.data();
            const updatedOrders = userData.orders.concat(d);
            await updateDoc(userRef, { orders: updatedOrders });
        });
    }

    return (
        <div className="container w-full md:w-7/12 mx-auto md:h-screen p-5 h-fit overflow-y-auto">

            <div className="container flex border-b-2 p-2 items-center flex-row">
                <div className="container w-3/11">
                    <h1 className="text-2xl font-bold text-black">Delivery Address : </h1>
                </div>
                <div className="container w-9/11">
                    <textarea name="address" className='w-full p-4 border-b-2 border-gray-700' placeholder='delivery address...'></textarea>
                </div>
            </div>

            <div className="container flex p-2 border-b-2 items-center flex-col">
                <div className="container w-3/11">
                    <h1 className="text-2xl font-bold text-black">Payment Method : </h1>
                </div>

                <div className="container w-full h-fit my-5">

                    <h1 className="text-xl my-5 font-bold text-black mt-8">credit card: </h1>
                    <div className="continer cursor-pointer w-full flex flex-row my-5 gap-5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" alt="" className="w-auto h-14" />
                        <img src="https://purepng.com/public/uploads/large/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png" alt="" className="w-auto h-14" />
                        <img src="https://cdn-icons-png.flaticon.com/512/825/825464.png" alt="" className="w-auto h-14" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" alt="" className="w-auto h-14" />
                    </div>

                    <h1 className="text-xl my-5 font-bold text-black mt-8">debit card: </h1>
                    <div className="continer cursor-pointer w-full flex flex-row my-5 gap-5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" alt="" className="w-auto h-14" />
                        <img src="https://purepng.com/public/uploads/large/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png" alt="" className="w-auto h-14" />
                        <img src="https://cdn-icons-png.flaticon.com/512/825/825464.png" alt="" className="w-auto h-14" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" alt="" className="w-auto h-14" />
                    </div>

                    <h1 className="text-xl my-5 font-bold text-black mt-8">upi : </h1>
                    <div className="continer cursor-pointer w-full flex flex-row my-5 gap-5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="" className="w-auto h-14" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/800px-PhonePe_Logo.svg.png" alt="" className="w-auto h-14" />
                        <img src="https://static.vecteezy.com/system/resources/previews/021/672/630/original/google-pay-logo-transparent-free-png.png" alt="" className="w-auto h-14" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/PayPal.png" alt="" className="w-auto h-14" />
                    </div>

                </div>

                <button onClick={() => { buy(product) }} className="w-full bg-violet-800 text-xl font-bold my-10 text-white p-4 rounded-lg">place order</button>

            </div>

        </div>
    )
}

// https://www.youtube.com/watch?v=v9IwDI0GtpE&list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i&index=10