import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, UserCircleIcon, MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useEffect } from 'react'

function Header() {
    const [show, setShow] = useState(false)

    const transitionNavBar = () => {
        if(window.scrollY > 100){
            setShow(true)
        }else{
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    return (
        <header className={`fixed w-full top-0 z-50 grid grid-cols-3 navbar p-5 md:px-10 ${show && "nav__stickey"}`}>
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image 
                    src="http://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>
            <div className="flex bg-white items-center border-2 rounded-full py-2 md:shadow-sm">
                <input type="text" placeholder="Start your search" className="outline-none pl-5 bg-transparent flex-grow mr-3 text-sm text-gray-600 placeholder-gray-400" />
                <SearchIcon className="h-8 bg-red-400 rounded-full text-white p-2 cursor-pointer hidden md:inline-flex md:mr-2" />
            </div>
            <div className="flex items-center justify-end space-x-3 text-gray-500 cursor-pointer">
                <div className={`rounded-full py-2 px-3 flex items-center ${!show && "text_white"}`}>
                    <p className="hidden md:inline-flex mr-3">Become a host</p>
                    <GlobeAltIcon 
                        className="h-6"
                    />
                </div>
                <div className="flex bg-white items-center space-x-3 rounded-full border-2 py-2 px-3 cursor-pointer">
                    <MenuIcon 
                        className="h-6"
                    />
                    <UserCircleIcon 
                        className="h-6"
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
