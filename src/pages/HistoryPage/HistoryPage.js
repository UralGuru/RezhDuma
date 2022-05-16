import React from "react";
import styles from "../NewsPage/NewsPage.module.css";
import Input from "../../components/shared/Input/Input";
import Container from "../../components/shared/Container/Container";

const HistoryPage = (props) => {
    return(
        <Container>
            <div className={styles.outer}>
                <div className={styles.header}>
                    <h2>История</h2>
                    <Input
                        className="page_search-input"
                        placeholder="Поиск"
                        value={'Поиск'}
                        onChange={'onSearchChange'}
                    />
                </div>

                <div className={styles.inner}>
                </div>
            </div>
        </Container>
    );
}

export default HistoryPage;