import React from "react";
import Container from "../../../components/shared/Container/Container";
import styles from './IntroPage.module.css'

const IntroPage = (props) => {
    return(
        <div className={styles.intro}>
            <Container>
                <div className={styles.page_heading}>
                    <div>Официальный сайт</div>
                    <div>   
                        Администрации<br />
                        городского округа город Реж<br />
                        Свердловской области
                    </div>
                    <input 
                        className={styles.search_btn} 
                        type="text"
                        placeholder="Поиск по сайту     &#10140;"
                    />
                </div>
            </Container>
        </div>
    );
}

export default IntroPage;