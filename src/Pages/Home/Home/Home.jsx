import Banner from "../Banner/Banner";
import StudySession from "../Study session/StudySession";
import Tutor from "../Tutor section/Tutor";


const Home = () => {
    return (
        <div>
            <div className="">
                <Banner></Banner>
            </div>
            <StudySession></StudySession>
            <Tutor></Tutor>
        </div>
    );
};

export default Home;