import Image from 'next/image'
import { HeartIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'

function InfoCard({ img, location, title, description, star, price, total, long, lat }) {
    return (
        <div className="flex first:border-t p-5 my-5 rounded-2xl transition duration-500 border-b cursor-pointer hover:opacity-80 hover:shadow-lg">
            <div className="relative w-40 h-24 md:h-52 md:w-80 flex-shrink-0">
                <Image 
                    src={img}
                    layout='fill'
                    objectFit="cover"
                    className="rounded-xl"
                />
            </div>
            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <p className="">{location}</p>
                    <HeartIcon className="cursor-pointer h-7 text-red-600" />
                </div>
                <h4 className="text-xl font-semibold">{title}</h4>
                <div className="border-b w-10 pt-2" />
                <p className="text-sm text-gray-500 flex-grow pt-2">{description}</p>
                <div className="flex justify-between items-end pt-5">
                    <p className="cursor-pointer flex items-center">
                        <StarIcon className="h-5 text-yellow-500 mr-1" />
                        {star}
                    </p>
                    <div>
                        <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
                        <p className="text-right font-extralight">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
