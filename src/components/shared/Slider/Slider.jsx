import React, { useEffect, useState } from 'react';
import styles from './Slider.module.css'
import {HiArrowNarrowLeft, HiArrowNarrowRight} from 'react-icons/hi';
import classNames from 'classnames/bind';
import {GoPrimitiveDot} from 'react-icons/go';
import {BsDot} from 'react-icons/bs'

const cx = classNames.bind(styles);

const Slider = ({items, itemsPerPage, responsive, disableButtons=false, disableDots=false}) => {

  const [actualItemsPerPage, setActualItemsPerPage] = useState(itemsPerPage);
  const [windowWidth, setWindowWidth] = useState();
  const [page, setPage] = useState(0);
  const setPageSAFE = (value) => {
    if (value < 0) {
      setPage(0);
    }
    else if (value >= items.length - actualItemsPerPage) {
      if (items.length - actualItemsPerPage <= 0) {
        setPage(0);
      } else {
        setPage(items.length - actualItemsPerPage);
      }
    } else {
      setPage(value);
    }
  }

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    updateItemsPerPage();

    return (() => {
      window.removeEventListener('resize', updateDimensions);
    })
  }, [])

  const updateItemsPerPage = () => {
    if (!responsive) {
      return;
    }
    responsive.forEach(element => {
      if (windowWidth > element.windowWidth) {
        setActualItemsPerPage(element.items)
      }
    });
  }

  useEffect(() => {
    updateItemsPerPage();
  }, [windowWidth])

  return ( 
    <div className={styles.slider_box}>
      <div className={styles.slider}>
        {!disableButtons &&
          <button 
            onClick={() => {setPageSAFE(page - 1)}}
            className={`${styles.nav_button} ${styles.nav_left}`}><HiArrowNarrowLeft/></button>
        }
        <div className={styles.main}>
          {items
          .slice(page, page + actualItemsPerPage)
          .map((element) => {
            return (
              <div className={styles.slider_item}>{element}</div>
            );
          })}
        </div>
        {!disableButtons &&
          <button 
            onClick={() => {setPageSAFE(page + 1)}}
            className={`${styles.nav_button} ${styles.nav_right}`}><HiArrowNarrowRight/></button>
        }
      </div>
      {items.length - actualItemsPerPage >= 0 && 
      <div className={styles.paginator}>
        {Array(items.length - actualItemsPerPage + 1).fill().map((e, i) => i).map((e) => {
          return (
            <button
              className={cx('pagination_button', {'pagination_button_active': (e === page)})}
              onClick={() => {setPageSAFE(e)}}
            >{<GoPrimitiveDot/>}</button>
          )
        })}
      </div>}
    </div>
  );
}
 
export default Slider;