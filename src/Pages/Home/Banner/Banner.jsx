import bannerImage from './Banner image/large-collection-old-books-wooden-shelves-generated-by-ai.jpg';
import './Banner.css'; // Import the CSS file

const Banner = () => {
    return (
        <div className='banner-container'>
            <img className='h-[650px] min-w-full banner-image' src={bannerImage} alt="Banner" />
        </div>
    );
};

export default Banner;
