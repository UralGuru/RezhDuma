import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import NewsCard from "../../components/shared/NewsCard/NewsCard";
import Container from "../../components/shared/Container/Container";

import styles from './NewsPage.module.css';
import { Outlet } from "react-router-dom";
import Input from "../../components/shared/Input/Input";
import { fetchNews } from "../../http/newsApi";

const NewsPage = observer((props) => {
    const {newsStore} = useContext(Context);
    

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (e) => {
      setSearchQuery(e.target.value);
    }

    // useEffect(() => {
    //     fetchNews().then(data => newsStore.setNews(data));
    // })

    return(
        <Container>
            <div className={styles.outer}>
                <div className={styles.header}>
                    <h2>Новости</h2>
                    <Input 
                    className="page_search-input"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={onSearchChange}
                    />
                </div>
                
                <div className={styles.inner}>
                    {newsStore.News.map((n) => {
                    return <NewsCard 
                        id={n.id}
                        title={n.title}
                        description={n.text}
                        date={n.date}
                        imageSrc={n.imageSrc}
                        />
                    })}
                </div>
            </div>
        </Container>
    );
})

export default NewsPage;