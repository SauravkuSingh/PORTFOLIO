import React from 'react'
import { motion } from "framer-motion";
import { ShimmerButton } from '@/components/ui/shimmer-button';
import profileImg from "@/assets/profile.png"

const Navbar = () => {
  return (
  <motion.nav
  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  className='fixed top-6 left-1/2 z-100 -translate-x-1/2 w-[90%] max-w-5xl flex items-center  justify-between px-6 py-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10'
  >
    {/* left side hai */}
    <div className='flex items-center gap-5'>
        <div className="w-9 h-9 rounded-full bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
          <img className='rounded-full w-9 h-9 object-cover' src={profileImg} alt="" />
        </div>
        <span className=' text-white text-sm tracking-wide '>Saurav Singh</span>
    </div>
        <ShimmerButton className=" text-xs">Let's Connect</ShimmerButton>
  </motion.nav>
  )
}

export default Navbar