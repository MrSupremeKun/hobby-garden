import React from 'react'
import styles from "./pages.module.scss";
import Intro from '../components/intro';
import Loader from '../components/loader';
import useGetData from '../hooks/useGetData';
import Carousel from '../components/carousel';

function Home() {
  const [movies] = useGetData('movie/popular')
  const [series] = useGetData('tv/popular')
  const [top] = useGetData('movie/top_rated')

  if (!movies?.results && !series?.results && !top?.results) {
    return <Loader />
  }
  console.log(movies);
  return (
    <div>
      <Intro data={movies?.results} />
      <Carousel data={movies?.results} title={"movies"} all={"All movies"} />
      <Carousel data={series?.results} title={"series"} all={"All series"} />
      <div className={styles.home__rating}>
        <Carousel top={top?.results?.slice(0, 10)} title={"top"} />
      </div>
    </div>
  )
}

export default Home