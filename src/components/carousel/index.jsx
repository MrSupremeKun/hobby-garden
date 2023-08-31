import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import noImage from '../../images/noImage.png'
import "swiper/css";
import "swiper/css/navigation";
import styles from './carousel.module.scss'
import './carousel.scss'
import { useState } from 'react';
import ShowCard from '../showCard';

const image_url = process.env.REACT_APP_IMAGE_URL

function Carousel({ data, title, all, top }) {
    const [dataId, setDataId] = useState(0)
    return (
        <div className={styles.carousel}>
            {
                title === "top"
                    ? <h2 className={styles.carousel__top_title}>{title} <span>10</span></h2>
                    : <h2 className={styles.carousel__title}>{title} <FiChevronRight /></h2>
            }

            {
                top ? (
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={25}
                        navigation={true}
                        modules={[Navigation]}
                        className={styles.carousel__top_swiper}
                    >
                        {top?.map((slide, i) => (
                            <SwiperSlide key={i} onClick={() => setDataId(slide.id)} className={styles.carousel__top_slide}>
                                <h3 className={styles.carousel__top_num}>{i + 1}</h3>
                                <img src={slide?.backdrop_path ? `${image_url}/original/${slide?.backdrop_path}` : noImage} alt="" className={styles.carousel__top_bg} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={25}
                        navigation={true}
                        modules={[Navigation]}
                        className={styles.carousel__swiper}
                    >
                        {data?.map((slide, i) => (
                            <SwiperSlide key={i} onClick={() => setDataId(slide.id)}>
                                <img src={slide.backdrop_path ? `${image_url}/original/${slide.backdrop_path}` : noImage} alt="" className={styles.carousel__bg} />
                            </SwiperSlide>
                        ))}
                        <SwiperSlide>
                            <h2 className={styles.carousel__lastSlide}>
                                <FiChevronRight />
                                <span>{all}</span>
                            </h2>
                        </SwiperSlide>
                    </Swiper>
                )
            }
            {dataId && <ShowCard dataId={dataId} setDataId={setDataId} />}
        </div>
    )
}

export default Carousel