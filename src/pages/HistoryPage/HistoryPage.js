import React, {useEffect, useState} from "react";
import styles from "../HistoryPage/HistoryPage.module.css";
import Input from "../../components/shared/Input/Input";
import Container from "../../components/shared/Container/Container";
import {fetchHistory, fetchHistoryWithPagination} from "../../http/historyApi";
import {HISTORIES_PER_ONE_PAGE} from "../../utils/constants";
import HistoryCard from "../../components/shared/HistoryCard/HistoryCard";

const HistoryPage = (props) => {
    const [history, setHistory] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const getHistories = () => {
        fetchHistoryWithPagination(HISTORIES_PER_ONE_PAGE, page).then(data => {
            setHistory(data);
        });
    }

    useEffect(() => {
        getHistories();
    }, [page])

    useEffect(() => {
        fetchHistory().then(data => setHistoryCount(data.length))
    }, [])


    return(
        <Container>
            <div className={styles.outer}>
                <div className={styles.header}>
                    <h2>История</h2>
                    <Input
                        className="page_search-input"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>

                <div className={styles.inner}>
                    <div className={styles.history}>
                        {history.map((h) => {
                            return <HistoryCard
                                        key={h.id}
                                        id={h.id}
                                        title={h.title}
                                        description={h.text}
                                        date={h.historyDate}
                                        imageSrc={h.filesNames[0]}
                                    />})
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default HistoryPage;