import React from 'react';
import { Space, Button, List, Tag } from 'antd';

interface DocumentTagsTabProps {
  tags: Array<{ id: string; name: string; color: string }>;
  showModal: (type: string) => void;
}

export const DocumentTagsTab: React.FC<DocumentTagsTabProps> = ({ tags, showModal }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={() => showModal('tag')}>Create New Tag</Button>
      <List
        dataSource={tags}
        renderItem={item => (
          <List.Item>
            <Tag color={item.color}>{item.name}</Tag>
          </List.Item>
        )}
      />
    </Space>
  );
};
