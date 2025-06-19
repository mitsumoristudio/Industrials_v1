
import {useState} from "react";
import {motion} from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoSyncCircleSharp } from "react-icons/io5";
import {Link, useParams, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import CustomLoader from "../components/CustomLoader";
import {useGetAllProjectsQuery, useDeleteProjectMutation} from "../features/projectApiSlice";
import {Helmet} from "react-helmet"

export default function ProjectTableScreen() {
    const {keyword, pageNumber} = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteProject] = useDeleteProjectMutation();

    const navigate = useNavigate();
    const {data: projects, isLoading, isError, refetch} = useGetAllProjectsQuery({keyword, pageNumber});
    const [filterProject, setFilterProject] = useState(projects);

    const handleSearchHandler = (e: any) => {
        const term = e.target.value.toLowerCase() as string;
        setSearchTerm(term);

        const filtered = projects?.data.filter((project : any) => project.name.toLowerCase().includes(term));
        setFilterProject(filtered);
    }

    const deleteHandler = async (id:any) => {
        if (window.confirm("Are you sure you want to delete this product now?")) {
            try {
                await deleteProject(id);
                refetch()
                toast.success("Product deleted successfully.");
                navigate("/")
            } catch (error) {
                toast.error("Problem with deleting this product now!");
            }
        }
    }

    const onRefreshHandler = async () => {
        refetch();
    }

    return (
        <>
            <Helmet>
                <title>Project Table</title>
                <meta name="description" content="Project Table page" />
            </Helmet>
            {isLoading ? (
                <CustomLoader />
            ) : isError ? (
                <div>{isError}</div>
            ) : (
                <motion.div
                    className='mx-4 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mt-6 px-4 py-2'
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                >
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-semibold text-gray-100'>Projects</h2>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Search Products...'
                                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-16 pr-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={searchTerm}
                                onChange={handleSearchHandler}
                            />
                            <CiSearch className='absolute left-3 top-2.5 text-gray-400' size={18}/>
                        </div>

                        <div className={"flex flex-row gap-4 mx-2"}>
                            <Link to="/admin/addProject">
                                <button
                                    className={" right-2 mt-1 bg-blue-800 text-white text-md px-4 py-3 rounded-3xl shadow-md cursor-pointer " +
                                        "hover:scale-110 transition-all duration-500"}>
                                    <FaPlus size={16} aria-placeholder={"Create Product"}/>
                                </button>
                            </Link>
                            <button className={"right-2 mt-1 bg-green-400 text-white text-md px-4 py-3 rounded-3xl shadow-md cursor-pointer " +
                                "hover:scale-110 transition-all duration-500"}
                                    onClick={() => onRefreshHandler}
                            >
                                <IoSyncCircleSharp size={16} />
                            </button>
                        </div>


                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-700'>
                            <thead>
                            <tr>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Project Name
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Project Job Number
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Scope of Work
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Company
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Address
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    City, State
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Contact
                                </th>

                            </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-700'>
                            {filterProject?.data.map((project: any, index) => (
                                <motion.tr
                                    key={`${project.id}-${index}`}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.3}}
                                >

                                    <td className='px-6 py-4 whitespace-nowrap' key={`${project.id}-${index}`}>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 h-10 w-10'>
                                                <div
                                                    className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                    {project.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium text-gray-100'>{project.name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{project.jobnumber}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>${project.scope_of_work}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{project.company_name}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{project.address}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{project.city_state}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{project.job_contact_name}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {/*<span*/}
                                        {/*    className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-blue-100'>*/}
                                        {/*	{project.category}*/}
                                        {/*</span>*/}
                                    </td>


                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                        <Link to={`/admin/projects/edit/${project.id}`}>
                                            <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
                                        </Link>

                                        <button className='text-red-400 hover:text-red-300'
                                                onClick={() => deleteHandler(project.id)}>Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                            </tbody>


                        </table>

                    </div>
                </motion.div>
            )}

        </>
    )
}