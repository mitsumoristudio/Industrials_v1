
import {useState} from "react";
import {toast} from "react-toastify";
import {Link, useNavigate,} from "react-router-dom";
import {useSelector} from "react-redux";
import {useCreateContactMutation } from "../../features/contactApiSlice";
import {Helmet} from "react-helmet-async";

export default function AddContactPage() {
    // @ts-ignore
    const {userInfo} = useSelector((state) => state.auth)
    const usersID = userInfo?.id || 1;
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [createContact] = useCreateContactMutation();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await createContact({
                name: name,
                email: email,
                company_name: company,
                phone: phone,
                position: position,
                user_id: usersID,
            }).unwrap()
            toast.success("Successfully created contact");
            navigate("/")
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return (
        <>
            <Helmet>
                <title>Add Contact</title>
                <meta name="description" content="Add Contact Page" />
            </Helmet>
            <form className={'min-h-[80vh] w-full flex items-center p-2'}
                  onSubmit={onSubmitHandler}
            >
                <div
                    className={"flex flex-col py-4 gap-2 m-auto min-w-96 items-start rounded-lg p-5 max-w-[600px] sm: min-w-280 border rounded-xl" +
                        "text-zinc-700 text-sm shadow-lg "}
                >
                    <h1 className={"text-2xl font-semibold text-center text-gray-800"}
                        data-cy={"add-contact"}
                    >Add New Contact
                    </h1>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"contact-headline"}
                        >Contact Name</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter contact name"}
                               type={"name"}
                               value={name}
                               required={true}
                               data-cy={"contact_name"}
                               data-cx={"input-contact"}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"email-headline"}
                        >Email</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter email"}
                               type={"email"}
                               value={email}
                               required={true}
                               data-cy={"email"}
                               data-cx={"input-email"}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"company-headline"}
                        >Company</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter Company"}
                               type={"company"}
                               value={company}
                               required={true}
                               data-cy={"company"}
                               data-cx={"input-company"}
                               onChange={(e) => setCompany(e.target.value)}/>
                    </div>

                    <div className={'w-full '}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"position-headline"}
                        >Position</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"Enter position"}
                               type={"position"}
                               value={position}
                               required={true}
                               data-cy={"position"}
                               data-cx={"input-position"}
                               onChange={(e) => setPosition(e.target.value)}/>
                    </div>

                    <div className={'w-full py-2'}>
                        <p className={"mb-1 text-lg font-semibold"}
                           data-cy={"phone-headline"}
                        >Phone Number</p>
                        <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                               placeholder={"(123)-453-2399"}
                               type={"phone"}
                               value={phone}
                               required={false}
                               data-cy={"phone"}
                               data-cx={"input-phone"}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>


                    <div className={"flex flex-row mx-auto gap-6 my-1"}>
                        <button
                            type="submit"

                            className="flex max-w-xs  flex-1 items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        >
                            Submit
                        </button>

                        <Link to={"/admin/contacttable"}>
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