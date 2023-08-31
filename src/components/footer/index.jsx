import React from 'react'
import { Link } from 'react-router-dom'
import { footerData } from '../../helpers'
import styles from './footer.module.scss'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__media}>
        {
          footerData.map((link,i) => (
            <Link
              key={i}
              to={link.path}
              className={styles.footer__link}
            >{link.name}</Link>
          ))
        }
      </div>
      <div className={styles.footer__info}>
        <p className={styles.footer__text}>&copy; {year} CINEPHILE. Может содержать информацию, не предназначенную для несовершеннолетних</p>
        <p className={styles.footer__text}>Данные получены с сайта themoviedb.org</p>
      </div>
      <div className={styles.footer__brand}>
        <h2 className={styles.footer__brand_title}>PROWEB</h2>
        <p className={styles.footer__brand_text}>курсы современных профессий</p>
      </div>
    </footer>
  )
}

export default Footer