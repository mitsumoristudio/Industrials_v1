import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate,} from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet"
import {
    useCreateProjectMutation,
    useUploadProjectImageMutation
} from "../../features/projectApiSlice";


// @ts-ignore
export default function CreateProjectScreen() {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [scopeofwork, setScopeofwork] = useState<number>(0);
    const [companyName, setCompanyName] = useState<string>("");
    const [jobnumber, setJobnumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [city_state, setCity_state] = useState<string>("")
    const [contactPerson, setContactPerson] = useState<string>("");


    const [image, setImage] = useState<string>("");

    const navigate = useNavigate();

    // @ts-ignore
    const {userInfo} = useSelector((state) => state.auth)
    const usersID = userInfo?.id || 1;

    const [createProject] =useCreateProjectMutation();
    const [updateProjectImage] = useUploadProjectImageMutation();

    const uploadImageHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await updateProjectImage(formData).unwrap()
            toast.success("Image uploaded successfully.");

            setImage(res.image)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const parsedValue = newValue === "" ? "" : parseFloat(newValue)

        if (!isNaN(parsedValue as number) || newValue === "") {
            // @ts-ignore
            setScopeofwork(parsedValue)
        }
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await createProject({
                name: name,
                description: description,
                address: address,
                city_state: city_state,
                jobnumber: jobnumber,
                job_contact_name: contactPerson,
                scope_of_work: scopeofwork,
                image: image,
                company_name: companyName,
                users_id: usersID,
            }).unwrap();
            toast.success("Successfully uploaded successfully.");
            navigate("/")

        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    const onBackHandler = () => {
        navigate("/admin/projecttable");
    }

    return (
        <>
            <Helmet>
                <title>Add Project</title>
                <meta name="description" content="Add Project Page" />
            </Helmet>
            <button className={"my-2 mx-2 "}
                    onClick={() => onBackHandler()}>
                <FaCircleArrowLeft size={36}/>
            </button>
            <section className="bg-white p-8 rounded-xl shadow-xl transform transition duration-500 hover:scale-[1.01]">

                <h2 data-cy={"add-title"}
                    className="text-4xl font-extrabold text-indigo-800 mb-6 border-b-4 border-indigo-300 pb-2 inline-block">
                    Add New Project
                </h2>

                {/* Contact Form */}
                <form className="space-y-6"
                      onSubmit={onSubmitHandler}>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"project-headline"}
                        >Project Name</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter project name"}
                               type={name}
                               value={name}
                               required={true}
                               data-cy={"project_name"}
                               data-cx={"input-project"}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className={'w-full'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"address-headline"}
                        >Address</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter address"}
                               type={"address"}
                               value={address}
                               required={true}
                               data-cy={"address"}
                               data-cx={"input-address"}
                               onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                    <div className={'w-full'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"city_headline"}
                        >City, State</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter City, State"}
                               type={"city_state"}
                               value={city_state}
                               required={true}
                               data-cy={"city"}
                               data-cx={"input_city"}
                               onChange={(e) => setCity_state(e.target.value)}/>
                    </div>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"scope_headline"}
                        >Scope of Work</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter value"}
                               type={"scopeofwork"}
                               value={scopeofwork}
                               required={true}
                               data-cy={"scope_of_work"}
                               data-cx={"input_scope"}
                               onChange={handleNumChange}
                        />
                    </div>

                    <div className={'w-full'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"company_headline"}
                        >Company</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter company name"}
                               type={'companyname'}
                               value={companyName}
                               required={true}
                               data-cy={"company"}
                               data-cx={"input_company"}
                               onChange={(e) => setCompanyName(e.target.value)}/>
                    </div>

                    <div className={'w-full'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"contact_headline"}
                        >Contact</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter contact name"}
                               type={'contact_name'}
                               value={contactPerson}
                               required={true}
                               data-cy={"contact"}
                               data-cx={"input_contact"}
                               onChange={(e) => setContactPerson(e.target.value)}/>
                    </div>

                    <div className={'w-full'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"job_headline"}
                        >Job Number</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter Job Number"}
                               type={"jobnumber"}
                               value={jobnumber}
                               required={true}
                               data-cy={"job_number"}
                               data-cx={"input_job_number"}
                               onChange={(e) => setJobnumber(e.target.value)}/>
                    </div>

                    <div className={"col-span-2 h-40 border-b-gray-700"}>
                        <label htmlFor="cover-photo" className="block text-md font-medium text-gray-900">
                            Add photo
                        </label>

                        <label
                            className={"cursor-pointer flex items-center justify-center w-full h-32  border-dashed border-gray-400 rounded-lg" +
                                "hover:border-blue-600 transition"}
                            htmlFor={"image-upload"}
                        >
                            {image ? (
                                <img src={image} alt={"Preview"} className={"h-full object-contain"}/>
                            ) : (
                                <span className={"text-gray-800"}>Click to upload an image</span>
                            )}
                        </label>
                        <input
                            id={"image-upload"}
                            type="file"
                            accept={"image/*"}
                            className={"hidden"}
                            onChange={uploadImageHandler}
                        />

                    </div>

                    <div>
                        <label data-cy={"description_headline"}
                            htmlFor="message" className="block text-lg font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                            name="description"
                            rows={5}
                            data-cy={"description"}
                            data-cx={"input_description"}
                            placeholder="Your message here..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900 placeholder-gray-500 resize-y"
                        ></textarea>
                    </div>
                    <button
                        type="submit"

                        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Submit
                    </button>
                </form>
            </section>

        </>
    )
}




