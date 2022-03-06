import React from 'react'
import {motion ,AnimatePresence} from 'framer-motion'
import Link from 'next/link'

const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1
      }
    }
  };
const itemVariants = {
    closed: {
      opacity: 0
    },
    open: { opacity: 1 }
  };

function Modal({showModal,setShowModal}:any)  {

  return (
    <AnimatePresence>
    {showModal && (
      <div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0
          }}
          exit={{
            x: "100%",
            transition: { delay: 0.7, duration: 0.3 }
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed bg-indigo-600 text-white shadow-lg top-0 z-50 right-0 w-2/3 h-screen p-5"
        >
          <button
            onClick={() => setShowModal((showModal:BooleanConstructor) => !showModal)}
            className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
          >
            &times;
          </button>
          <motion.div
              className="mt-10 space-y-5"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              
            >
          <Link href="/">
              <motion.p whileHover={{ scale: 1.1 }}
                  variants={itemVariants} className="text-2xl font-semibold hover:underline" >Home</motion.p>
                  </Link>
         <Link href="/premium"> 
         <motion.p variants={itemVariants} className="text-2xl font-semibold hover:underline">Premium</motion.p>
         </Link>
         <Link href="/about">  
         <motion.p variants={itemVariants} className="text-2xl font-semibold hover:underline">About</motion.p>
         </Link>
                
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          onClick={() => setShowModal((showModal:BooleanConstructor) => !showModal)}
          className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
        />
      </div>
    )}
  </AnimatePresence>
  )
}

export default Modal