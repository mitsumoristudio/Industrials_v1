
import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useNavigate, useParams,} from "react-router-dom";
import {useDispatch, } from "react-redux";
import CustomLoader from "../../components/CustomLoader";
import {setCredentials} from "../../features/authSlice";
import {useGetUserDetailsQuery, useUpdateUserMutation} from "../../features/userApiSlice";

import {Helmet} from "react-helmet";

export default function EditUserScreen() {
    const {id: userIdParam} = useParams();
    const userID = Number(userIdParam);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {data: user, isLoading, isError, refetch} = useGetUserDetailsQuery(userID);
    const [updateUser] = useUpdateUserMutation();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!userID || isNaN(userID)) {
            toast.error("User ID is invalid.");
            return;
        }
        try {
            await updateUser({
                id: userID,
                name: name,
                email: email,
                password: password,
            }).unwrap();


            refetch();
            dispatch(setCredentials(updateUser));
            toast.success("User updated successfully");
            navigate("/");
        } catch (error) {
            toast.error("Error updating user details.", error);
        }
    }

    useEffect(() => {
        console.log("User ID", userID)
    }, [userID])

    useEffect(() => {
        if (user?.data) {
            setName(user.data?.name);
            setEmail(user.data?.email);
            setPassword(user.data?.password);
        }
    }, [user?.data, user?.data.name, user?.data.email, user?.data.password]);

return (
    <>
        <Helmet>
            <title>Edit User</title>
            <meta name="description" content="Edit User" />
        </Helmet>
        {isLoading ? (
            <CustomLoader />
        ) : isError ? (
            <div className={"text-red-700"}>Error Loading User Data</div>
        ) : (

            <main>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="name"
                                    required={true}
                                    value={name}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required={true}
                                    value={email}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="john@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="confirmpassword"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="******"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/usertable")}
                                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmitHandler}
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
        )}
    </>
)

}