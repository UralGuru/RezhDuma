import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import NewsCard from "../../components/shared/NewsCard/NewsCard";
import Container from "../../components/shared/Container/Container";

import styles from './NewsPage.module.css';
import { Outlet } from "react-router-dom";

const NewsPage = observer((props) => {
    const {newsStore} = useContext(Context);

    // useEffect(() => {
    //     fetchNews().then(data => setNews(data));
    // })

    return(
        <Container>
            <div className={styles.page_title}>Новости</div>
            <div className={styles.outer}>
                {newsStore.News.map((n) => {
                return <NewsCard 
                    id={n.id}
                    title={n.title}
                    description={n.text}
                    date={n.date}
                    />
                })}
            </div>
        </Container>
    );
})

export default NewsPage;