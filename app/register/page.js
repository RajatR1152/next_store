'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { auth, db } from '../shared/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { collection, doc, query, setDoc } from 'firebase/firestore';


export default function page() {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        cnfpassword: '',
        cart:[],
        orders:[],
    });
    const router = useRouter();

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setUser({ ...user, [n]: v });
    }

    function generateUniqueId() {
        const randomNum = Math.floor(Math.random() * 10000);

        const timestamp = new Date().getTime();

        const uniqueId = `${timestamp}${randomNum}`;

        return uniqueId;
    }

    async function submit(e) {

        e.preventDefault();

        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push('/login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });

        await setDoc(doc(db, 'users', generateUniqueId()), user)

    }

    return (
        <div className="container w-full h-screen md:p-10">
            <div className="container w-full md:w-10/12 mx-auto h-full rounded-3xl shadow-xl shadow-gray-500 flex flex-row">
                <div className="container hidden md:flex md:w-7/12 h-full bg-cover bg-no-repeat bg-center rounded-s-3xl bg-[url('https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_960_720.png')] p-5"></div>
                <form className="container md:w-5/12 h-fit overflow-y-auto md:h-full flex flex-col bg-cover bg-center md:rounded-e-3xl bg-slate-100 p-5">
                    <h1 className="text-5xl font-bold text-center mt-10 text-gray-700">Sign Up</h1>

                    <div className="container flex flex-col mt-16 gap-4 my-6 w-full">
                        <h1 className="text-xl font-semibold text-gray-700">username</h1>
                        <input required name='username' value={user.username} onChange={handle} type="text" className="w-full p-3 focus:outline-none" placeholder='username...' />
                    </div>

                    <div className="container flex flex-col gap-4 my-6 w-full">
                        <h1 className="text-xl font-semibold text-gray-700">email</h1>
                        <input required name='email' value={user.email} onChange={handle} type="email" className="w-full p-3 focus:outline-none" placeholder='username...' />
                    </div>

                    <div className="container flex flex-col gap-4 my-6 w-full">
                        <h1 className="text-xl font-semibold text-gray-700">password</h1>
                        <input required name='password' value={user.password} onChange={handle} type="password" className="w-full p-3 focus:outline-none" placeholder='password...' />
                    </div>

                    <p id='warning' className="my-5 text-xl font-semibold text-yellow-500"></p>

                    <div className="container flex flex-col gap-4 my-6 w-full">
                        <h1 className="text-xl font-semibold text-gray-700">confirm password</h1>
                        <input required name='cnfpassword' value={user.cnfpassword} onChange={handle} type="text" className="w-full p-3 focus:outline-none" placeholder='confirm password...' />
                    </div>

                    <button onClick={submit} className="p-3 my-5 bg-violet-800 text-xl font-bold text-white w-full">Sign up</button>

                    <div className="container my-5 items-center justify-centers w-full flex flex-row gap-2">
                        <hr className='w-5/12 border-gray-500 border-2' />
                        <h1 className="text-xl w-2/12 text-center font-semibold text-gray-600">OR</h1>
                        <hr className='w-5/12 border-gray-500 border-2' />
                    </div>

                    <h1 className="text-lg text-center mt-5 font-semibold text-gray-700">already have an account ? <Link href={'/login'} className="text-lg font-bold text-blue-600">login</Link> </h1>

                </form>
            </div>
        </div>
    )
}
