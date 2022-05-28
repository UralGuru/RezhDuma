//routes
export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const PROFILE_ROUTE = "/profile";
export const CREATE_REQUEST_ROUTE = "/requests/create";
export const REQUESTS_ROUTE = "/requests";
export const FAQ_ROUTE = "/faq";
export const ADMIN_REQUESTS_ROUTE = "/admin/requests";
export const ADMIN_PROFILE_ROUTE = "/admin/profile";
export const ADMIN_VOTINGS_ROUTE = "/admin/votings";
export const USER_ROUTE = "/user";
export const USER_EDIT_ROUTE = "/user/edit";
export const PASSWORD_EDIT_ROUTE = "/user/edit/password";


export const NEWS_ROUTE = "/news";
export const DOCUMENTS_ROUTE = "/documents";
export const HISTORY_ROUTE = "/history";
export const VOTINGS_ROUTE = "/votings";
export const POLLS_ROUTE = "/polls";
export const PROJECTS_ROUTE = "/projects";

//select-options

export const REQUEST_TOPICS = [
  {value: '', label: 'Все'}, 
  // {value: 'Образование', label: 'Образование'},
  // {value: 'Дороги', label: 'Дороги'},
  // {value: 'Трубы', label: 'Трубы'},
  {value: 'Экономика и бюджет', label: 'Экономика и бюджет'},
  {value: 'Социальные вопросы', label: 'Социальные вопросы'},
  {value: 'Сельское хозяйство', label: 'Сельское хозяйство'},
  {value: 'Местное самоуправление', label: 'Местное самоуправление'},
  {value: 'Промышленность', label: 'Промышленность'},
  {value: 'Строительство', label: 'Строительство'},
  {value: 'Транспорт', label: 'Транспорт'},
  {value: 'Связь', label: 'Связь'},

]

export const REQUEST_TYPES = [
  {value: '', label: 'Все'},
  {value: 'Обращение', label: 'Обращение'}, 
  {value: 'Предложение', label: 'Предложение'},
  {value: 'Заявление', label: 'Заявление'},
  {value: 'Жалоба', label: 'Жалоба'},
  // {value: 'Заявка', label: 'Заявка'},
]

export const REQUEST_DISTRICTS = [
  {value: '', label: 'Все'}, 
  // {value: 'ЖБИ', label: 'ЖБИ'},
  // {value: 'Ленинский', label: 'Ленинский'},
  // {value: 'Виз', label: 'Виз'},
  {value: 'Центр', label: 'Центр'},
  {value: 'Стройгородок', label: 'Стройгородок'},
  {value: 'Машиностроителей', label: 'Машиностроителей'},
  {value: 'Гавань', label: 'Гавань'},
  {value: 'Вокзальный', label: 'Вокзальный'},
  {value: '6-й участок', label: '6-й участок'},
]

export const REQUEST_STATUS = [
  {value: '', label: "Все"},
  {value: "Ожидающие ответа", label: "Ожидающие ответа"},
  {value: "Рассмотренные", label: "Рассмотренные"},

]

export const NEWS_TYPE = [
  {value: 1, label: 'Событие'},
  {value: 0, label: 'Новость'},
]

// count-options
export const DOCUMENTS_PER_ONE_PAGE = 9;
export const VOTINGS_PER_ONE_PAGE = 9;
export const NEWS_PER_ONE_PAGE = 5;
export const PROJECTS_PER_ONE_PAGE = 5;
export const HISTORY_PER_ONE_PAGE = 5;
export const REQUESTS_PER_ONE_PAGE = 5;

