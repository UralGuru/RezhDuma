import axios from "axios";
import {makeAutoObservable} from "mobx"
import { checkAuth, login, registration } from "../http/userApi";

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
            await login(data)
            .then((res) => {
                localStorage.setItem('refresh-token', res.data[0].refresh_token);
                localStorage.setItem('access-token', res.data[0].access_token);
                this.setIsAuth(true);
                this.setUser(res.data[1]);
            });
        } catch(e) {
            console.log(e);
        }
    }

    async registration(email, password, phone, firstname, lastname, patronymic) {
        try {
            await registration(email, password, phone, firstname, lastname, patronymic);
        } catch(e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            this.setIsAuth(false);
            this.setUser({});
        } catch(e) {
            console.log(e);
        }
    }

    async checkAuth() {
        try {
            await checkAuth()
            .then(res => {
                localStorage.setItem('access-token', res.data[0].access_token);
                this.setIsAuth(true);
                this.setUser(res.data[1]);
            });
        } catch(e) {
            console.log(e);
        }
    }
}