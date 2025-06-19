
import {useNavigate, useParams} from "react-router-dom";
import {useGetProjectQuery} from "../features/projectApiSlice";
import CustomLoader from "../components/CustomLoader";
import { FaCircleArrowLeft, FaBuilding, FaMoneyCheckDollar, FaMapLocationDot, FaEarthAmericas } from "react-icons/fa6";
import { BsPersonVcardFill } from "react-icons/bs";
import { BsFillBuildingFill } from "react-icons/bs";

// @ts-ignore
import {Helmet} from "react-helmet"



export default function ProjectDetailScreen() {
    const {id} = useParams();
    const navigate = useNavigate();
    // @ts-ignore
    const {data: project, isError, isLoading} = useGetProjectQuery(id);

    const onBackHandler = () => {
        navigate("/projects");
    }


    return (
        <main>
            <Helmet>
                <title>Project details</title>
                <meta name="description" content="Details" />
            </Helmet>
            <div className={"bg-white mx-auto max-w-7xl overflow-hidden sm: px-6 lg: px-8"}>
                {isLoading ? (
                    <div className={"py-6 mb-2"}>
                        <CustomLoader />
                    </div>
                ) : isError ? (
                    <div className={"text-red-600"}>{isError}</div>
                ) : (
                    < div className={"container mx-auto px-6"}>
                        <button className={"my-4"}
                            onClick={() => onBackHandler()}>
                            <FaCircleArrowLeft size={36}/>
                        </button>

                        <div className={"lg:grid lg:grid-cols-5 lg:gap-12"}>
                            <div className={"lg:col-span-3"}>
                                <h1 className={"text-4xl font-bold text-gray-800 mb-2"}>{project.data.name}</h1>

                                <div className="relative">
                                    <img src={project.data.image} alt={project.data.name}
                                         className="w-full h-96 py-1 rounded-lg object-cover shadow-md"/>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
                                    <span
                                        className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                                        {project.data.jobnumber}</span>

                                    <h2 className={"text-2xl font-bold text-gray-800 mb-4"}>Project Description</h2>
                                    <p className={"text-gray-600 leading-relaxed"}>{project.data.description}</p>
                                </div>

                            </div>

                            <div className={"lg:col-span-2 mt-10 lg:mt-0"}>
                                <div className={"bg-gray-50 p-4 rounded-lg shadow-md sticky top-20"}>
                                    <h3 className={"text-xl font-bold text-gray-800 mb-4"}>Project Details</h3>
                                    <ul className={"space-y-4"}>
                                        <li className={"flex items-center text-gray-800 font-medium"}>
                                            <FaBuilding size={20}/>
                                            <strong className={"mx-1"}>
                                                Contractor:
                                            </strong>
                                            <span className={"m-1 font-light"}>{project.data.company_name}</span>
                                        </li>
                                        <li className={"flex items-center text-gray-800 font-medium"}>
                                            <FaMoneyCheckDollar size={20}/>
                                            <strong className={"mx-1"}>
                                                Scope of Work :
                                            </strong>
                                            <span className={"m-1 font-light"}>${project.data.scope_of_work}</span>
                                        </li>
                                        <li className={"flex items-center text-gray-800 font-medium"}>
                                            <FaMapLocationDot size={20}/>
                                            <strong className={"mx-1"}>
                                                Address:
                                            </strong>
                                            <span className={"m-1 font-light"}>{project.data.address}</span>
                                        </li>
                                        <li className={"flex items-center text-gray-800 font-medium"}>
                                            <FaEarthAmericas size={20}/>
                                            <strong className={"mx-1"}>
                                                City, State:
                                            </strong>
                                            <span className={"m-1 font-light"}>{project.data.city_state}</span>
                                        </li>
                                        <li className={"flex items-center text-gray-800 font-medium"}>
                                            <BsPersonVcardFill size={20}/>
                                            <strong className={"mx-1"}>
                                                Contact:
                                            </strong>
                                            <span className={"m-1 font-light"}>{project.data.job_contact_name}</span>
                                        </li>
                                        <li className={"flex items-center text-gray-800 font-medium"}>
                                            <BsFillBuildingFill size={20}/>
                                            <strong className={"mx-1"}>
                                                Market:
                                            </strong>
                                            <span className={"m-1 font-light"}>Commercial</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </main>
    )
}