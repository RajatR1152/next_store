'use client'
import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useState } from 'react'

export default function PersonalInfo() {

    const { userData, setUserData } = useContext(UserContext);

    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        const d = JSON.parse(localStorage.getItem('user'));
        const li = localStorage.getItem('isLogedIn');
        setUserData(d);
    }, [])

    let n;
    let v;

    function handleChange(e) {
        n = e.target.name;
        v = e.target.value;
        setUserData({ ...userData, [n]: v });
        setIsEdited(true);
    }

    return (
        <div className="container w-full md:pt-0 pt-10 bg-white flex flex-row">

            <div className="container w-6/12 flex flex-col gap-8 p-1">
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800">Username : </h1>
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800">Email address : </h1>
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800">mobile Number : </h1>
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800"> Gender : </h1>
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800"> Country : </h1>
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800"> City : </h1>
                <h1 className="text-lg md:text-xl py-3 font-semibold text-gray-800"> Language : </h1>
            </div>

            <div className="container w-6/12 flex flex-col gap-8 p-1">

                <input onChange={handleChange} name='username' type="text" value={userData?.username} className="md:p-3 p-2 border border-gray-700 w-full" />
                <input onChange={handleChange} name="email" type="text" value={userData?.email} className="md:p-3 p-2 border border-gray-700 w-full" />
                <input onChange={handleChange} name="mobile" type="text" placeholder='mobile number ....' className="md:p-3 p-2 border border-gray-700 w-full" />

                <select onChange={handleChange} className="md:p-3 p-2 border border-gray-700 w-full">
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>

                <select onChange={handleChange} className="md:p-3 p-2 border border-gray-700 w-full">
                    <option value="india">india</option>
                    <option value="us">us</option>
                    <option value="uk">uk</option>
                    <option value="china">china</option>
                    <option value="russia">russia</option>
                    <option value="nepal">nepal</option>
                    <option value="indonesia">indonesia</option>
                    <option value="korea">korea</option>
                </select>

                <select className="md:p-3 p-2 border border-gray-700 w-full">

                </select>

                <select className="md:p-3 p-2 border border-gray-700 w-full">
                    <option value="english(us)">english(us)</option>
                    <option value="english(uk)">english(uk)</option>
                    <option value="chinese">chinese</option>
                    <option value="russian">russian</option>
                    <option value="nepali">nepali</option>
                    <option value="hindi">hindi</option>
                    <option value="marathi">marathi</option>
                    <option value="tamil">tamil</option>
                </select>

            </div>

            {
                isEdited ? <button className='bg-violet-800 w-full p-4 text-xl font-bold text-white'>submit</button> : null
            }

        </div>
    )
}
