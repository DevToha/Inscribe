import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div>
            <div className="bg-[#f7f7f7] mt-10 shadow8 py-5 px-1 lg:pl-[115px] md:pl-[153px] md:ml-[70px] lg:ml-[450px] rounded-3xl lg:w-[600px] md:w-[600px] w-[300px] ml-8">
                <div className=" md:w-1/3 mt-10 mb-10">
                    <h3 className="text-3xl mb-8 lg:ml-[60px] ml-8 font-semibold w-[230px]">Lets get started!</h3>
                    <form
                        // onSubmit={handleSignIn}
                    >
                        <input className="mb-4 lg:w-[352px]  w-[290px]  py-2 px-4 border-2 border-gray-300 rounded-md" type="email" placeholder="Email Address" name="email" id="" required />
                        <br />
                        <input className="mb-4 lg:w-[352px]  w-[290px] py-2 px-4 border-2 border-gray-300 rounded-md" type="password" placeholder="Password" name="password" id="" required />
                        {/* {
                            catchError && <p className="text-base font-medium text-red-500">{catchError}</p>
                        }

                        {
                            success && <p className="text-base font-medium text-green-600">{success}</p>
                        } */}
                        <br />
                        <input className="cursor-pointer mb-4 lg:w-[352px]  w-[290px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-600 text-white font-semibold" type="submit" value="LOG IN" />
                    </form>

                    <div className="flex gap-4 mb-3 ml-2 lg:w-[355px] md:w-[270px]">
                        <div className="bg-gray-500 w-[138px] h-[2px] mt-3"></div>
                        <div className="">OR</div>
                        <div className="bg-gray-500 w-[138px] h-[2px] mt-3"></div>
                    </div>

                    <div className="mb-4 relative">
                        <button
                            // onClick={handleGoogleButton}
                            className="cursor-pointer lg:w-[352px]  w-[290px] py-2 px-4 border-2 rounded-md border-gray-300 bg-white text-base font-semibold">Continue With Google</button>

                        <span className="absolute top-3 lg:left-16 left-8 text-xl"><FcGoogle /></span>
                        {/* <ToastContainer /> */}
                    </div>

                    <p className="mt-4 lg:ml-[53px] ml-4 w-[270px] font-medium">NEW TO THE WEBSITE ? <Link to="/register"> <a className="text-blue-800 font-bold underline underline-offset-4" href="">REGISTER</a></Link></p>

                </div>

            </div>
        </div>
    );
};

export default Login;