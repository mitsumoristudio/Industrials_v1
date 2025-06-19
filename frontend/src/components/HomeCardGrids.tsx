
import { AiFillAlert, AiFillCrown, AiFillDiff, AiFillEnvironment, AiFillZhihuCircle  } from "react-icons/ai";
import { ImHammer } from "react-icons/im";

export default function HomeCardGrids() {
    const cardData = [
        { headline: 'Safety', description: 'We put safety first for our people before the project deadline.', icon: AiFillAlert },
        { headline: 'Engineering', description: 'Build by in house design team', icon: AiFillCrown },
        { headline: 'Design', description: 'Innovative approach to reduce waste and cost measures', icon: AiFillDiff},
        { headline: 'Respect', description: 'We are passionate about our work', icon: AiFillEnvironment },
        { headline: 'Teamwork', description: 'All for one', icon: AiFillZhihuCircle },
        { headline: 'Reputation', description: 'Dedicated in achieving success', icon: ImHammer},
    ]

    return (
        <>
            <h2 className={"text-4xl font-semibold text-gray-800 text-center opacity-90 gap-2"}>Our Practice</h2>
            <section className={"bg-white py-2"}>

                <div className={"min-h-3.5 bg-gray-200 py-2 px-4 shadow-lg "}>
                    <div
                        className={"grid grid-cols-4 sm: grid-cols-2 md: grid-cols-4 lg: grid-cols-4 gap-4 max-w-6xl mx-auto shadow-md"}>
                        {cardData.map((card, index) => (
                            <div key={`${index}-${card}`}
                                 className={"bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300" +
                                     "group relative cursor-pointer my-2 hover:translate-y-[-5px] transition-all duration-300"}
                            >
                                <card.icon className={"size-6 text-yellow-400"}/>
                                <h2 className={"text-xl font-bold text-blue-800 mb-2"}>{card.headline}</h2>

                                <p className={"text-gray-700 font-semibold"}>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}