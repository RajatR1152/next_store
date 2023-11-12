'use client'
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../shared/FirebaseConfig';

export default function page() {

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    let d = JSON.parse(localStorage.getItem('user'));
    setUser(d);
    if (d) {
      getUserInfo(user);
    }
  }, [user]);

  async function getUserInfo(u) {
    const q = query(collection(db, 'users'), where("email", "==", u.email));
    const res = await getDocs(q);
    res.forEach((doc) => {
      setCartData(doc.data().orders);
    })
  }


  return (

    <div class="w-full h-screen overflow-x-auto bg-gray-100">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="mb-4">
            <h1 class="text-3xl font-bolder leading-tight text-gray-900">Orders</h1>
          </div>
          <div class="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
            <div class="flex items-center py-2">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-searcg" type="text" placeholder="Search" />
            </div>
            <div class="flex items-center py-2">
              <Link href=""
                class="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                Create new
              </Link>
            </div>
          </div>
          <div class="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
              <table class="min-w-full">
                <thead>

                  <tr class="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                    <th class="px-6 py-3 text-left font-medium">
                      id
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      product
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      quantity
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      price
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      total price
                    </th>
                    <th class="px-6 py-3 text-left font-medium">

                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      cancel
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">

                  {
                    cartData.map((d, i) => {
                      return (
                        <tr>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {i}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              <img src={d.thumbnail} alt="" className="w-12 h-12 rounded-full" />
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-10 w-10 rounded-full"
                                  src="https://via.placeholder.com/400x400"
                                  alt="" />
                              </div>
                              <div class="ml-4">
                                <div class="text-sm leading-5 font-medium text-gray-900">
                                  3
                                </div>
                              </div>
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              400
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              1200
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">

                          </td>
                          <td class="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                            <a href="#"
                              class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline" >
                              cancel
                            </a>
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
