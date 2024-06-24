import api from '../../api'

export const login = (username: string, password: string) =>
    api.post('/auth/login', { username, password });
  