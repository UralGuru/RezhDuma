import React from 'react';
import Container from '../../components/shared/Container/Container';
import { TELEGRAM_ICON, VK_ICON } from '../../utils/constants';


import styles from './Footer.module.css';

function Footer() {
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
              <a href="/news" className={styles.nav_item}>Новости</a>
              <a href="/history" className={styles.nav_item}>История</a>
              <a href="/documents" className={styles.nav_item}>Документы</a>
            </div>
            <div className={styles.nav_col}>
              <a href="/votings" className={styles.nav_item}>Голосования</a>
              <a href="/polls" className={styles.nav_item}>Опросы</a>
              <a href="/projects" className={styles.nav_item}>Проекты</a>
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