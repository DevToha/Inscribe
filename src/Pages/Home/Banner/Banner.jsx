import bannerImage1 from './Banner image/magic-fairytale-book-concept (1).jpg';
import bannerImage2 from './Banner image/magic-fairytale-book-concept.jpg';
import bannerImage3 from './Banner image/open-book-with-fairytale-scene (1).jpg';
import bannerImage4 from './Banner image/open-book-with-fairytale-scene (2).jpg';
import bannerImage5 from './Banner image/open-book-with-fairytale-scene (3).jpg';
import bannerImage6 from './Banner image/open-book-with-fairytale-scene.jpg';
import './Banner.css';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const images = [
        { src: bannerImage1, alt: "Magic Fairytale Book Concept 1" },
        { src: bannerImage2, alt: "Magic Fairytale Book Concept 2" },
        { src: bannerImage3, alt: "Open Book with Fairytale Scene 1" },
        { src: bannerImage4, alt: "Open Book with Fairytale Scene 2" },
        { src: bannerImage5, alt: "Open Book with Fairytale Scene 3" },
        { src: bannerImage6, alt: "Open Book with Fairytale Scene 4" }
    ];

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.src} alt={image.alt} className="banner-image" />
                    </SwiperSlide>
                ))}
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
};

export default Banner;
