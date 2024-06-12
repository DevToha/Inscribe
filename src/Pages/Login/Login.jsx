import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../Firebase/Firebase.config";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { signInUser } = useContext(AuthContext);
    const [catchError, setCatchError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        document.title = "Login Page";
    }, [location.pathname]);

    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate(location?.state?.from || '/', { replace: true });
                Swal.fire({
                    title: "Good job",
                    text: "You Successfully Login",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: "Error Found",
                    text: "Please Clicked The OK Button and Try Again",
                    icon: "error"
                });
            });

        setCatchError('');
        setSuccess('');
    };

    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider()

    const handleGoogleButton = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const GoogleUser = result.user;
                console.log(GoogleUser);

                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'Student' // Set default role as Student
                };

                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to database');
                        }
                    });

                navigate(location?.state?.from || '/', { replace: true });
                Swal.fire({
                    title: "Good job",
                    text: "You Successfully Login With Google",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('error', error.message);
                Swal.fire({
                    title: "Error Found",
                    text: "Please Click The OK Button and Try Again",
                    icon: "error"
                });
            });
    };


    const handleGitHubButton = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const gitHubUser = result.user;
                console.log(gitHubUser);

                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'Student' // Set default role as Student
                };

                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to database');
                        }
                    });

                navigate(location?.state?.from || '/', { replace: true });
                Swal.fire({
                    title: "Good job",
                    text: "You Successfully Login With GitHub",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('error', error.message);
                Swal.fire({
                    title: "Error Found",
                    text: "Please Click The OK Button and Try Again",
                    icon: "error"
                });
            });
    };


    return (
        <div className="pt-10">
            <div className="bg-[#f7f7f7] mt-[85px] shadow-xl border-2 border-gray-300 py-5 px-1 lg:pl-[115px] md:pl-[153px] md:ml-[70px] lg:ml-[450px] rounded-3xl lg:w-[600px] md:w-[600px] w-[300px] ml-8">
                <div className="md:w-1/3 mt-10 mb-10">
                    <h3 className="text-3xl mb-8 lg:ml-[60px] ml-8 font-semibold w-[240px]">Lets get started!</h3>
                    <form onSubmit={handleSignIn}>
                        <input className="mb-4 lg:w-[352px]  w-[290px]  py-2 px-4 border-2 border-gray-300 rounded-md" type="email" placeholder="Email Address" name="email" required />
                        <br />
                        <input className="mb-4 lg:w-[352px]  w-[290px] py-2 px-4 border-2 border-gray-300 rounded-md" type="password" placeholder="Password" name="password" required />
                        {catchError && <p className="text-base font-medium text-red-500">{catchError}</p>}
                        {success && <p className="text-base font-medium text-green-600">{success}</p>}
                        <br />
                        <input className="btn hover:bg-green-500 cursor-pointer mb-4 lg:w-[352px]  w-[290px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-600 text-white font-semibold" type="submit" value="LOG IN" />
                    </form>
                    <div className="flex gap-4 mb-3 ml-2 lg:w-[355px] md:w-[270px]">
                        <div className="bg-gray-500 w-[138px] h-[2px] mt-3"></div>
                        <div>OR</div>
                        <div className="bg-gray-500 w-[138px] h-[2px] mt-3"></div>
                    </div>
                    <div className="mb-4 relative">
                        <button
                            onClick={handleGoogleButton}
                            className="btn hover:bg-blue-500 cursor-pointer lg:w-[352px]  w-[290px] py-2 px-4 border-2 rounded-md border-gray-300 bg-white text-base font-semibold">Continue With Google</button>
                        <span className="absolute top-3 lg:left-16 left-8 text-xl"><FcGoogle /></span>
                    </div>
                    <div className="relative">
                        <button
                            onClick={handleGitHubButton}
                            className="hover:bg-blue-500 cursor-pointer lg:w-[352px]  w-[290px] py-2 px-4 border-2 rounded-md border-gray-300 bg-white text-base font-semibold">Continue With GitHub</button>

                        <span className="absolute top-3 left-16 text-xl"><FaGithub /></span>
                    </div>
                    <p className="mt-4 lg:ml-[53px] ml-4 w-[270px] font-medium">NEW TO THE WEBSITE? <Link to="/register" className="text-blue-800 font-bold underline underline-offset-4">REGISTER</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
