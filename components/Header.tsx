import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import { useDimensions } from '../use-dimension';
import { MenuToggle } from './MenuToggle';
import Modal from './Modal';
import { Navigation } from './Navigation';
import { FiLogIn } from 'react-icons/fi'
import { UserContext } from '../components/context/userContext'
const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

function Header() {
    const [showModal,setShowModal] = useState(false)
    const {currentAccount,connectWallet,currentUser} = useContext(UserContext)
    console.log(currentAccount)
    console.log(currentUser)
  return <div className="border-b border-black ">
  <header className='flex items-center  justify-between p-5 max-w-7xl mx-auto'>
      <div className='flex items-center space-x-5'>
          <Link  href="/">
              <img src={`${process.env.NEXT_PUBLIC_HostUrl}/assets/logo.png`} 
              className='w-14 md:w-20 object-contain cursor-pointer'
              alt="" />
          </Link>
          <div className='hidden md:inline-flex items-center space-x-5'>
          <Link  href="/">Home</Link>
              <Link href="/about">About</Link>
              {/* <h3>Contact</h3> */}
              {/* <h3 className='text-white bg-green-600 px-4 py-1 rounded-full'>Follow</h3> */}
          </div>
      </div>
      <div className='hidden md:flex items-center space-x-5 text-black'>
        {/* <h3>Sign In</h3> */}
        <Link href="/premium" >Premium</Link>
        {/* <div className="flex items-center cursor-pointer space-x-2" onClick={() => connectWallet()}>
            <FiLogIn />
            <span className="">Log in</span>
          </div> */}
        
      </div>
      {/* Mobile version */}
      <div className='md:hidden'>
          {/* Menu Icon */}
          <img onClick={() => setShowModal(true)} src={`${process.env.NEXT_PUBLIC_HostUrl}/assets/menu.png`} alt="" className="w-10 h-10" />
    <Modal showModal={showModal} setShowModal={setShowModal} />
  
      </div>
  </header>
  </div>;
}

export default Header;
