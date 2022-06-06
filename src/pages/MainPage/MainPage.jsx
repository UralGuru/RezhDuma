import React from "react";

import IntroPage from "./IntroPage/IntroPage";
import AutroPage from "./AutroPage/AutroPage";
import Card from "../../components/shared/Card/Card";
import Container from "../../components/shared/Container/Container";

import styles from './MainPage.module.css';
import News from "./News/News";
import Votings from "./Votings/Votings";
import Documents from "./Documents/Documents";

const MainPage = (props) => {
    return(
        <div className={styles.main}>
            <IntroPage />
            <News />
            <Votings />
            <Documents />
            <AutroPage />
        </div>
    );
}

export default MainPage;