import React from 'react';
import imgPages from './../ManualImages/linkToManualImg';
import s from './manualText.module.css';

const ManualText = () => {
    return (
        <>
            <div className={s.sectionTableTitle}>ОПИСАНИЕ РАЗДЕЛОВ САЙТА</div>
            <ul>
                <li><a href="#first">Главная страница</a></li>
                <li><a href="#news">Новости</a></li>
                <li><a href="#voting">Голосования</a></li>
                <li><a href="#docs">Документы</a></li>
                <li><a href="#projects">Проекты</a></li>
                <li><a href="#histories">История</a></li>
            </ul>
            <div className={s.sectionTableTitle}>ЛИЧНЫЙ КАБИНЕТ</div>
            <ul>
                <li><a href="#auto">Авторизация</a></li>
                <li><a href="#regis">Регистрация</a></li>
                <li><a href="#entry">Вход</a></li>
                <li><a href="#lk_link">Переход в личный кабинет</a></li>
                <li><a href="#lk">Содержание личного кабинета</a></li>
                <li><a href="#letter">Отправка обращения депутату</a></li>
            </ul>

            <div>
                <div className={s.sectionTitleName}>ОПИСАНИЕ РАЗДЕЛОВ САЙТА</div>
                <div>
                    <div className={s.sectionTitle} id={'first'}>Главная страница</div>
                    <p>
                        Этой страницей сайт встречает пользователя. На ней можно
                        узнать последние события в городе: новости, голосования, проекты,
                        над которыми работает администрация, документвы и история
                        города. Внизу сайта расположены контакты.
                    </p>
                    <img className={s.sectionImg} src={imgPages.HomePageImg} alt="HomePageImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'news'}>Новости</div>
                    <p>
                        В этом разделе расположены все новости от свежих к старым.
                        Новости выкладывают депутаты. Новости могут быть без изображений, чтобы
                        прочитать новость полностью нужно нажать на кнопку «Читать дальше».
                    </p>
                    <img className={s.sectionImg} src={imgPages.NewsPageImg} alt="NewsPageImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'voting'}>Голосования</div>
                    <p>
                        В этом разделе расположены голосования, которые
                        выкладывают депутаты для получения информации от жителей. Это могут
                        быть опросы о качестве проделанной работы, об оценке качества
                        инфраструктуры города, голосования о дальнейшей работе и т.д. В
                        голосованиях могут участвовать только авторизированные пользователи.
                    </p>
                    <img className={s.sectionImg} src={imgPages.VotingPageImg} alt="VotingPageImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'docs'}>Документы</div>
                    <p>
                        Этот раздел содержит документы и приказы принятые администрацией города.
                    </p>
                    <img className={s.sectionImg} src={imgPages.DocumentPageImg} alt="DocumentPageImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'projects'}>Проекты</div>
                    <p>
                        Этот раздел содержит информацию о грядущих проектах города, что
                        будет в скором времени или над чем работают депутаты.
                    </p>
                    <img className={s.sectionImg} src={imgPages.ProjectPageImg} alt="ProjectPageImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'histories'}>История</div>
                    <p>
                        В этом разделе хранится история города, значимые события.
                    </p>
                    <img className={s.sectionImg} src={imgPages.HistoryPageImg} alt="HistoryPageImg"/>
                </div>


                <div>
                    <div className={s.sectionTitleName}>ЛИЧНЫЙ КАБИНЕТ</div>
                    <div className={s.sectionTitle} id={'auto'}>Авторизация</div>
                    <p>
                        Авторизация – представление пользователя системе управления сайтом.
                        После ввода логина и пароля система проверяет, есть ли такой пользователь в
                        списке зарегистрированных пользователей, и если да, то открывает доступ к
                        личному кабинету и возможности голосовать в одноименном разделе, если же
                        пользователя нет в системе, нужно пройти регистрацию на сайте.
                    </p>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'regis'}>Регистрация</div>
                    <p>
                        1. Нажать на кнопку «Авторизироватья» в правом вверхнем углу;<br/>
                        2. Нажать на кнопку «Регистрация»;<br/>
                        3. Ввести электронную почту – нужно вводить существующую
                        почту;<br/>
                        4. Ввести ФИО в соответствующие поля;<br/>
                        5. Ввести номер телефона;<br/>
                        6. Ввести пароль два раза в соответсвующие поля;<br/>
                        7. Нажать на кнопку «Зарегистрироваться»;<br/>
                        8. После этого на вашу электронную почту придет письмо с
                        подтверждением, нужно перейти по ссылке, которая содержится в
                        этом письме.<br/>
                    </p>
                    <img className={s.sectionImg} src={imgPages.CRegistrationImg} alt="CRegistrationImg"/>
                    <img className={s.sectionImg} src={imgPages.CRegistrationBlankImg} alt="CRegistrationBlankImg"/>
                    <img className={s.sectionImg} src={imgPages.CAuthImg} alt="CAuthImg"/>
                    <img className={s.sectionImg} src={imgPages.CEmailLinkImg} alt="CEmailLinkImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'entry'}>Вход</div>
                    <p>
                        1. Нажать на кнопку «Авторизироватья» в правом вверхнем углу;<br/>
                        2. Ввести логин – почта, которую указывали при регистрации;<br/>
                        3. Пароль – ввести пароль пользователя;<br/>
                        4. Нажать на кнопку «Войти»;<br/>
                        <img className={s.sectionImg} src={imgPages.CEntryLinkImg} alt="CEntryLinkImg"/>
                        <img className={s.sectionImg} src={imgPages.CEntryImg} alt="CEntryImg"/>
                    </p>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'lk_link'}>Переход в личный кабинет</div>
                    <p>
                        Чтобы перейти в личный кабинет пользователя нужно нажать на свое
                        ФИО, которое появится на месте авторизации
                    </p>
                    <img className={s.sectionImg} src={imgPages.CAuthTrueImg} alt="CAuthTrueImg"/>
                    <img className={s.sectionImg} src={imgPages.CAuthListImg} alt="CAuthListImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'lk'}>Содержание личного кабинета</div>
                    <p>
                        После авторизации на сайте станут доступны дополнительные
                        возможности, такие как голосование и отправка обращений к депутатам.
                        Личный кабинет содержит несколько разделов:
                        <ol>
                            <li>«Список часто задаваемых вопросов» – данный
                                раздел нужен для жителей при отправке своих обращений, чтобы
                                вопросы не повторялись.</li>
                            <li>«Отправить обращение» - нужно для отправки
                            обращений, разбор этого раздела будет чуть позже.</li>
                            <li>«Мои вопросы и заявки» - в этом разделе хранятся
                            уже написанные вами обращения, нужен для отслеживания, появился
                            ли ответ на обращение.</li>
                            <li>«Голосования» - в этом разделе можно принимать
                            участвия в голосовании.</li>
                            Чтобы принять участие в голосовании, нужно выбрать голосование,
                            заполнить форму и отправить свой голос, после участия можно будет
                            увидеть сколько человек проголосовало за тот или иной вариант
                        </ol>

                    </p>
                    <img className={s.sectionImg} src={imgPages.CProfileImg} alt="CProfileImg"/>
                </div>
                <div>
                    <div className={s.sectionTitle} id={'letter'}>Отправка обращения депутату</div>
                    <p>
                        После нажатия на кнопку «Отправить обращение» пользователь будет
                        переадресован на специальную форму для заполнения обращения к депутату.
                        Этапы заполнения формы:
                        <ol>
                            <li>«Выберите район» - нужно выбрать адрес города;</li>
                            <li>«Выберите сферу обращения» - нужно выбрать из
                                предложенного списка;</li>
                            <li>«Выберите тип обращения» – следует выбрать чем
                                является ваше обращение;</li>
                            <li>«Введите текст обращения» – нужно
                                структурированно и грамотно написать сообщение. Минимальная
                                длина 20 символов;</li>
                            <li>Так же если нажать на кнопку «Прикрепить файлы» можно приложить к тексту
                                фотографии в формате JPEG, видео в
                                формате MP4 или текстовый файл в формате PDF;</li>
                            <li>После составления обращения завершающим шагом будет отправка,
                                нужно нажать на кнопку «Отправить обращение»
                                Ответ на обращение можно увидеть в разделе «Мои вопросы и заявки».</li>
                        </ol>
                    </p>
                    <img className={s.sectionImg} src={imgPages.CAppealImg} alt="CAppealImg"/>
                </div>
            </div>
        </>
    );
};

export default ManualText;