import React from 'react'
import styles from './card.module.scss'
import { useNavigate } from 'react-router-dom'

const image_url = process.env.REACT_APP_IMAGE_URL
function Card({path,title,movieId}) {
  const navigate = useNavigate()
  return (
    <div className={styles.card}>
        <img src={`${image_url}/original${path}`} alt={title}  onClick={()=>navigate(`/details/${movieId}`)}  />
    </div>
  )
}

export default Card