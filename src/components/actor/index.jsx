import React from 'react'
import styles from './actor.module.scss'

const image_url = process.env.REACT_APP_IMAGE_URL
function Actor({image,name}) {
  return (
    <div className={styles.actor}>
        <img src={`${image_url}/w500${image}`} alt={name}  className={styles.actor__image} />
        <p className={styles.actor__name} >{name}</p>
    </div>
  )
}

export default Actor