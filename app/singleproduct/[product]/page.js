'use client'
import { db } from '@/app/shared/FirebaseConfig';
import FormatPrice from '@/components/FormatPrice';
import Quantity from '@/components/Quantity';
import Rating from '@/components/Rating';
import { DataContext } from '@/context/DataContext'
import axios from 'axios';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {

    const { data2, setData2, quantity } = useContext(DataContext);
    const [productData, setProductData] = useState({});
    const [images, setImages] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [imgIndex, setImgIndex] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [showBilling, setShowBilling] = useState(false);
    const router = useRouter();

    const param = useParams();

    useEffect(() => {
        axios.get('https://dummyjson.com/products').then((res) => {
            setData2(res.data.products);
        });

        const foundProduct = data2.find(d => param.product.replace('%20', ' ') === d.title);
        if (foundProduct) {
            setProductData(foundProduct);
            setImages(foundProduct.images);
        }

        if (user) {
            getUserInfo(user);
        }
    }, [data2, param.product]);

    async function getUserInfo(u) {
        const q = query(collection(db, 'users'), where("email", "==", u.email));
        const res = await getDocs(q);

        res.forEach((doc) => {
            setUser(doc.data());
            doc.data().cart.map((d) => {
                if (d.title == productData.title) {
                    setIsAdded(true);
                }
            })
            doc.data().orders.map((d) => {
                if (d.title == productData.title) {
                    setIsOrdered(true);
                }
            })
        });
    }

    const showToast = (text) => {
        toast.success(text);
    };

    async function addToCart(d) {
        const q = query(collection(db, 'users'), where("email", "==", user.email));
        const res = await getDocs(q);

        res.forEach(async (doc) => {
            const userRef = doc.ref;
            const userData = doc.data();
            const updatedCart = userData.cart.concat(d);
            await updateDoc(userRef, { cart: updatedCart });
        });
        showToast("added to cart");
    }

    async function removeFromCart(d) {
        const q = query(collection(db, 'users'), where("email", "==", user.email));
        const res = await getDocs(q);

        res.forEach(async (doc) => {
            const userRef = doc.ref;
            const userData = doc.data();

            const updatedCart = userData.cart.filter(item => item.title !== d.title);

            await updateDoc(userRef, { cart: updatedCart }).then(() => {
                window.location.reload();
            })
        });
        showToast("removed from cart");
    }

    async function buyNow(d) {
        setShowBilling(true);
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
    }


    async function buy(d) {
        const q = query(collection(db, 'users'), where("email", "==", user.email));
        const res = await getDocs(q);
        d.quantity = quantity;

        res.forEach(async (doc) => {
            const userData = doc.data();
            const userRef = doc.ref;
            const updatedOrders = userData.orders.concat(d);
            await updateDoc(userRef, { orders: updatedOrders });
        });
        showToast("order created successfully");
    }

    return (
        <div className="container flex overflow-y-auto md:flex-row flex-col w-full h-fit">
            <div className="container w-full md:w-5/12 flex flex-col md:flex-row h-fit md:h-screen p-5">
                <div className="container h-full overflow-y-auto w-full flex md:flex-col flex-row gap-5 md:w-3/12 p-5 bg-slate-50">
                    {
                        images.map((i, index) => {
                            return <img key={index} onClick={() => { setImgIndex(index) }} className='md:w-40 md:h-40 cursor-pointer w-14 h-14 ' src={i} alt="" />
                        })
                    }
                </div>
                <div className="container w-full flex flex-col items-center justify-center md:w-9/12 p-5 bg-slate-50">
                    <img src={images[imgIndex]} alt="" className="w-full h-auto" />
                </div>
            </div>
            <div className="container w-full md:w-7/12  h-fit p-5">
                <div className="container w-full h-fit md:h-screen overflow-y-auto bg-slate-50 p-5">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-700">{productData.title}</h1>
                    <Rating stars={3} />

                    <ul>
                        <li className='my-5 text-xl font-bold'><h5>brand : {productData.brand}</h5></li>
                        <li className='my-5 text-xl font-bold'><h5>category : {productData.category}</h5></li>
                        <li className='my-5 text-xl font-bold'><h5>description :  <br /><p className="text-lg my-5 md:ms-10 ms-0 w-full md:w-6/12">{productData.description}</p></h5></li>
                        <li className="my-2 text-xl font-bold">{productData.stock < 0 ? "out of stock" : `${productData.stock} items available`}</li>
                        <li className='mt-5 text-xl font-bold'><h3>price: <s className='text-red-500'><FormatPrice price={productData.price / (1 - productData.discountPercentage / 100)} /></s> <i className='fs-4 text-danger'>{productData.discountPercentage}% off</i></h3></li>
                        <li className='my-3 text-xl font-bold mx-5'><h3><FormatPrice price={productData.price} /></h3></li>
                    </ul>
                    <h5 className='my-5 text-xl font-bold'>Quantity:</h5>

                    <Quantity />

                    <hr />

                    {
                        isAdded ? <button onClick={() => { removeFromCart(productData) }} className="w-full p-3 my-5 rounded-md bg-violet-800 text-white text-xl font-bold">remove</button> :
                            <button onClick={() => { addToCart(productData) }} className="w-full p-3 my-5 rounded-md bg-violet-800 text-white text-xl font-bold">add to cart</button>
                    }

                    {
                        showBilling ?
                            <div className="container w-full mx-auto md:h-screen p-5 h-fit">

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

                                    <button onClick={() => { buy(productData) }} className="w-full bg-violet-800 text-xl font-bold my-10 text-white p-4 rounded-lg">place order</button>

                                </div>

                            </div>
                            :
                            <>

                            </>
                    }

                    {
                        !showBilling ?
                            isOrdered ? <button onClick={() => { cancel(productData) }} className="w-full p-3 my-5 bg-transparent border-2 border-violet-800 rounded-md hover:bg-violet-800 text-violet-800 hover:text-white text-xl font-bold">cancel</button>
                                :
                                <button onClick={() => { buyNow(productData) }} className="w-full p-3 my-5 bg-transparent border-2 border-violet-800 rounded-md hover:bg-violet-800 text-violet-800 hover:text-white text-xl font-bold">buy now</button>
                            : <>

                            </>
                    }

                    <hr />

                </div>
            </div>
        </div>
    )
}


// https://www.youtube.com/watch?v=v9IwDI0GtpE&list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i&index=10