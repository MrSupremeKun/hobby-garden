import React from 'react'
import Youtube from 'react-youtube'
import Loader from '../loader'
import useGetData from '../../hooks/useGetData'
import Container from '../../layout/container'
import NotFound from '../../pages/NotFound'
import styles from './thrillers.module.scss'
import { useParams } from 'react-router-dom'

function Thrillers() {
    const { id } = useParams()
    const [movie, loading, error] = useGetData(`/movie/${id}/videos`)
    if (!movie?.results || error) {
        return <NotFound />
    }
    if (loading) {
        return <Loader />
    }
    const options = {
        height:"700px",
        width:"100%"
    }
    return (
        <div className={styles.thrillers}>
            <Container className={styles.thrillers__container}>
                <Youtube videoId={movie?.results[0]?.key} opts={options} className={styles.thrilles__video} />
            </Container>
        </div>
    )
}

export default Thrillers