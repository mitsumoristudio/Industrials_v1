import  {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

// @ts-ignore
import {Helmet} from "react-helmet";
import {useUploadProjectImageMutation, useUpdateProjectMutation, useGetProjectQuery} from "../../features/projectApiSlice";
import {useNavigate, useParams} from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";
import {FaCircleArrowLeft} from "react-icons/fa6";


export const AddProjectEditPage = () => {
    const {id: projectIdParam} = useParams();
    const projectId = Number(projectIdParam);

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [scope_of_work, setScope_of_work] = useState<number>(0);
    const [company_name, setCompany_name] = useState<string>("");
    const [jobnumber, setJobnumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [city_state, setCity_state] = useState<string>("")
    const [job_contact_name, setJob_contact_name] = useState<string>("");
    const [image, setImage] = useState<string>("");

    // @ts-ignore
    const {userInfo} = useSelector((state) => state.auth)
    const usersID = userInfo?.id || 10;
    // @ts-ignore
    const {data: project, isLoading, isError, refetch} = useGetProjectQuery(projectId);
    const [updateProjectImage] = useUploadProjectImageMutation();
    // @ts-ignore
    const [updateProject] = useUpdateProjectMutation();
    const navigate = useNavigate();

    const onBackHandler = () => {
        navigate("/admin/projecttable");
    }

    const uploadImageHandler = async (e: any) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await updateProjectImage(formData).unwrap()
            toast.success("Image uploaded successfully.");

            setImage(res.image)
        } catch (error: any) {
            toast.error("Error updating image uploaded successfully.", error);
        }
    }

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        if (!projectId || isNaN(projectId)) {
            toast.error("Invalid project ID.");
            return;
        }

        try {
            await updateProject({
                id: projectId,
                name: name,
                description: description,
                address: address,
                city_state: city_state,
                jobnumber: jobnumber,
                scope_of_work: scope_of_work,
                image: image,
                company_name: company_name,
                job_contact_name: job_contact_name,
                users_id: usersID ,
            }).unwrap();
            toast.success("Project updated successfully.");
            refetch();
            navigate("/");
        } catch (error: any) {
            toast.error("Error updating project", error);
        }
    }

    useEffect(() => {
        console.log("projectIdParam:", projectIdParam);
        console.log("Parsed projectId:", projectId);
    }, [projectIdParam, projectId]);

    useEffect(() => {

        if (project?.data) {
            setName(project?.data.name);
            setDescription(project?.data.description);
            setAddress(project?.data.address);
            setJobnumber(project?.data.jobnumber);
            setScope_of_work(project?.data.scope_of_work);
            setImage(project?.data.image);
            setCity_state(project?.data.city_state);
            setJob_contact_name(project?.data.job_contact_name);
            setCompany_name(project?.data.company_name);
        }

    }, [project?.data, project?.data.name, project?.data.description, project?.data.address,
        project?.data.city_state, project?.data.job_contact_name, project?.data.jobnumber, project?.data.scope_of_work,
        project?.data.email, project?.data.company_name, project?.data.image] );

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const parsedValue = newValue === "" ? "" : parseFloat(newValue)

        if (!isNaN(parsedValue as number) || newValue === "") {
            // @ts-ignore
            setScope_of_work(parsedValue)
        }
    }


    return (
        <>
            <Helmet>
                <title>Project Edit</title>
                <meta name="description" content="Project Edit Page" />
            </Helmet>
            {isLoading ? (
                <CustomLoader />
            ) : isError ? (
                <div className={"text-red-600"}>Error Loading Project Data</div>
            ) : (
                <main>
                    <button className={"my-2 mx-2 "}
                            onClick={() => onBackHandler()}>
                        <FaCircleArrowLeft size={36}/>
                    </button>
                    <section
                        className="bg-white p-8 rounded-xl shadow-xl transform transition duration-500 hover:scale-[1.01]">


                        <h2 className="text-4xl font-extrabold text-indigo-800 mb-6 border-b-4 border-indigo-300 pb-2 inline-block">
                            Edit Project
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
                                       type={"name"}
                                       value={name}
                                       required={true}
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
                                       data-cx={"input-address"}
                                       onChange={(e) => setAddress(e.target.value)}/>
                            </div>

                            <div className={'w-full'}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"city_state-headline"}
                                >City, State</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       placeholder={"Enter City, State"}
                                       type={"city_state"}
                                       value={city_state}
                                       required={true}
                                       data-cx={"input-city_state"}
                                       onChange={(e) => setCity_state(e.target.value)}/>
                            </div>

                            <div className={'w-full '}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"scopeofwork-headline"}
                                >Scope of Work ($)</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       placeholder={"Enter value"}
                                       type={"scopeofwork"}
                                       value={scope_of_work}
                                       required={true}
                                       data-cx={"input-scopeofwork"}
                                       onChange={handleNumChange}
                                />
                            </div>

                            <div className={'w-full'}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"company-headline"}
                                >Company</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       placeholder={"Enter company name"}
                                       type={'companyname'}
                                       value={company_name}
                                       required={true}
                                       data-cx={"input-company"}
                                       onChange={(e) => setCompany_name(e.target.value)}/>
                            </div>

                            <div className={'w-full'}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"contact-headline"}
                                >Job Contact</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       placeholder={"Enter contact name"}
                                       type={'contact_name'}
                                       value={job_contact_name}
                                       required={true}
                                       data-cx={"input-contact_person"}
                                       onChange={(e) => setJob_contact_name(e.target.value)}/>
                            </div>

                            <div className={'w-full'}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"jobnumber-headline"}
                                >Job Number</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       placeholder={"Enter Job Number"}
                                       type={"jobnumber"}
                                       value={jobnumber}
                                       required={true}
                                       data-cx={"input-jobnumber"}
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
                                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                {/*-Always add value for text area to carry the context */}
                                <textarea
                                    onChange={(e: any) => setDescription(e.target.value)}
                                    id="description"
                                    value={description}
                                    name="description"
                                    rows={5}
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
                </main>
            )}
        </>
    )
}