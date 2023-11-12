import React from 'react'

export default function page() {
  return (
    <div className="container flex flex-col gap-6 w-full md:p-5 p-2">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.3208593400625!2d79.12520073867573!3d21.08696734514423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4b8db6965314f%3A0x207ca97e26cc93b5!2sSai%20Nagar%202%2C%20Chandrakiran%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440034!5e0!3m2!1sen!2sin!4v1699777214237!5m2!1sen!2sin" className='w-full' height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      <form action="https://formspree.io/f/mpzgnlpa" method="POST" className="container mx-auto border-2 border-gray-300 md:w-5/12 md:p-5 p-3">
        <input placeholder='useranme...' type="text" className="w-full border-2 border-gray-400 p-3 focus:outline-none" />
        <input name='email' placeholder='email address...' type="text" className="w-full border-2 my-6 border-gray-400 p-3 focus:outline-none" />
        <textarea name='message' placeholder='email address...' type="text" className="w-full border-2 border-gray-400 p-3 focus:outline-none" />
        <button type='submit' className="p-3 w-full mt-5 bg-transparent text-violet-800 hover:text-white hover:bg-violet-800 border-violet-800 border-2">Submit</button>
      </form>
    </div>
  )
}
