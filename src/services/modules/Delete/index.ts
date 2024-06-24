import api from '../../api'

export const deleteTask = (token: string, id: number) =>
    api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });