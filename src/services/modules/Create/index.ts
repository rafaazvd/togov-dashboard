import api from '../../api'
export const createTask = (token: string, task: { title: string, description: string }) =>
    api.post('/tasks', task, { headers: { Authorization: `Bearer ${token}` } });
  