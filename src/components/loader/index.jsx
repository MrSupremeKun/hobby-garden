import React from 'react'
import styles from './loader.module.scss'

function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.loader__spinner}>
                <div className={styles.loader__spinner1}></div>
            </div>
        </div>
    )
}

export default Loader