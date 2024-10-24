import React from 'react';
import { List, Button } from 'antd';
import { Api } from '@/core/trpc';

interface UserProfilesTabProps {
  showModal: (type: string) => void;
  users: any[];
}

export const UserProfilesTab: React.FC<UserProfilesTabProps> = ({ showModal, users }) => {
  return (
    <List
      dataSource={users}
      renderItem={item => (
        <List.Item
          actions={[
            <Button key="edit" onClick={() => showModal('user')}>
              Edit
            </Button>,
          ]}
        >
          <List.Item.Meta 
            title={item.name} 
            description={
              <>
                <div>{item.email}</div>
                <div>Organization: N/A</div>
              </>
            } 
          />
          <div>Role: {item.globalRole}</div>
        </List.Item>
      )}
    />
  );
};
