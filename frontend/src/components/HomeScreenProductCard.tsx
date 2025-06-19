
import {mockHomeProjects} from "../mockdata/mockHomeProjects";

export default function HomeScreenProductCard() {
    return (
                <>
                    <div
                        className="mt-3 grid grid-cols-2 px-4 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
                        key={"mockHomeProduct.name"}>
                        {mockHomeProjects?.map((product, index) => (
                            <div key={`${product.id}-${index}`}
                                 className="group relative cursor-pointer my-2 hover:translate-y-[-10px] transition-all duration-500">
                                <div
                                    className="h-56 w-full overflow-hidden rounded-md cursor-pointer bg-gray-200 group-hover:opacity-75 lg:h-62 xl:h-60"
                                    >
                                    <img alt={product.name} src={product.imageSrc}
                                         className="size-full object-cover"/>
                                </div>
                                <h3 className="mt-4 text-lg text-gray-700 font-semibold">
                                    <a href={"/projects"}>
                                        <span className="absolute inset-0"/>
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-md font-medium text-gray-600">{product.project}</p>
                            </div>
                        ))}
                    </div>
                </>
            )
}