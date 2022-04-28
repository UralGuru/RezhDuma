import React from "react";

import IntroPage from "./IntroPage/IntroPage";
import AutroPage from "./AutroPage/AutroPage";
import NewsCard from "../../components/shared/NewsCard/NewsCard";
import Container from "../../components/shared/Container/Container";

import styles from './MainPage.module.css';
import News from "./News/News";

const MainPage = (props) => {
    return(
        <div className={styles.main}>
            <IntroPage />
            <News />
            <AutroPage />
        </div>
    );
}

export default MainPage;