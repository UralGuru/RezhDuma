import {makeAutoObservable} from "mobx"

export default class NewsStore {
    constructor() {
        this._news = [
          { id: 1, imageSrc: "https://cdn.fishki.net/upload/post/2019/12/27/3183208/2-16.jpg", title: "Убили негра", text: "Ай-яй-яй-яй", isEvent: "True", date: "21.02.2002" },
          { id: 2, imageSrc: "https://cdn.fishki.net/upload/post/2019/12/27/3183208/2-16.jpg", title: "Новая новость", text: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", isEvent: "True", date: "21.02.2002" },
          { id: 3, imageSrc: "https://cdn.fishki.net/upload/post/2019/12/27/3183208/2-16.jpg", title: "Новая новостьНовая новостьНовая новостьНовая новостьНовая новостьНовая новость", text: "Ай-яй-яй-яй", isEvent: "True", date: "21.02.2002" },
          { id: 4, imageSrc: "https://cdn.fishki.net/upload/post/2019/12/27/3183208/2-16.jpg", title: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", text: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", isEvent: "True", date: "21.02.2002" },
          { id: 5, imageSrc: "https://cdn.fishki.net/upload/post/2019/12/27/3183208/2-16.jpg", title: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", text: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", isEvent: "True", date: "21.02.2002" },
          { id: 6, imageSrc: "https://cdn.fishki.net/upload/post/2019/12/27/3183208/2-16.jpg", title: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", text: "ОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразецОбразец", isEvent: "True", date: "21.02.2002" },
        ];
        makeAutoObservable(this);
    }

    setNews(news) {
        this._news = news;
    }

    get News() {
        return this._news;
    }

}