import React from 'react';
import { List, Button } from 'antd';
import { Api } from '@/core/trpc';

type SystemSettingsTabProps = {
  settings: any;
  showModal: (type: string) => void;
};

export const SystemSettingsTab: React.FC<SystemSettingsTabProps> = ({ settings, showModal }) => {
  return (
    <List
      dataSource={[settings]}
      renderItem={item => (
        <List.Item
          actions={[
            <Button key="edit" onClick={() => showModal('settings')}>
              Edit
            </Button>,
          ]}
        >
          <List.Item.Meta
            title="Organization Settings"
            description={`Name: ${item?.name}`}
          />
        </List.Item>
      )}
    />
  );
};
