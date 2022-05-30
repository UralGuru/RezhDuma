import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from './ProjectsPage.module.css';
import { Context } from "../..";
import Container from "../../components/shared/Container/Container";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Input from "../../components/shared/Input/Input";
import Card from "../../components/shared/Card/Card";
import Pagination from "../../components/shared/Pagination/Pagination";
import { PROJECTS_PER_ONE_PAGE } from "../../utils/constants";
import { fetchProjects } from "../../http/projectsApi";
import CreateProject from "../../components/shared/ProjectModals/CreateProject/CreateProject";
import Button from "../../components/shared/Button/Button";

const ProjectsPage = () => {
    const {userStore} = useContext(Context);

    const [projects, setProjects] = useState([]);
    const [projectsCount, setProjectsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onSearchChange = (e) => {
      setSearchQuery(e.target.value);
    }

    useEffect(() => {
        fetchProjects(PROJECTS_PER_ONE_PAGE, page, searchQuery).then(data => {
            setProjects(data);
        });
    }, [page, searchQuery, modalIsOpen])

    useEffect(() => {
        fetchProjects('', '', searchQuery).then(data => {
            setProjectsCount(data.length);
        })
    }, [searchQuery, modalIsOpen])

    useEffect(() => {
        setPage(1);
    }, [searchQuery])

    return(
        <Container>
            <div className={styles.outer}>
                <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Проекты', 'path': '/projects'}]}/> 
                <div className={styles.header}>
                    <h2>Проекты</h2>
                    <div className={styles.nav_fields}>
                        {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                        <Button
                            className='primary'
                            onClick={openModal}
                        >Создать проект
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
                        {projects.map((n) => {
                            return <Card 
                                key={n.id}
                                id={n.id}
                                title={n.title}
                                description={n.text}
                                date={n.projectDate}
                                image={n.filesNames[0]}
                            />
                        })}
                    </div>
                    <Pagination 
                        page={page}
                        setPage={setPage}
                        totalCount={projectsCount}
                        itemsPerPage={PROJECTS_PER_ONE_PAGE}
                    />
                </div>
            </div>
            {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
                <CreateProject modalIsOpen={modalIsOpen} closeModal={closeModal}/>}
        </Container>
    );
}

export default observer(ProjectsPage);