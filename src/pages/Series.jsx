import { useEffect, useState } from 'react'
import Container from '../layout/container'
import styles from "./pages.module.scss";
import Loader from '../components/loader';
import Card from '../components/card';

function Series() {
  const [movies,setMovies] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tv/popular?page=${page}&api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies((prev)=> [...prev,...data?.results])
        setLoading(false)
      })
  }, [page])

  const scrollMovie = ()=>{
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true)
      setPage(prev => prev + 1 )
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll",scrollMovie)
    return ()=> window.removeEventListener("scroll",scrollMovie)
  },[])
  
  return (
    <div className={styles.page}>
      <Container className={styles.page__container}>
        <div className={styles.page__box}>
          {movies?.filter((el)=>el?.backdrop_path !== null).map((el)=>(
            <Card path={el?.backdrop_path} title={el?.name} movieId={el?.id} />
          ))}
        </div>
        {loading && <Loader />}
      </Container>
    </div>
  )
}

export default Series