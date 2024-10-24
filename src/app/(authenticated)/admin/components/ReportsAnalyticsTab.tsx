import React from 'react';
import { List } from 'antd';

interface ReportsAnalyticsTabProps {
  users: any[];
  documents: any[];
  templates: any[];
}

export const ReportsAnalyticsTab: React.FC<ReportsAnalyticsTabProps> = ({ users, documents, templates }) => {
  return (
    <List
      dataSource={[
        { title: 'Total Users', value: users?.length },
        { title: 'Total Documents', value: documents?.length },
        { title: 'Total Templates', value: templates?.length },
      ]}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={item.value?.toString()}
          />
        </List.Item>
      )}
    />
  );
};
