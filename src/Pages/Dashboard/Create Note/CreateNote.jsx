import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";

const CreateNote = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div><div className="loader20">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div></div>;
    }

    const handleAddNote = async (event) => {
        event.preventDefault();

        const form = event.target;

        const title = form.title.value;
        const email = form.email.value;
        const description = form.description.value;

        const newNote = { title, email, description };

        // console.log(newReview)

        // send data to the server

        const res = await fetch('https://assignment-12-server-silk-phi.vercel.app/note', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        });

        const data = await res.json();
        if (data.insertedId) {
            toast.success("Note Created Successfully");
        }
    };

    return (
        <div className="ml-32">
            <div>
                <ToastContainer />
                <div className="mt-4 bg-gray-200 shadow8 pt-5 pb-8 md:ml-0 rounded-3xl lg:w-[745px] pl-[40px]">
                    <h3 className="text-3xl font-semibold ml-48 text-gray-500">Create A Note Now</h3>
                    <div className=" md:w-1/3 mt-10 ">
                        <form
                        onSubmit={handleAddNote}
                        >
                            <div>
                                <div className="lg:flex md:flex gap-16">
                                    <div>
                                        {/* title */}
                                        <h4 className="mb-2 text-base font-bold text-gray-600">Title</h4>
                                        <input className="mb-8 lg:w-[300px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" placeholder="Title" name="title" id="" required />
                                    </div>
                                    <div>
                                        {/* email */}
                                        <h4 className="mb-2 text-base font-bold text-gray-600">Your Email</h4>
                                        <input className="mb-8 lg:w-[300px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" defaultValue={user.email} placeholder="Your Email" name="email" id="" readOnly required />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-base font-bold text-gray-600">Description</h4>
                                    <textarea className="textarea textarea-bordered mb-8 lg:w-[665px] h-[250px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Description" name="description" id="" required></textarea>

                                    <input className="btn hover:bg-orange-800 cursor-pointer ml-10 lg:ml-0 md:ml-0 mt-1 lg:w-[665px] md:w-[580px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-500 text-white text-lg font-medium" type="submit" value="Save Note" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;
