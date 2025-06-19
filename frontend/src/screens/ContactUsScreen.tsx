import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

// @ts-ignore
import {Helmet} from "react-helmet"


export default function ContactUsScreen() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const navigate = useNavigate();
    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        // @ts-ignore
        const res = await fetch("/api/contactUs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await res.json();
     //   alert(data.message);
        toast.success("Message sent successfully.");
        navigate("/");
    };

    return (
        <>
            <Helmet>
                <title>Contact Us</title>
                <meta name="description" content="Contact Us" />
            </Helmet>
            <section className={"my-2 mx-2 py-8 px-6 md: px-12 bg-gray-50 rounded-lg shadow-lg"}>
                <h2 className={"font-bold text-2xl md:text-2xl max-w-3xl mx-auto opacity-95 text-gray-800"}>
                    Have a question or ready to work with us? We're here to help you every step of the way to get the project
                    moving.
                </h2>
            </section>
            <section className={" mx-auto py-16 px-6 items-center md:px-12 max-w-3xl"}>
                <div className={"bg-white p-6 rounded-2xl shadow-xl border border-gray-100"}>
                    <h2 className={"text-3xl font-bold text-blue-800 mb-8"}>
                        Send Us A Message
                    </h2>
                    <form className={"space-y-6"}
                    onSubmit={onSubmitHandler}>
                        <div className={"items-center mx-auto"}>
                            <div className={'w-full py-2'}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"contact-headline"}
                                > Name</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       placeholder={"Enter name"}
                                       id={"name"}
                                       name={"name"}
                                       type={"name"}
                                       required={true}
                                       data-cx={"input-name"}
                                       value={formData.name}
                                       onChange={handleChange}/>
                            </div>

                            <div className={'w-full '}>
                                <p className={"mb-1 text-lg font-semibold"}
                                   data-cy={"email-headline"}
                                >Email</p>
                                <input className={'border border-zinc-700 rounded-lg w-full p-2 pt-1'}
                                       id={"email"}
                                       name={"email"}
                                       placeholder={"Enter email"}
                                       type={"email"}
                                       required={true}
                                       value={formData.email}
                                       onChange={handleChange}/>
                            </div>

                            <div className={"my-4 "}>
                                <label htmlFor="message" className="block text-gray-800 text-lg font-bold mb-2">Your
                                    Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-40 px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y text-lg"
                                    placeholder="Tell us about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                            >
                                Submit
                            </button>

                        </div>

                    </form>
                </div>

            </section>


        </>
    )
}