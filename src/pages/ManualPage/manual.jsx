import React, {useContext, useEffect} from 'react';
import styles from "./manual.module.css";
import Container from "../../components/shared/Container/Container";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ManualText from "./ManualText/ManualText";
import {Context} from "../../index";
import ManualTextAdmin from "./ManualText/ManualTextAdmin";

const Manual = () => {
    const {userStore} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('refresh-token')) {
            userStore.checkAuth();
        }
    }, [])
    return (
        <Container>
            <div className={styles.outer}>
                <BreadCrumbs data={[{'label': 'Главная', 'path': '/'},
                    {'label': 'Руководство пользования', 'path': '/manual'}]}/>


                <div className={styles.inner}>
                    {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) ? <ManualTextAdmin/> : <ManualText/>}

                </div>
            </div>
        </Container>
    );
};

export default Manual;