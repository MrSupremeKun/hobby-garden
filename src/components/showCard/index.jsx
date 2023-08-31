import React from 'react'
import { MdClose } from 'react-icons/md'
import { HiMenuAlt2 } from 'react-icons/hi'
import useGetData from '../../hooks/useGetData'
import styles from './showcard.module.scss'
import classNames from 'classnames'
import Actor from '../actor'
import { useNavigate } from 'react-router-dom'

const image_url = process.env.REACT_APP_IMAGE_URL
function ShowCard({ dataId, setDataId}) {
    const navigate = useNavigate()
    const [movie] = useGetData(`movie/${dataId}`)
    const [serie] = useGetData(`tv/${dataId}`)
    const [movieActors] = useGetData(`movie/${dataId}/casts`)

    return (
        <div className={dataId ? classNames(styles.show, styles.active) : styles.show}>
            <button className={styles.show__cancel} onClick={() => setDataId(0)}>
                <MdClose />
            </button>
            <div className={styles.show__info}>
                <h2 className={styles.show__title}>{movie?.title || serie?.name}</h2>
                <p className={styles.show__text}>{movie?.overview || serie?.overview}</p>
                <div className={styles.show__about}>
                    <p className={styles.show__year}>{new Date(movie?.release_date || serie?.first_air_date).getFullYear()}, </p>
                    {movie?.genres?.map((genre) => (
                        <p key={genre.id} className={styles.show__genre}>{genre.name}, </p>
                    ))}
                    {serie?.genres?.map((genre) => (
                        <p key={genre.id} className={styles.show__genre}>{genre.name}, </p>
                    ))}
                    <p className={styles.show__time}>{movie?.runtime && `${Math.floor(movie?.runtime / 60)}ч ${movie?.runtime % 60}м`}</p>
                </div>
                <div className={styles.show__actors}>
                    {
                        movieActors?.cast?.slice(0, 4).map((actor) => (
                            <Actor key={actor.id} image={actor.profile_path} name={actor.name} />
                        ))
                    }
                </div>
                <button className={styles.show__button} onClick={()=>navigate(`/details/${movie?.id || serie?.id}`)}>
                    <HiMenuAlt2 />
                    <span>Подробнее</span>
                </button>
            </div>
            <img src={`${image_url}/original${movie?.backdrop_path || serie?.backdrop_path}`} alt={movie?.title || serie?.name} className={styles.show__image} />
        </div>
    )
}

export default ShowCard