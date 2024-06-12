import { BookOpenIcon } from "@heroicons/react/24/solid";

const Footer = () => {
    return (
        <div>
            <div className="mt-20 bg-[#284358] lg:h-[350px] md:h-[400px] lg:pt-32 pt-20">

                <footer className='md:pl-20'>
                    <footer className=" footer text-base-content md:mb-16">
                        <nav>
                            <div className='flex lg:gap-5 md:gap-5 gap-0 lg:ml-0 md:ml-0 ml-20'>
                                <BookOpenIcon className='w-10 h-10 lg:mt-1 text-blue-600' />
                                <h6 className="text-4xl font-bold md:ml-0 ml-10 text-white  text12">Inscribe</h6>
                            </div>
                        </nav>
                        <nav className="lg:ml-24 ml-7 text-white">
                            <h6 className="lg:text-4xl text-2xl ml-[85px] md:ml-[60px] font-semibold mb-3 lg:ml-[28px]">Quick Links</h6>
                            <div className=" text-lg font-medium lg:mt-0 mt-8 lg:ml-2 md:ml-0 ml-12">
                                <a className="hover:underline cursor-pointer">Facebook</a>
                                <a className="hover:underline cursor-pointer mx-5">Linked In</a>
                                <a className="hover:underline cursor-pointer">Twitter</a>
                                {/* <a className="hover:underline cursor-pointer ml-5">Whats App</a> */}
                            </div>
                        </nav>
                        <nav className="lg:ml-[90px] ml-[5px] lg:mt-0 mt-8 mb-8  lg:inline sm:inline md:hidden text-white">
                            <h6 className="lg:text-xl font-medium ml-10">58 A, East Madison Street, Baltimore, MD, USA 4508</h6>
                            <div className="lg:ml-[247px] ml-[99px] lg:text-xl font-medium">
                                <a className="">Mail: devtoha@gmail.com</a>
                            </div>
                            <div className="lg:ml-[283px] ml-[109px] lg:text-xl font-medium">
                                <a className="">Phone: 01934670567</a>
                            </div>
                        </nav>

                    </footer>

                    <div className="lg:hidden hidden md:inline text-white md:ml-[200px]">
                        <h6 className="text-2xl font-medium ml-14">58 A, East Madison Street, Baltimore, MD, USA 4508</h6>
                        <div className="md:ml-[322px] text-xl font-medium">
                            <a className="">Mail: devtoha@gmail.com</a>
                        </div>
                        <div className="md:ml-[351px] text-xl font-bold">
                            <a className="">Phone: 01934670567</a>
                        </div>
                    </div>

                </footer>

            </div>
        </div>
    );
};

export default Footer;