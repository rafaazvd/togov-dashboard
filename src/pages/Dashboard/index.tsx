import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, message } from 'antd';
import TaskForm from '../../components/Form';
import TaskTable from '../../components/Table';
import { createTask } from '../../services/modules/Create';
import { getTasks } from '../../services/modules/List';
import { deleteTask } from '../../services/modules/Delete';
import { updateTask } from '../../services/modules/Update';

 interface ITask {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
  }

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await getTasks(token);
      setTasks(response.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (task: { title: string; description: string }) => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await createTask(token, task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      message.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id: number, task: Partial<ITask>) => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await updateTask(token, id, task);
      setTasks(tasks.map(t => (t.id === id ? response.data : t)));
    } catch (error) {
      message.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem('token') || '';
      await deleteTask(token, id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <Button type="primary" onClick={() => {
          localStorage.removeItem('token')
          navigation('/login');
        }}>
          Sair
        </Button>
      </Header>
      <Content style={{ padding: '20px' }}>
        <TaskForm onCreateTask={handleCreateTask} />
        <TaskTable tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} loading={loading} />
      </Content>
    </Layout>
  );
};

export default Dashboard;
