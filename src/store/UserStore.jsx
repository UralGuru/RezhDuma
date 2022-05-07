import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get IsAuth() {
        return this._isAuth;
    }

    get User() {
        return this._user;
    }

    async login(data) {
        try {
            const response = await AuthService.login(data);
            console.log(response);
            localStorage.setItem('token', response.data.access_token);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e.response.data);
        }
    }

    async registration(email, password, phone, firstname, lastname, patronymic) {
        try {
            const response = await AuthService.registration(email, password, phone, firstname, lastname, patronymic);
        } catch(e) {
            console.log(e.response.data);
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({});
        } catch(e) {
            console.log(e.response.data);
        }
    }
}