import {useState} from "react";
import {motion} from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoSyncCircleSharp } from "react-icons/io5";
import {Link, useParams, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import CustomLoader from "../../components/CustomLoader";
import {Helmet} from "react-helmet"
import {useGetAllContactsQuery, useDeleteContactMutation} from "../../features/contactApiSlice";



export default function ContactTableScreen() {
    const {keyword, pageNumber} = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [deleteContact] = useDeleteContactMutation();
    const {data: contacts, isLoading, isError, refetch} = useGetAllContactsQuery({keyword, pageNumber});
    const [filterContact, setFilterContact] = useState(contacts);

    const handleSearchHandler = (e: any) => {
        const term = e.target.value.toLowerCase() as string;
        setSearchTerm(term);

        const filtered = contacts?.data.filter((project : any) => project.name.toLowerCase().includes(term));
        setFilterContact(filtered);
    }

    const deleteHandler = async (id:any) => {
        if (window.confirm("Are you sure you want to delete this product now?")) {
            try {
                await deleteContact(id);
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
                <title>Contact Table</title>
                <meta name="description" content="Contact Table page" />
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
                        <h2 className='text-xl font-semibold text-gray-100'>Project Contacts</h2>
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
                            <Link to="/admin/addContact">
                                <button
                                    className={" right-2 mt-1 bg-blue-800 text-white text-md px-4 py-3 rounded-3xl shadow-md cursor-pointer " +
                                        "hover:scale-110 transition-all duration-500"}>
                                    <FaPlus size={16} aria-placeholder={"Create Contact"}/>
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
                                    Name
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Email
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Company
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Position
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Contact Number
                                </th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider'>
                                    Adjust
                                </th>
                            </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-700'>
                            {filterContact?.data.map((contact :any, index) => (
                                <motion.tr
                                    key={`${contact.id}-${index}`}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.3}}
                                >

                                    <td className='px-6 py-4 whitespace-nowrap' key={`${contact.id}-${index}`}>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 h-10 w-10'>
                                                <div
                                                    className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                    {contact.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium text-gray-100'>{contact.name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{contact.email}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{contact.company_name}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{contact.position}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-300'>{contact.phone}</div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                        <Link to={`/admin/contacts/edit/${contact.id}`}>
                                            <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
                                        </Link>

                                        <button className='text-red-400 hover:text-red-300'
                                                onClick={() => deleteHandler(contact.id)}>Delete
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