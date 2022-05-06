import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { DOCUMENTS_ROUTE, HISTORY_ROUTE, NEWS_ROUTE, POLLS_ROUTE, PROJECTS_ROUTE, TELEGRAM_ICON, VK_ICON, VOTINGS_ROUTE } from '../../utils/constants';


import styles from './Footer.module.css';

function Footer() {

  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.title_row}>
          <div className={styles.title}>
            {"Официальный сайт города Реж"}
          </div>
          <div className={styles.media_icons}>
            <a className={styles.media_icon} href="/"><img src={VK_ICON}/></a>
            <a className={styles.media_icon} href="/"><img src={TELEGRAM_ICON}/></a>
          </div>
        </div>

        <div className={styles.footer_row}>
          <div className={styles.nav_row}>
            <div className={styles.nav_col}>
              <a onClick={() => navigate(NEWS_ROUTE)} className={styles.nav_item}>Новости</a>
              <a onClick={() => navigate(HISTORY_ROUTE)} className={styles.nav_item}>История</a>
              <a onClick={() => navigate(DOCUMENTS_ROUTE)} className={styles.nav_item}>Документы</a>
            </div>
            <div className={styles.nav_col}>
              <a onClick={() => navigate(VOTINGS_ROUTE)} className={styles.nav_item}>Голосования</a>
              <a onClick={() => navigate(POLLS_ROUTE)} className={styles.nav_item}>Опросы</a>
              <a onClick={() => navigate(PROJECTS_ROUTE)} className={styles.nav_item}>Проекты</a>
            </div>
          </div>
          <div className={styles.contact_info}>
            <div>Адрес: Адрес городской думы</div>
            <div>Тел: 8(3547)898-264</div>
            <div>Эл.адрес: dumaRezh@mail.ru</div>
          </div>
        </div>
      </Container>
    </div> 
  );
}

export default Footer;