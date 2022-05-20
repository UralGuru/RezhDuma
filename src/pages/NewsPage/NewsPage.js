import React, { useContext, useEffect, useState } from "react";
import NewsCard from "../../components/shared/NewsCard/NewsCard";
import Container from "../../components/shared/Container/Container";

import styles from './NewsPage.module.css';
import Input from "../../components/shared/Input/Input";
import { fetchAllNews, fetchNews } from "../../http/newsApi";
import { NEWS_PER_ONE_PAGE } from "../../utils/constants";
import Pagination from "../../components/shared/Pagination/Pagination";

const NewsPage = (props) => {
    const [news, setNews] = useState([]);
    const [newsCount, setNewsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (e) => {
      setSearchQuery(e.target.value);
    }

    const getNews = () => {
        fetchNews(NEWS_PER_ONE_PAGE, page, searchQuery).then(data => {
            setNews(data);
        });
    }

    useEffect(() => {
        getNews();
    }, [page, searchQuery])

    useEffect(() => {
        fetchNews().then(data => setNewsCount(data.length))
    }, [])

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
                    <div className={styles.news}>
                        {news.map((n) => {
                            return <NewsCard 
                                key={n.id}
                                id={n.id}
                                title={n.title}
                                description={n.text}
                                date={n.newsDate}
                                imageSrc={n.filesNames[0]}
                            />
                        })}
                    </div>
                    <Pagination 
                        page={page}
                        setPage={setPage}
                        totalCount={newsCount}
                        itemsPerPage={NEWS_PER_ONE_PAGE}
                    />
                </div>
            </div>
        </Container>
    );
}

export default NewsPage;