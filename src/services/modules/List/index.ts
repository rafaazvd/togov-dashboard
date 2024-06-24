import api from '../../api'

export const getTasks = (token: string) =>
    api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
  