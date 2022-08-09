import React from 'react';
import styles from "./manual.module.css";
import Container from "../../components/shared/Container/Container";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Input from "../../components/shared/Input/Input";
import ManualText from "./ManualText/ManualText";

const Manual = () => {
    return (
        <Container>
            <div className={styles.outer}>
                <BreadCrumbs data={[{'label': 'Главная', 'path': '/'},
                    {'label': 'Руководство пользования', 'path': '/manual'}]}/>
                <div className={styles.header}>
                    <h2>Руководство пользования</h2>
                </div>

                <div className={styles.inner}>
                    <ManualText/>
                </div>
            </div>
        </Container>
    );
};

export default Manual;