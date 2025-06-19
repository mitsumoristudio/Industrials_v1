
import {assets} from "../assets/assets";


const mockShippingData = [
    {
        name: 'Building',
        imageSrc: assets.crane_icon,
        description: "Commited to community",
    },
    {
        name: 'Industrial',
        imageSrc: assets.construction,
        description: "Increase business opportunities for interested small partners",
    },
    {
        name: 'Transportation',
        imageSrc: assets.deliverybox,
        description:
            "Our commitment to broad-based community supplier",
    },
]

export default function ShippingFooter() {
    return (
        <div className={"bg-white"}>
            <div className={"mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-6 h-12"}>
                <div className={"rounded-xl bg-slate-400 px-6 py-8 opacity-85 shadow-md sm:p-12"}>
                    <div className={"mx-auto max-w-xl h-auto lg:max-w-none inset-0 relative"}>
                        <div className={"text-center"}>
                            <h2 className={"text-2xl font-bold tracking-tight text-gray-700 py-1"}>
                                Get started with us
                            </h2>
                        </div>

                        <ul className={"mx-auto grid max-w-sm grid-cols-1 gap-x-8 gap-y-6 sm:max-w-none lg:grid-cols-3"}>
                            {mockShippingData.map((incentive, index) => {
                                return (
                                    <li key={`${incentive}-${index}`}>
                                        <div
                                            className={"text-center sm:flex sm:text-left lg:block lg:text-center"}>
                                            <div className={"sm:shrink-0"}>
                                                <div className={"flow-root"}>
                                                    <img alt={""} src={incentive.imageSrc} className={"mx-auto size-16"} />
                                                </div>
                                            </div>
                                            <div className={"mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6"}>
                                                <h3 className={"text-lg font-bold text-gray-900"}>{incentive.name}</h3>
                                                <p className={"mt-2 text-lg text-gray-700"}>{incentive.description}</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}