import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import styles from './details.module.scss'
import Actor from '../actor'
import Container from '../../layout/container'

const image_url = process.env.REACT_APP_IMAGE_URL
function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recommend, setRecommend] = useState(null)
  const [movie, setMovie] = useState(null)
  const [serie, setSerie] = useState(null)
  const [movieActors, setMovieActors] = useState(null)
  // const [movie] = useGetData(`movie/${dataId}`)
  // const [serie] = useGetData(`tv/${dataId}`)
  // const [movieActors] = useGetData(`movie/${dataId}/casts`)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setRecommend(data))
  }, [id])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
  }, [id])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setSerie(data))
  }, [id])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/movie/${id}/casts?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovieActors(data))
  }, [id])
  console.log(recommend);
  return (
    <>
      <div className={styles.details}>
        <div className={styles.details__info}>
          <div>
            <h2 className={styles.details__title}>{movie?.title || serie?.name}</h2>
            <p className={styles.details__text}>{movie?.overview || serie?.overview}</p>
            <div className={styles.details__about}>
              <p className={styles.details__year}>{new Date(movie?.release_date || serie?.first_air_date).getFullYear()}, </p>
              {movie?.genres?.map((genre,i) => (
                <p key={i} className={styles.details__genre}>{genre.name}, </p>
              ))}
              {serie?.genres?.map((genre,i) => (
                <p key={i} className={styles.details__genre}>{genre.name}, </p>
              ))}
              <p className={styles.details__time}>{movie?.runtime && `${Math.floor(movie?.runtime / 60)}ч ${movie?.runtime % 60}м`}</p>
            </div>
            <button className={styles.details__button} onClick={() => navigate(`/thrillers/${movie?.id}`)}>
              <FaPlay />
              <span>Смотерть трейлер</span>
            </button>
            <p className={styles.details__role}>В главных ролях</p>
            <div className={styles.details__actors}>
              {
                movieActors?.cast?.slice(0, 4).map((actor,i) => (
                  <Actor key={i} image={actor.profile_path} name={actor.name} />
                ))
              }
            </div>
          </div>
          <img src={`${image_url}/original${movie?.backdrop_path || serie?.backdrop_path}`} alt={movie?.title || serie?.name} className={styles.details__image} />
        </div>
        <img src={`${image_url}/original${movie?.backdrop_path || serie?.backdrop_path}`} alt={movie?.title || serie?.name} className={styles.details__bg} />
      </div>
      <Container className={styles.details__content}>
        <div className={styles.details__block}>
          <div className={styles.details__box}>
            <h4 className={styles.details__box_title}>Бюджет</h4>
            <p className={styles.details__box_text}>${movie?.budget?.toLocaleString()}</p>
          </div>
          <div className={styles.details__box}>
            <h4 className={styles.details__box_title}>Сборы</h4>
            <p className={styles.details__box_text}>${movie?.revenue?.toLocaleString()}</p>
          </div>
          <div className={styles.details__box}>
            <h4 className={styles.details__box_title}>Статус</h4>
            <p className={styles.details__box_text}>{movie?.status}</p>
          </div>
          <div className={styles.details__box}>
            <h4 className={styles.details__box_title}>Исходное название</h4>
            <p className={styles.details__box_text}>{movie?.tagline}</p>
          </div>
        </div>
        <div className={styles.details__recommend}>
          <h3 className={styles.details__recommend_title}>Рекомендации</h3>
          <div className={styles.details__recommend_box}>
            {recommend?.results?.filter((item)=>item.backdrop_path !== null).slice(0, 4).map((el,i) => (
              <div key={i} className={styles.details__recommend_movie} onClick={()=>navigate(`/details/${el?.id}`)}>
                <img src={`${image_url}/original${el?.backdrop_path}`} alt={el?.title} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Details