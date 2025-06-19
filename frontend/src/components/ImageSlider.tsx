
import {mockSliderData} from "../mockdata/mockSlideData";
import { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { Pause, Play } from "lucide-react";
// import {assets} from "../assets/assets";

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? mockSliderData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === mockSliderData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const toggleAutoplay = () => {
        setIsAutoplay(!isAutoplay);
    }

    // Auto-play Functionality
    useEffect(() => {
        if (!isAutoplay) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval)
    }, [isAutoplay, nextSlide]);


    return (
        <>
            <div className={"max-w-[1480px] h-[780px] w-full m-auto py-10 px-4 relative group rounded-xl"}>
                <div className="relative overflow-hidden rounded-xl h-full bottom-10  ">
                    <div className="absolute inset-0 ">
                        <img
                            alt=""
                            src={mockSliderData[currentIndex].imageSrc}
                            className="size-full object-cover place-items-center opacity-90 bg-gray-200"
                        />
                    </div>
                    <div className="relative px-6 top-8 sm:px-12 sm:py-40 lg:px-16">
                        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
                            <h2 id="social-impact-heading"
                                className="font-bold tracking-tight text-white sm:text-4xl">
                                <span className="block sm:inline">{mockSliderData[currentIndex].title}</span>
                            </h2>

                            <a
                                href="/projects"
                                className="mt-8 block w-full rounded-md border border-transparent hover:scale-110 transition-all duration-500 bg-white px-10 py-4 text-base font-medium cursor-pointer text-black hover:bg-gray-100 sm:w-auto"
                            >
                                See More
                            </a>
                        </div>
                        <div className={"flex top-4 justify-center py-2 my-48  "}>
                            {mockSliderData.map((slide, index) => (
                                <div
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={"text-2xl cursor-pointer"}>
                                    <RxDotFilled size={32} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div
                    className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                </div>
                {/* Right Arrow */}
                <div
                    className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30}/>
                </div>

                <div className={"absolute top-4 right-6"}>
                    <button onClick={toggleAutoplay}
                    className={"bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"}>
                        {isAutoplay ? (
                            <Pause className={"text-gray-700"} size={18} />
                        ) : (
                            <Play className={"text-gray-700"} size={18} />
                        )}

                    </button>
                </div>


            </div>
        </>
    )
}