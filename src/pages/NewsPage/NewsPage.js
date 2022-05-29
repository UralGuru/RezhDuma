import React, { useContext, useEffect, useState } from "react";
import NewsCard from "../../components/shared/NewsCard/NewsCard";
import Container from "../../components/shared/Container/Container";

import styles from './NewsPage.module.css';
import Input from "../../components/shared/Input/Input";
import { fetchNews } from "../../http/newsApi";
import { NEWS_PER_ONE_PAGE } from "../../utils/constants";
import Pagination from "../../components/shared/Pagination/Pagination";
import Button from "../../components/shared/Button/Button";
import CreateNews from "../../components/shared/NewsModals/CreateNews/CreateNews";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

const NewsPage = (props) => {
    const {userStore} = useContext(Context);

    const [news, setNews] = useState([]);
    const [newsCount, setNewsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onSearchChange = (e) => {
      setSearchQuery(e.target.value);
    }

    useEffect(() => {
        fetchNews(NEWS_PER_ONE_PAGE, page, searchQuery).then(data => {
            setNews(data);
        });
    }, [page, searchQuery, modalIsOpen])

    useEffect(() => {
        fetchNews('', '', searchQuery).then(data => {
            setNewsCount(data.length);
        })
    }, [searchQuery, modalIsOpen])

    useEffect(() => {
        setPage(1);
    }, [searchQuery])

    return(
        <Container>
            <div className={styles.outer}>
                <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Новости', 'path': '/news'}]}/> 
                <div className={styles.header}>
                    <h2>Новости</h2>
                    <div className={styles.nav_fields}>
                        {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                        <Button
                            className='primary'
                            onClick={openModal}
                        >Создать новость
                        </Button>}
                        <Input 
                            className="page_search-input"
                            placeholder="Поиск"
                            value={searchQuery}
                            onChange={onSearchChange}
                        />
                    </div>
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
            {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                <CreateNews modalIsOpen={modalIsOpen} closeModal={closeModal}/>}
        </Container>
    );
}

export default observer(NewsPage);