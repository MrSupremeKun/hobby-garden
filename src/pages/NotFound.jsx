import React from 'react'
import styles from './pages.module.scss'
import error from '../images/error.jpg'

function NotFound() {
  return (
    <div className={styles.notfound}>
      <img src={error} alt="error" />
    </div>
  )
}

export default NotFound