import Image from 'next/image'

function Banner() {
    return (
        <div className="relative pt-8" style={{ height: '70vh' }}>
            <Image
                src="https://a0.muscache.com/im/pictures/e4a2a61c-589f-4e49-b3b8-968a6bc23389.jpg?im_w=2560"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute h-full w-full flex items-center">
                <div className="container mx-auto px-5 md:px-10">
                    <h1 className="font-bold md:text-5xl lg:text-7xl text-4xl w-10/12 mx-auto md:mx-0 md:w-4/12 lg:w-4/12 text-white text-center md:text-left">Olympian & Paralympian Online Experiences</h1>
                    <button className="mx-auto block md:mx-0 mt-8 bg-white px-7 py-3 rounded-xl shadow-md text-base font-bold hover:bg-black hover:text-white transition duration-300 ease-in-out">Explore new</button>
                </div>
            </div>
        </div>
    )
}

export default Banner
