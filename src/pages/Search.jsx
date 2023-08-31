import React, { useEffect, useState } from 'react'
import Container from '../layout/container'
import styles from "./pages.module.scss";
import Card from '../components/card';

function Search() {
  const [search,setSearch] = useState('')
  const [movie,setMovie] = useState(null)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/search/movie?query=${search}&api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
  }, [search])
  console.log(movie);
  return (
    <div className={styles.page}>
      <Container className={styles.page__container}>
        <input 
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder='Найти фильм, сериал...'
          className={styles.page__input}
        />
        <div className={styles.page__box}>
          {movie?.results?.filter((el)=>el?.backdrop_path !== null).map((el)=>(
            <Card path={el?.backdrop_path} title={el?.title}  movieId={el?.id}/>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Search