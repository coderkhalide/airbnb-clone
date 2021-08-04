import Image from 'next/image'


function LargeCard({ img, title, description, button }) {
    return (
        <section className="relative cursor-pointer mb-14">
            <div className="relative h-80 w-full">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-lg"
                />
            </div>
            <div className="absolute top-14 left-14">
                <h3 className="font-semibold text-4xl mb-3 w-64">{title}</h3>
                <p className="">{description}</p>
                <button className="mt-4 bg-black px-7 py-3 text-white rounded-xl shadow-md text-sm font-bold hover:bg-white hover:text-black transition duration-300 ease-in-out">{button}</button>
            </div>
        </section>
    )
}

export default LargeCard
