import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

interface ITask {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
  }

interface TaskTableProps {
  tasks: ITask[];
  onUpdateTask: (id: number, task: Partial<ITask>) => void;
  onDeleteTask: (id: number) => void;
  loading: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onUpdateTask, onDeleteTask, loading }) => {
  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: ITask) => (
        <>
          <Button 
          style={{marginRight: 12, color: record.status === 'in-progress' ? '#0791ed': '#3e3d3d', border: record.status === 'in-progress' ? 'solid 1px #0791ed': 'solid 1px #3e3d3d' }}
          onClick={() => onUpdateTask(record.id, { status: 'in-progress' })}>Em Desenvolvimento</Button>
          <Button
          style={{marginRight: 12, color: record.status === 'completed' ? '#0791ed': '#3e3d3d', border: record.status === 'completed' ? 'solid 1px #0791ed': 'solid 1px #3e3d3d' }}
          onClick={() => onUpdateTask(record.id, { status: 'completed' })}>Finalizada</Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => onDeleteTask(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="id" loading={loading} />;
};

export default TaskTable;
