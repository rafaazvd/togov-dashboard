import api from '../../api'

export const updateTask = (token: string, id: number, task: Partial<{ title: string; description: string; status: string }>) =>
    api.put(`/tasks/${id}`, task, { headers: { Authorization: `Bearer ${token}` } });
  