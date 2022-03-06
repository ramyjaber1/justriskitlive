import Image from 'next/image'
import React from 'react'
import logo from '../assets/logo.png'
function Footer() {
  return (
    <div className="flex  items-center pb-10 pt-10 mt-20 px-7 border-t border-black">
        <div>
        <div className="flex items-center">
        <Image src={logo} width="70px" height="70px" />
            <p className="text-4xl  font-bold">Just Risk It</p>
        </div>
        <div className="flex space-x-5 ml-10 mt-3 ">
          <h2 className="text-xs underline transform hover:scale-110 hover:text-blue-500 cursor-pointer">Terms</h2>
          <h2 className="text-xs underline transform hover:scale-110 hover:text-blue-500 cursor-pointer">Privacy</h2>
          <h2 className="text-xs underline transform hover:scale-110 hover:text-blue-500 cursor-pointer">Help</h2>
        </div>
        </div>
    </div>
  )
}

export default Footer