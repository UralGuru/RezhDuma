import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from './HistoryPage.module.css';
import { Context } from "../..";
import Container from "../../components/shared/Container/Container";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Input from "../../components/shared/Input/Input";
import Card from "../../components/shared/Card/Card";
import Pagination from "../../components/shared/Pagination/Pagination";
import Button from "../../components/shared/Button/Button";
import { HISTORY_PER_ONE_PAGE } from "../../utils/constants";
import { fetchHistory } from "../../http/historyApi";
import CreateHistory from "../../components/shared/HistoryModals/CreateHistory/CreateHistory";

const HistoryPage = () => {
    const {userStore} = useContext(Context);

    const [history, setHistory] = useState([]);
    const [historiesCount, setHistoriesCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onSearchChange = (e) => {
      setSearchQuery(e.target.value);
    }

    useEffect(() => {
        fetchHistory(HISTORY_PER_ONE_PAGE, page, searchQuery).then(data => {
            setHistory(data);
        });
    }, [page, searchQuery, modalIsOpen])

    useEffect(() => {
        fetchHistory('', '', searchQuery).then(data => {
            setHistoriesCount(data.length);
        })
    }, [searchQuery, modalIsOpen])

    useEffect(() => {
        setPage(1);
    }, [searchQuery])

    return(
        <Container>
            <div className={styles.outer}>
                <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'История', 'path': '/history'}]}/> 
                <div className={styles.header}>
                    <h2>История</h2>
                    <div className={styles.nav_fields}>
                        {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                        <Button
                            className='primary'
                            onClick={openModal}
                        >Создать историю
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
                        {history.map((n) => {
                            return <Card 
                                key={n.id}
                                id={n.id}
                                title={n.title}
                                description={n.text}
                                date={n.historyDate}
                                image={n.filesNames[0]}
                            />
                        })}
                    </div>
                    <Pagination 
                        page={page}
                        setPage={setPage}
                        totalCount={historiesCount}
                        itemsPerPage={HISTORY_PER_ONE_PAGE}
                    />
                </div>
            </div>
            {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                <CreateHistory modalIsOpen={modalIsOpen} closeModal={closeModal}/>}
        </Container>
    );
}

export default observer(HistoryPage);