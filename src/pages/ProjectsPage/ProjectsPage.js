import React, {useEffect, useState} from "react";
import styles from "./ProjectsPage.module.css"
import Input from "../../components/shared/Input/Input";
import Container from "../../components/shared/Container/Container";
import {fetchProjects, fetchProjectsWithPagination} from "../../http/projectsApi";
import {HISTORY_PER_ONE_PAGE, PROJECTS_PER_ONE_PAGE} from "../../utils/constants";

import ProjectsCard from "../../components/shared/ProjectsCard/ProjectsCard";
import Pagination from "../../components/shared/Pagination/Pagination";

import {useNavigate} from "react-router-dom";


const ProjectsPage = (props) => {
    const [projects, setProjects] = useState([]);
    const [projectsCount, setProjectsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const getProjects = () => {
        fetchProjectsWithPagination(PROJECTS_PER_ONE_PAGE, page).then(data => {
            setProjects(data);
        });
    }

    useEffect(() => {
        getProjects();
    }, [page])

    useEffect(() => {
        fetchProjects().then(data => setProjectsCount(data.length))
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
                        <div>Проекты</div>
                    </li>
                </ul>

                <div className={styles.header}>
                    <h2>Проекты думы</h2>
                    <Input
                        className="page_search-input"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>

                <div className={styles.inner}>
                    <div className={styles.projects}>
                        {projects.map((h) => {
                            return <ProjectsCard
                                key={h.id}
                                id={h.id}
                                title={h.title}
                                description={h.text}
                                date={h.projectDate}
                                imageSrc={h.filesNames[0]}
                            />})
                        }
                    </div>
                </div>

                <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={projectsCount}
                    itemsPerPage={PROJECTS_PER_ONE_PAGE}
                />
            </div>
        </Container>
    );
}

export default ProjectsPage;