import React, {useEffect, useState} from "react";
import styles from "./DocumentsPage.module.css";
import Input from "../../components/shared/Input/Input";
import Container from "../../components/shared/Container/Container";
import {DOCUMENTS_PER_ONE_PAGE} from "../../utils/constants";
import DocumentsCard from "../../components/shared/DocumentsCard/DocumentsCard";
import Pagination from "../../components/shared/Pagination/Pagination";

import {useNavigate} from "react-router-dom";
import {fetchDocuments, fetchDocumentsWithPagination} from "../../http/documentsApi";

const DocumentsPage = (props) => {
    const [document, setDocument] = useState([]);
    const [documentsCount, setDocumentsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const getDocuments = () => {
        fetchDocumentsWithPagination(DOCUMENTS_PER_ONE_PAGE, page).then(data => {
            setDocument(data);
        });
    }

    useEffect(() => {
        getDocuments();
    }, [page])

    useEffect(() => {
        fetchDocuments().then(data => setDocumentsCount(data.length))
    }, [])


    const navigate = useNavigate();

    return (
        <Container>
            <div className={styles.outer}>

                <ul className={styles.breadcrumb}>
                    <li>
                        <div className={styles.notActive} onClick={() => navigate('/')}>Главная /</div>
                    </li>
                    <li>
                        <div>Документы</div>
                    </li>
                </ul>

                <div className={styles.header}>
                    <h2>Документы</h2>
                    <Input
                        className="page_search-input"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>
                <div className={styles.grid}>
                    {document.map((d) => {
                        return <DocumentsCard key={d.id}
                                              id={d.id}
                                              title={d.title}
                                              description={d.text}
                                              date={d.documentDate}
                                              files={d.filesNames[0]}/>

                    })}
                </div>

                <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={documentsCount}
                    itemsPerPage={DOCUMENTS_PER_ONE_PAGE}
                />
            </div>
        </Container>
    );
}

export default DocumentsPage;