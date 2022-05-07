import { $host, $authHost } from "../http";

export default class AuthService {
  static async login(data) {
    return $authHost.post('api/login', {data})
  }

  static async registration(email, password, phone, firstname, lastname, patronymic) {
    return $authHost.post('api/registration', {email, password, phone, firstname, lastname, patronymic})
  }
}