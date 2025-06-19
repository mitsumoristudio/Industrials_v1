
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
// @ts-ignore
import {Helmet} from "react-helmet"
import {Link, useNavigate, useParams,} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetContactQuery, useUpdateContactMutation} from "../../features/contactApiSlice";
import CustomLoader from "../../components/CustomLoader";

export default function AddContactEditPage() {
    // @ts-ignore
    const {userInfo} = useSelector((state) => state.auth)
    const usersID = userInfo?.id || 1;

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company_name, setCompany_name] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const navigate = useNavigate();

    const {id: contactIdParam} = useParams();
    const contactId = Number(contactIdParam);
    //@ts-ignore
    const {data: contact, isLoading, isError, refetch} = useGetContactQuery(contactId);
    const [updateContact] = useUpdateContactMutation();

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        if (!contactId || isNaN(contactId)) {
            toast.error("Invalid contact ID");
            return;
        }
        try {
            await updateContact({
                id: contactId,
                name: name,
                email: email,
                company_name: company_name,
                position: position,
                phone: phone,
                user_id: usersID,
            }).unwrap();
            toast.success("Successfully updated contact");
            refetch();
            navigate("/");
        } catch (error: any) {
            toast.error("Error updating contact", error);
        }
    }

    useEffect(() => {
        console.log("contactIdParam", contactIdParam);
        console.log("Parsed contactId:", contactId);
    }, [contactIdParam, contactId]);

    useEffect(() => {
        if (contact?.data) {
            setName(contact?.data.name);
            setEmail(contact?.data.email);
            setCompany_name(contact?.data.company_name);
            setPosition(contact?.data.position);
            setPhone(contact?.data.phone);
        }
    }, [contact?.data, contact?.data.position, contact?.data.name, contact?.data.email, contact?.data.company, contact?.data.phone ]);

return (
    <>
        <Helmet>
            <title>Edit Contacts</title>
            <meta name="description" content="Edit Contacts Page"/>
        </Helmet>
        {isLoading ? (
            <CustomLoader />
        ) : isError ? (
            <div className={"text-red-600"}>Error Loading Contact Data</div>
        ) : (
            <section>
                <form className={'min-h-[80vh] w-full flex items-center p-2'}
                      onSubmit={onSubmitHandler}
                >
                    <div
                        className={"flex flex-col py-4 gap-2 m-auto min-w-96 items-start rounded-lg p-5 max-w-[600px] sm: min-w-280 border rounded-xl" +
                            "text-zinc-700 text-sm shadow-lg "}
                    >
                        <h1 className={"text-2xl font-semibold text-center text-gray-800"}
                            data-cy={"addProduct-title"}
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
                                   data-cx={"input-name"}
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
                                   value={company_name}
                                   required={true}
                                   data-cx={"input-company"}
                                   onChange={(e) => setCompany_name(e.target.value)}/>
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
                                   data-cx={"input-phone"}
                                   onChange={(e) => setPhone(e.target.value)}/>
                        </div>


                        <div className={"flex flex-row mx-auto gap-6 my-1"}>
                            <button
                                type="submit"
                                data-cy={"submit"}
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


            </section>
        )}

    </>
)
}