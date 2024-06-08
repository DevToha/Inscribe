

const CreateSession = () => {
    return (
        <div>
            <div>
                <div className="bg-[#3b7f9188] shadow8 py-5 lg:pl-[92px] md:pl-[92px] pl-[80px] md:ml-0 lg:ml-[100px] rounded-3xl lg:w-[785px]">
                    <h3 className="text-3xl font-semibold ml-32 text-gray-600">Lets Create Study Session</h3>
                    <div className=" md:w-1/3 mt-10 mb-10">
                        <form 
                        // onSubmit={handleAddJob}
                        >
                            <div>
                                <div className="lg:flex md:flex gap-16">
                                    <div>
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" placeholder="Job Title" name="job_title" id="" required />
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Job Category" name="job_category" id="" required />
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Salary range" name="salary_range" id="" required />
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Job Description" name="job_description" id="" required />
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" placeholder="User Name" name="user_name" id="" required />
                                    </div>
                                    <div>
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Job Posting Date" name="job_posting_date" id="" required />
                                    
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="photoURL" placeholder="Job Banner ( Use Image URL)" name="job_banner_url" id="" required />
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Job Applicants Number" name="job_applicants_number" id="" required />
                                        <input className="mb-10 lg:w-[270px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="email" placeholder="User Email" name="user_email" id="" required />
                                    </div>
                                </div>
                                <div>
                                    <input className=" btn cursor-pointer ml-10 lg:ml-0 md:ml-0 mt-1 lg:w-[605px] md:w-[580px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-500 text-white text-lg font-medium" type="submit" value="ADD NOW" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSession;