import React from "react";
import s from './AutroPage.module.css'

const AutroPage = (props) => {
    return(
        <div>
            <div className={s.wrapper}>
                <div className={s.autro}>
                    <div className={s.page_heading}>
                        <div className={s.page_text}>
                            <div className={s.text}>
                                Есть вопросы?<br/>Задайте их депутату режской думы...
                            </div>

                            <div>
                                <input className={s.autro_but}
                                       type="button"
                                       value="Отправить обращение" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AutroPage;