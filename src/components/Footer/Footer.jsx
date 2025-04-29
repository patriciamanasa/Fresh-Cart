import React from 'react';
import img from '../../assets/images/Amazon_Pay_logo.svg.png';
import img1 from '../../assets/images/klipartz.com1.png';
import img2 from '../../assets/images/master-card-logo-png_seeklogo-89117.png';
import img3 from '../../assets/images/klipartz.com.png';
import img4 from '../../assets/images/klipartz.com3.png';
import img5 from '../../assets/images/klipartz.com2.png';

export default function Footer() {
  return (
    <div className="bg-gray-100 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl mb-3 font-semibold">Get the FreshCart App</h3>
          <p className="text-gray-500 mb-5">We will send you a link, open it on your phone to download the app.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email..."
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-active focus:border-active w-full p-2"
            />
            <button className="bg-active text-white rounded-lg px-4 py-2 text-sm hover:bg-green-700 transition">
              Share App Link
            </button>
          </div>
        </div>

        <hr className="border-gray-300 my-8" />
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:w-1/2">
            <h1 className="text-sm font-semibold mb-2 md:mb-0">Payment Partners:</h1>
            <div className="flex flex-wrap items-center gap-3 md:ml-4">
              <img src={img} className="w-11" alt="Amazon Pay" />
              <img src={img1} className="w-11" alt="Payment 1" />
              <img src={img2} className="w-11" alt="Mastercard" />
              <img src={img3} className="w-11" alt="Payment 2" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:w-1/2">
            <h1 className="text-sm font-semibold mb-2 md:mb-0">Get deliveries with FreshCart:</h1>
            <div className="flex items-center gap-3 md:ml-4">
              <img src={img4} className="w-28" alt="App Store" />
              <img src={img5} className="w-28" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

