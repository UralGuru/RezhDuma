import React, {useContext, useEffect, useState} from "react";
import styles from "./DocumentsPage.module.css";
import Input from "../../components/shared/Input/Input";
import Container from "../../components/shared/Container/Container";
import {DOCUMENTS_PER_ONE_PAGE} from "../../utils/constants";
import DocumentsCard from "../../components/shared/DocumentsCard/DocumentsCard";
import Pagination from "../../components/shared/Pagination/Pagination";
import {useNavigate} from "react-router-dom";
import {fetchDocuments} from "../../http/documentsApi";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Button from "../../components/shared/Button/Button";
import CreateDocument from "../../components/shared/DocumentsModals/CreateDocument/CreateDocument";

const DocumentsPage = (props) => {
    const navigate = useNavigate();
    const {userStore} = useContext(Context);

    const [documents, setDocuments] = useState([]);
    const [documentsCount, setDocumentsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [searchQuery, setSearchQuery] = useState("");
    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        fetchDocuments(DOCUMENTS_PER_ONE_PAGE, page, searchQuery).then(data => {
            setDocuments(data);
        });
    }, [page, searchQuery, modalIsOpen])

    useEffect(() => {
        fetchDocuments('', '', searchQuery).then(data => {
            setDocumentsCount(data.length);
        })
    }, [searchQuery, modalIsOpen])

    useEffect(() => {
        setPage(1);
    }, [searchQuery])

    return (
        <Container>
            <div className={styles.inner}>
                <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Документы', 'path': '/documents'}]}/> 
                <div className={styles.header}>
                    <h2>Документы</h2>
                    <div className={styles.nav_fields}>
                        {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                        <Button
                            className='primary'
                            onClick={openModal}
                        >Создать документ
                        </Button>}
                        <Input 
                            className="page_search-input"
                            placeholder="Поиск"
                            value={searchQuery}
                            onChange={onSearchChange}
                        />
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.documents}>
                        {documents.map((d) => {
                            return <DocumentsCard 
                                key={d.id}
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
            </div>
            {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                <CreateDocument modalIsOpen={modalIsOpen} closeModal={closeModal}/>}
        </Container>
    );
}

export default observer(DocumentsPage);