import React from 'react';

import styles from './ProgressBar.module.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const ProgressBar = ({ done, isMaximum=false }) => {

  return ( 
    <div className={styles.progress_bar}>
      <div 
        className={cx('progress_done', { 'progress_maximum': isMaximum })} 
        style={ {width: `${done > 100 ? 100 : done}%`} }
      ><span>{done}%</span>
      </div>
    </div>
  );
}
 
export default ProgressBar;