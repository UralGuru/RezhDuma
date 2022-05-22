import React from 'react';
import classNames from 'classnames/bind'
import styles from './Pagination.module.css';
import {HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft} from 'react-icons/hi'

let cx = classNames.bind(styles);

function Pagination({page, setPage, totalCount, itemsPerPage}) {

  const pageCount = Math.ceil(totalCount / itemsPerPage);

  const setPageSAFE = (num) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        <a className={`${styles.toggle} ${styles.arrow}`} onClick={() => setPageSAFE(page - 1)}>{<HiOutlineArrowNarrowLeft />}</a>
          {(page !== 1) &&
        <a className={styles.toggle} onClick={() => setPageSAFE(1)}>{'1'}</a>}
          {!(page < 4) && 
        <a className={styles.toggle} onClick={() => setPageSAFE(page - 2)}>{page - 2}</a>}
          {!(page < 3) && 
        <a className={styles.toggle} onClick={() => setPageSAFE(page - 1)}>{page - 1}</a>}
        <a className={cx('toggle', 'active')}>{page}</a>
          {!(page > pageCount - 2) && 
        <a className={styles.toggle} onClick={() => setPageSAFE(page + 1)}>{page + 1}</a>}
          {!(page > pageCount - 3) && 
        <a className={styles.toggle} onClick={() => setPageSAFE(page + 2)}>{page + 2}</a>}
          {(page !== pageCount) &&
        <a className={styles.toggle} onClick={() => setPageSAFE(pageCount)}>{pageCount}</a>}
        <a className={`${styles.toggle} ${styles.arrow}`} onClick={() => setPageSAFE(page + 1)}>{<HiOutlineArrowNarrowRight />}</a>
      </div>
    </div>
  );
}

export default Pagination;