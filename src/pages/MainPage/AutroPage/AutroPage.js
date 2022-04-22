import React from "react";
import Container from "../../../components/shared/Container/Container";
import s from './AutroPage.module.css'

const AutroPage = (props) => {
    return(
        <div className={s.autro}>
            <Container>
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
            </Container>
        </div>

    );
}

export default AutroPage;