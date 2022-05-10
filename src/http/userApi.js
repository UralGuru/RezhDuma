import { $host, $authHost } from "../http";

export const login = async (data) => {
  return $host.post('api/login', data)
}

export const registration = async (email, password, phone, firstname, lastname, patronymic) => {
  return $host.post('api/registration', {email, password, phone, firstname, lastname, patronymic})
}

export const checkAuth = async () => {
  return $authHost.get('api/token/refresh');
}
