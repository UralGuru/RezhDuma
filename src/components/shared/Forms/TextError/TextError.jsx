import React from 'react'
import styles from './TextError.module.css'

function TextError (props) {
  return <div className={styles.error}>{props.children}</div>
}

export default TextError;