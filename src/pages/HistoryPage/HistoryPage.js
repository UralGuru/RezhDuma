import React, {useEffect, useState} from "react";
import styles from "../HistoryPage/HistoryPage.module.css";
import Input from "../../components/shared/Input/Input";
import Container from "../../components/shared/Container/Container";
import {fetchHistory, fetchHistoryWithPagination} from "../../http/historyApi";
import {HISTORY_PER_ONE_PAGE} from "../../utils/constants";
import HistoryCard from "../../components/shared/HistoryCard/HistoryCard";
import Pagination from "../../components/shared/Pagination/Pagination";
import {Breadcrumb} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const HistoryPage = (props) => {
    const [history, setHistory] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const getHistories = () => {
        fetchHistoryWithPagination(HISTORY_PER_ONE_PAGE, page).then(data => {
            setHistory(data);
        });
    }

    useEffect(() => {
        getHistories();
    }, [page])

    useEffect(() => {
        fetchHistory().then(data => setHistoryCount(data.length))
    }, [])


    const navigate = useNavigate();

    return(
        <Container>
            <div className={styles.outer}>

                <ul className={styles.breadcrumb}>
                    <li>
                        <div className={styles.notActive} onClick={() => navigate('/')}>Главная /</div>
                    </li>
                    <li>
                        <div>История думы</div>
                    </li>
                </ul>

                <div className={styles.header}>
                    <h2>История думы</h2>
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

                <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={historyCount}
                    itemsPerPage={HISTORY_PER_ONE_PAGE}
                />
            </div>
        </Container>
    );
}

export default HistoryPage;