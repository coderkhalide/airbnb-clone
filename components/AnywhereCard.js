import Image from 'next/image'

function AnywhereCard({ img, title }) {
    return (
        <div className="m-2 mt-5 rounded-xl cursor-pointer hover:bg-gray-50 hover:shadow-sm hover:scale-105 transition duration-300 ease-out">
            <div className="relative h-80 w-80">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-lg"
                />
            </div>
            <h2 className="font-medium text-xl mt-2">{title}</h2>
        </div>
    )
}

export default AnywhereCard
