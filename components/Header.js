import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, UserCircleIcon, MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useEffect } from 'react'
import Autocomplete from "react-google-autocomplete"
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'
import { useRouter } from 'next/dist/client/router'
import { XCircleIcon } from '@heroicons/react/solid'

const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyAndx0wQz6jgFsR85fJUJp_2woFjD96_8k"

function Header({ placeholder }) {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [Infants, setInfants] = useState(0)
    const [dateActive, setDateActive] = useState(false)
    const [guestActive, setGuestActive] = useState(false)

    useEffect(() => {
        if (router?.query?.startDate) {
            setSearchInput(router.query.location)
            setStartDate(new Date(router.query.startDate))
            setEndDate(new Date(router.query.endDate))
            setAdults(router.query.adults)
            setChildren(router.query.children)
            setInfants(router.query.Infants)
        }
    }, [router.query])

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        setDateActive(false)
        window.addEventListener('scroll', transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const handleSelect = ranges => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const clearAll = () => {
        setAdults(0)
        setChildren(0)
        setInfants(0)
    }

    useEffect(() => {
        if (searchInput) {
            setDateActive(true)
            setGuestActive(false)
        }
        else setDateActive(false)
    }, [searchInput])

    const onSearch = () => {
        setDateActive(false)
        setGuestActive(false)
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                adults,
                children,
                Infants,
                guests: Number(adults) + Number(children) + Number(Infants)
            }
        })
    }

    return (
        <header className={`fixed w-full top-0 z-50 grid sm:grid-cols-4 grid-cols-1 navbar p-5 md:px-10 ${show && "nav__stickey"}`}>

            <div className="relative flex items-center h-10 cursor-pointer my-auto justify-center mb-4" onClick={() => router.push('/')}>
                <Image
                    src="http://links.papareact.com/qd3"
                    // layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                    width="130"
                    height="130"
                />
            </div>
            <div className="flex col-span-2 bg-white items-center justify-between border-2 rounded-full py-2 md:shadow-sm">
                <input type="text" onFocus={() => {setGuestActive(false); setDateActive(true)}} value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder={placeholder ? placeholder : "Start your search"} className="outline-none pl-5 bg-transparent md:flex-grow mr-3 text-sm text-gray-600 placeholder-gray-400 flex-shrink-0" />
                {/* <Autocomplete
                    apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                    debounce={500}
                    onPlaceSelected={(place) => {
                        console.log(place)
                    }}
                    placeholder="(Google place autocomplete) Start your search...."
                    className="outline-none pl-5 bg-transparent flex-grow mr-3 text-sm text-gray-600 placeholder-gray-400"
                /> */}
                <div onClick={() => { setGuestActive(true); setDateActive(false) }} className="w-52 items-center px-4 border-l border-gray-200 cursor-pointer flex justify-between">
                    <div className="flex-1">
                        <h4 className="text-sm font-medium">Guests</h4>
                        <p className="text-xs text-gray-400 truncate w-20">{!!(adults || children || Infants) ? `${adults} - ${children} - ${Infants}` : 'Add'} guests guests</p>
                    </div>
                    {!!(adults || children || Infants) && <XCircleIcon onClick={clearAll} className="h-5 text-gray-500" />}
                </div>
                <SearchIcon onClick={onSearch} className="h-8 bg-red-400 rounded-full text-white p-2 cursor-pointer inline-flex mr-2 w-8" />
            </div>
            <div className="sm:flex hidden items-center justify-end space-x-3 text-gray-500 cursor-pointer">
                <div className={`rounded-full py-2 px-3 flex items-center`}>
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

            {dateActive && (
                <div className="bg-transparent col-span-4 flex flex-col items-center justify-center mt-4">
                    <div className="rounded-2xl bg-white p-5 relative pt-14">
                    <XCircleIcon onClick={() => setDateActive(false)} className="h-6 text-gray-500 float-right cursor-pointer absolute top-4 right-4" />
                        <DateRangePicker
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={['#fd5b61']}
                            onChange={handleSelect}
                        />
                    </div>
                </div>
            )}
            {guestActive && (
                <div className="bg-transparent col-span-4 flex flex-col items-center justify-center">
                    <div className="bg-white mt-4 rounded-2xl p-5 relative">
                        <XCircleIcon onClick={() => setGuestActive(false)} className="h-6 text-gray-500 float-right cursor-pointer absolute top-3 right-3" />
                        <div className="flex justify-between items-center w-72 border-gray-100 border-b py-4">
                            <div>
                                <h5 className="font-semibold text-base">Adults</h5>
                                <p className="cursor-pointer text-sm text-gray-500">Ages 13 or above</p>
                            </div>
                            <div>
                                <input type="number" value={adults} min="1" className="outline-none w-10" onChange={e => setAdults(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-72 border-gray-100 border-b py-4">
                            <div>
                                <h5 className="font-semibold text-base">Children</h5>
                                <p className="cursor-pointer text-sm text-gray-500">Ages 2 - 12</p>
                            </div>
                            <div>
                                <input type="number" value={children} min="1" className="outline-none w-10" onChange={e => setChildren(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-72 border-gray-100 py-4">
                            <div>
                                <h5 className="font-semibold text-base">Infants</h5>
                                <p className="cursor-pointer text-sm text-gray-500">Under 2</p>
                            </div>
                            <div>
                                <input type="number" value={Infants} min="1" className="outline-none w-10" onChange={e => setInfants(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
