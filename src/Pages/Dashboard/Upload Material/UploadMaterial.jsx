import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";



const UploadMaterial = () => {

    const { user } = useContext(AuthContext);

    const handleAddJob = async (event) => {
        event.preventDefault();

        const form = event.target;

        const sessionTitle = form.sessionTitle.value;
        const tutorName = form.tutorName.value;
        const tutorEmail = form.tutorEmail.value;


        const newSession = {
            sessionTitle,
            tutorName,
            tutorEmail,
        };

        console.log(newSession)
    }

    return (
        <div>
            <div className="bg-[#3b7f9188] mt-12 shadow8 py-5  md:ml-0 lg:ml-[250px] rounded-3xl lg:w-[485px]">
                <h3 className="text-3xl font-semibold text-gray-600 ml-32">Upload Material</h3>
                <div className=" md:w-1/3 mt-10 mb-10 md:pl-[92px]">
                    <form onSubmit={handleAddJob}>

                        <input className="mb-10 lg:w-[305px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Title" name="status" required />

                        <input className="mb-10 lg:w-[305px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Study session ID" name="status" required />

                        <input className="mb-10 lg:w-[305px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Status" defaultValue={user.email} name="status" required readOnly />

                        <input className="mb-10 lg:w-[305px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Image upload" name="status" required />


                        <input className=" btn cursor-pointer ml-10 lg:ml-0 md:ml-0 mt-1 lg:w-[305px] md:w-[580px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-500 text-white text-lg font-medium" type="submit" value="Upload Now" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadMaterial;