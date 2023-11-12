'use client'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { db } from '../shared/FirebaseConfig';
import FormatPrice from '@/components/FormatPrice';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { toast } from 'react-toastify';

export default function page() {

  const [data, setData] = useState([]);
  const [user,setUser] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const d = JSON.parse(userData);
    setUser(d);
    getData(d.email);
  }, []);

  const showToast = (text) => {
    toast.success(text);
  };

  async function getData(user) {

    const q = query(collection(db, "users"), where("email", "==", user));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setData(doc.data().orders);
    })
  }

  async function cancel(d) {
    const q = query(collection(db, 'users'), where("email", "==", user.email));
    const res = await getDocs(q);

    res.forEach(async (doc) => {
      const userRef = doc.ref;
      const userData = doc.data();

      const updatedOrders = userData.orders.filter(item => item.title !== d.title);

      await updateDoc(userRef, { orders: updatedOrders }).then(() => {
        window.location.reload();
      })
    });
    showToast("order canceled");
  }

  return (
    <div className='container w-full md:h-[700px]'>
      {data?.length > 0 ?
        (
          <>
            <h1 className="md:text-4xl text-2xl text-center font-bold my-5">Your Orders</h1>

            <div className="container w-full h-full overflow-y-auto">

              <table className="table-auto w-full mt-5 text-center items-center">
                <thead>
                  <tr className='p-5'>
                    <th className='p-3 text-xl font-semibold'>#</th>
                    <th className='p-3 text-xl font-semibold'>product</th>
                    <th className='p-3 text-xl font-semibold'>price</th>
                    <th className='p-3 text-xl font-semibold'>quantity</th>
                    <th className='p-3 text-xl font-semibold'>total</th>
                    <th className='p-3 text-xl font-semibold'>actions</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    data.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td className='p-3'>{i + 1}</td>
                          <td className='p-3 flex flex-row gap-5 items-center justify-center'> <img src={d.thumbnail} alt="" className="w-12 h-12 rounded-full" /> <p className="text-md font-semibold text-gray-700">{d.title}</p> </td>
                          <td className='p-3'><FormatPrice price={d.price} /></td>
                          <td className='p-3'>{d.quantity}</td>
                          <td className='p-3'><FormatPrice price={d.price * d.quantity} /></td>
                          <td className='p-3'> <RiDeleteBin5Line onClick={() => { cancel(d) }} className='w-fit mx-auto cursor-pointer' size={25} /></td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </>
        )

        : <div className="contianer flex flex-col h-[700px] items-center justify-center w-full p-5 text-center">
          <h1 className="md:text-6xl font-extrabold text-3xl">Your Order List is empty</h1> <Link className='text-red-500 md:mt-16 px-8 py-5 md:text-6xl font-extrabold text-3xl' href={'/store'}>buy now</Link>
        </div>}
    </div>
  )
}
