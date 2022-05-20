//routes
export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const PROFILE_ROUTE = "/profile";
export const REQUEST_ROUTE = "/request";
export const FAQ_ROUTE = "/faq";
export const REQUESTS_ROUTE = "/requests";
export const ADMIN_PROFILE_ROUTE = "/profile_admin";


export const NEWS_ROUTE = "/news";
export const DOCUMENTS_ROUTE = "/documents";
export const HISTORY_ROUTE = "/history";
export const VOTINGS_ROUTE = "/votings";
export const POLLS_ROUTE = "/polls";
export const PROJECTS_ROUTE = "/projects";

//image-exports
export const MAIN_ICON = "images/nav_icons/main.svg";
export const NEWS_ICON = "images/nav_icons/news.svg";
export const HISTORY_ICON = "images/nav_icons/history.svg";
export const DOCUMENTS_ICON = "images/nav_icons/documents.svg";
export const VOTINGS_ICON = "images/nav_icons/votings.svg";
export const PROJECTS_ICON = "images/nav_icons/projects.svg";

export const VK_ICON = 'images/social_icons/vk.svg';
export const TELEGRAM_ICON = 'images/social_icons/telegram.svg';
export const PROFILE_ICON = "images/header_icons/profile-icon.svg";
export const REJH_ICON = "images/header_icons/rejh-icon.svg";

//select-options

export const REQUEST_TOPICS = [
  {value: '', label: 'Все'}, 
  {value: 'Образование', label: 'Образование'}, 
  {value: 'Дороги', label: 'Дороги'}, 
  {value: 'Трубы', label: 'Трубы'}, 

]

export const REQUEST_TYPES = [
  {value: '', label: 'Все'}, 
  {value: 'Жалоба', label: 'Жалоба'}, 
  {value: 'Обращение', label: 'Обращение'}, 
  {value: 'Заявка', label: 'Заявка'}, 

]

export const REQUEST_DISTRICTS = [
  {value: '', label: 'Все'}, 
  {value: 'ЖБИ', label: 'ЖБИ'}, 
  {value: 'Ленинский', label: 'Ленинский'}, 
  {value: 'Виз', label: 'Виз'}, 

]

export const REQUEST_STATUS = [
  {value: '', label: "Все"},
  {value: "Ожидающие ответа", label: "Ожидающие ответа"},
  {value: "Рассмотренные", label: "Рассмотренные"},

]

// count-options
export const NEWS_PER_ONE_PAGE = 5;
export const DOCUMENTS_PER_ONE_PAGE = 9;
export const PROJECTS_PER_ONE_PAGE = 5;
export const HISTORY_PER_ONE_PAGE = 5;

export const REQUESTS_PER_ONE_PAGE = 5;
