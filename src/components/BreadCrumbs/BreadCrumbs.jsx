import React from 'react';
import styles from './BreadCrumbs.module.css';
import {Link, useMatch} from 'react-router-dom';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const CrumbLink = ({children, to, className}) => {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      className={
        cx('crumb', {'crumb_active': match}, className)
      }>
        <div>{children}</div>
    </Link>
  );
}

// образец: data = [
// {'label': 'Главная', 'path': '/'}, 
// {'label': 'Профиль', 'path': '/profile'}, 
// {'label': 'Обращения', 'path': '/profile/requests'}]

const BreadCrumbs = ({data, className}) => {
  return ( 
    <div className={styles.breadcrumbs}>
      {data.map((crumb) => {
        return (
          <div key={crumb.path} className={styles.breadcrumb}>
            <CrumbLink to={crumb.path} className={className}>{crumb.label}</CrumbLink>
            {(data[data.length - 1].path !== crumb.path) && <div className={cx(className)}>/</div>}
          </div>)
      })}
    </div>
  );
}
 
export default BreadCrumbs;