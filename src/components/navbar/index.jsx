import React, { useState } from 'react'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import Container from '../../layout/container'
import { navbarData } from '../../helpers'
import logo from '../../images/logo.png'
import styles from './navbar.module.scss'

function Navbar() {
  const [changeBg, setChangeBg] = useState(false)
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 200) {
      setChangeBg(true)
    } else {
      setChangeBg(false)
    }
  })
  return (
    <nav className={changeBg ? classNames(styles.navbar, styles.navbar_active) : styles.navbar}>
      <Container className={styles.navbar__container}>
        <Link to={"/"} className={styles.navbar__logo}>
          <img src={logo} alt="logo" className={styles.navbar__logo_img} />
        </Link>
        <div className={styles.navbar__list}>
          {
            navbarData.map((link,i) => (
              <NavLink
                key={i}
                to={link.path}
                className={({ isActive }) => isActive
                  ? classNames(styles.navbar__link, styles.navbar__link_active)
                  : styles.navbar__link}
              >{link.name}</NavLink>
            ))
          }
        </div>
      </Container>
    </nav>
  )
}

export default Navbar