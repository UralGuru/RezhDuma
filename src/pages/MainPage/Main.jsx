import React from "react";
import s from './MainPage.module.css'

const MainPage = (props) => {
    return(
        <div className={s.wrapper}>
            <div className={s.intro}>
                <div className={s.page_heading}>
                    <div>Официальный сайт</div>
                    <div>Администрации<br />
                        городского округа город Реж<br />
                        Свердловской области</div>
                    <div className={s.form_search}>
                        <form>
                            <input type="text" placeholder="Поиск по сайту" />
                            <button type="submit"></button>
                        </form>
                    </div>
                </div>

            </div>

            <div></div>

            <div></div>
        </div>
    );
}

export default MainPage;