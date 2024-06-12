import bannerImage1 from './Banner image/magic-fairytale-book-concept (1).jpg';
import bannerImage2 from './Banner image/magic-fairytale-book-concept.jpg';
import bannerImage3 from './Banner image/open-book-with-fairytale-scene (1).jpg';
import bannerImage4 from './Banner image/open-book-with-fairytale-scene (2).jpg';
import bannerImage5 from './Banner image/open-book-with-fairytale-scene (3).jpg';
import bannerImage6 from './Banner image/open-book-with-fairytale-scene.jpg';
import './Banner.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="slide-content">
                    <img src={bannerImage2} alt="Banner 1" />
                    <div className="slide-text mb-20">2960 Thousands Dream
                        Jobs Available Now</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <img src={bannerImage1} alt="Banner 2" />
                    <div className="slide-text">Default Text 2</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <img src={bannerImage3} alt="Banner 3" />
                    <div className="slide-text">Default Text 3</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <img src={bannerImage4} alt="Banner 4" />
                    <div className="slide-text">Default Text 4</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <img src={bannerImage5} alt="Banner 5" />
                    <div className="slide-text">Default Text 5</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <img src={bannerImage6} alt="Banner 6" />
                    <div className="slide-text">Default Text 6</div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;
