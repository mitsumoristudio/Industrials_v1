
import {useState} from "react";
import {toast} from "react-toastify";
import {Link, useNavigate,} from "react-router-dom";
import {Field, Label, Textarea} from "@headlessui/react";
import {useSelector} from "react-redux";
import {
    useCreateProjectMutation,
    useUploadProjectImageMutation
} from "../features/projectApiSlice";


export default function AddProjectPage() {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [scopeofwork, setScopeofwork] = useState<number>(0);
    const [companyName, setCompanyName] = useState<string>("");
    const [jobnumber, setJobnumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [city_state, setCity_state] = useState<string>("")
    const [contactPerson, setContactPerson] = useState<string>("");
    const [id, setId] = useState<number>(0);

    const [image, setImage] = useState<string>("");

    const navigate = useNavigate();

    // @ts-ignore
    const {userInfo} = useSelector((state) => state.auth)
    const usersID = userInfo?.id || 1;

    const [createProject] =useCreateProjectMutation();
    const [updateProjectImage] = useUploadProjectImageMutation();

    const uploadImageHandler = async (e: any) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await updateProjectImage(formData).unwrap()
            toast.success("Image uploaded successfully.");

            setImage(res.image)
        } catch (error: any) {
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

    const handleIDNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const parsedValue = newValue === "" ? "" : parseFloat(newValue)

        if (!isNaN(parsedValue as number) || newValue === "") {
            // @ts-ignore
            setId(parsedValue)
        }
    }

        const onSubmitHandler = async (e: any) => {
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

            } catch (error: any) {
                toast.error(error?.data?.message || error.message);
            }
        }

    return (
        <>
            <form className={'min-h-[100vh] w-full flex items-center p-2 '}
                  onSubmit={onSubmitHandler}
            >
                <div
                    className={"flex flex-col gap-2 m-auto items-start rounded-lg p-5 max-w-[600px] sm: min-w-280 border rounded-xl" +
                        "text-zinc-700 text-sm shadow-lg "}
                >
                    <h1 className={"text-2xl font-semibold text-center text-gray-800"}
                        data-cy={"addProduct-title"}
                    >Add new project
                    </h1>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"project-headline"}
                        >Project Name</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter project name"}
                               type={name}
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
                        >Scope of Work</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter value"}
                               type={"scopeofwork"}
                               value={scopeofwork}
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
                               value={companyName}
                               required={true}
                               data-cx={"input-company"}
                               onChange={(e) => setCompanyName(e.target.value)}/>
                    </div>

                    <div className={'w-full'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"contact-headline"}
                        >Contact</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter contact name"}
                               type={'contact_name'}
                               value={contactPerson}
                               required={true}
                               data-cx={"input-contact_person"}
                               onChange={(e) => setContactPerson(e.target.value)}/>
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

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"id-headline"}
                        >Project ID</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter Project ID"}
                               type={"projectID"}
                               value={id}
                               required={true}
                               data-cx={"input-id"}
                               onChange={handleIDNumChange}
                        />
                    </div>

                    <div className="col-span-full h-80 border-b-gray-700">
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

                        <Field onChange={(e: any) => setDescription(e.target.value)}>
                            <Label className={"font-semibold text-md "}>Description</Label>
                            <div className={"max-w-full px-12 flex flex-col mx-auto mt-3 my-2 "}>
                                <Textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={"p-2 text-lg border border-gray-500 focus:ring-2 ring-offset-blue-600 rounded-lg items-center h-20 w-96 justify-center"}
                                    name={"Description"}/>
                            </div>
                        </Field>

                    </div>
                    <div className={"flex flex-row mx-auto gap-6 "}>
                        <button
                            type="submit"
                            data-cy={"submit"}
                            className="flex max-w-xs  flex-1 items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        >
                            Submit
                        </button>

                        <Link to={"/admin/projecttable"}>
                            <button
                                data-cy={"cancel"}
                                className="flex max-w-xs   flex-1 items-center justify-center rounded-lg border border-transparent bg-red-300 px-8 py-2 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                            > Cancel
                            </button>
                        </Link>

                    </div>

                </div>


            </form>
        </>
    )
}