import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-1 text-primary-dark'>
        <h1 className='font-bold text-xl max-md:text-sm '>IBHS</h1>
        <Image src='/logo.png' height={70} width={70} priority quality={100} className='w-[40px] h-[40px] max-md:w-[30px] max-md:h-[30px]' alt="Logo DashBoard" />
    </div>
  )
}

export default Logo