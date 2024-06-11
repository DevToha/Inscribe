import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import Swal from 'sweetalert2';

const CreateSession = () => {
    const { user } = useContext(AuthContext);

    const handleAddJob = async (event) => {
        event.preventDefault();

        const form = event.target;

        const sessionTitle = form.sessionTitle.value;
        const tutorName = form.tutorName.value;
        const tutorEmail = form.tutorEmail.value;
        const sessionDescription = form.sessionDescription.value;
        const registrationStartDate = form.registrationStartDate.value;
        const registrationEndDate = form.registrationEndDate.value;
        const classStartTime = form.classStartTime.value;
        const classEndDate = form.classEndDate.value;
        const sessionDuration = form.sessionDuration.value;
        const registrationFee = form.registrationFee.value;
        const status = form.status.value;

        const newSession = {
            sessionTitle,
            tutorName,
            tutorEmail,
            sessionDescription,
            registrationStartDate,
            registrationEndDate,
            classStartTime,
            classEndDate,
            sessionDuration,
            registrationFee,
            status,
            creatorEmail: user.email
        };

        console.log(newSession);

        try {
            const response = await fetch('http://localhost:5000/studySession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSession)
            });

            const data = await response.json();
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                    title: "Session Added Successfully",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error adding session:', error);
        }
    };

    return (
        <div>
            <div className="bg-[#3b7f9188] shadow8 py-5 lg:pl-[92px] md:pl-[92px] pl-[80px] md:ml-0 lg:ml-[100px] rounded-3xl lg:w-[785px]">
                <h3 className="text-3xl font-semibold ml-32 text-gray-600">Let Create Study Session</h3>
                <div className=" md:w-1/3 mt-10 mb-10">
                    <form onSubmit={handleAddJob}>
                        <div className="lg:flex md:flex gap-16">
                            <div>
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" placeholder="Session Title" name="sessionTitle" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Tutor name" defaultValue={user.displayName} name="tutorName" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Tutor email" defaultValue={user.email} name="tutorEmail" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Session Description" name="sessionDescription" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" placeholder="Registration start date" name="registrationStartDate" required />
                            </div>
                            <div>
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Registration end date" name="registrationEndDate" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="photoURL" placeholder="Class start date" name="classStartTime" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Class end date" name="classEndDate" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Session duration" name="sessionDuration" required />
                                <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="email" placeholder="Registration fee" defaultValue={0} name="registrationFee" required readOnly />
                            </div>
                        </div>
                        <div>
                            <input className="mb-10 lg:w-[605px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Status" defaultValue="Pending" name="status" required readOnly />
                            <input className=" btn cursor-pointer ml-10 lg:ml-0 md:ml-0 mt-1 lg:w-[605px] md:w-[580px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-500 text-white text-lg font-medium" type="submit" value="ADD NOW" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSession;
