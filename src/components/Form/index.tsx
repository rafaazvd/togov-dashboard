import React from 'react';
import { Form, Input, Button } from 'antd';

interface TaskFormProps {
  onCreateTask: (task: { title: string; description: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { title: string; description: string }) => {
    onCreateTask(values);
    form.resetFields();
  };

  return (
    <Form form={form} name="task_form" onFinish={onFinish} layout="inline" style={{ marginBottom: '20px', width: '100%' }}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the task title!' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Please input the task description!' }]}
      >
        <Input placeholder="Description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Adicionar Tarefa
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
