
import {mockImageProjectData,} from "../mockdata/mockImageProjectData";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

export default function ImageCarousel() {

    const handleslideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const handleslideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft= slider.scrollLeft + 500;
    }

    return (
        <>
            <h2 className={"text-center font-semibold text-3xl text-gray-800"}>Our Projects</h2>
            <div className={"relative flex items-center"}>
                <MdChevronLeft
                    onClick={handleslideLeft}
                    size={40}
                    className={"opacity-60 cursor-pointer hover:opacity-100"}
                />
                <div id={"slider"}
                     key={"slider"}
                     className={"w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"}>
                    {mockImageProjectData.map((item, index) => {
                        return (
                            <img alt={"image-name1"}
                                 src={item.imageSrc}
                                 key={`${item.id}-${index}`}
                                 className={"w-[220px] rounded-xl inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"}
                            />
                        )
                    })}
                </div>

                <MdChevronRight
                    onClick={handleslideRight}
                    size={40}
                    className={"opacity-60 cursor-pointer hover:opacity-100"}
                />

            </div>
        </>
    )


}