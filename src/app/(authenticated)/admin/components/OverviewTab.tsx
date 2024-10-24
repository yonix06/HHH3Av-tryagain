import React from 'react';
import { Row, Col, Card } from 'antd';
import { UserOutlined, SettingOutlined, BarChartOutlined, FileTextOutlined, TagsOutlined, BgColorsOutlined, GlobalOutlined } from '@ant-design/icons';

interface OverviewTabProps {
  handleShortcutClick: (key: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ handleShortcutClick }) => {
  const shortcuts = [
    { icon: <UserOutlined />, title: 'User Profiles', key: 'user-profiles' },
    { icon: <SettingOutlined />, title: 'System Settings', key: 'system-settings' },
    { icon: <BarChartOutlined />, title: 'Reports & Analytics', key: 'reports-analytics' },
    { icon: <FileTextOutlined />, title: 'Document Templates', key: 'document-templates' },
    { icon: <TagsOutlined />, title: 'Document Tags', key: 'document-tags' },
    { icon: <BgColorsOutlined />, title: 'Theme Settings', key: 'theme-settings' },
    { icon: <GlobalOutlined />, title: 'Language Management', key: 'language-management' },
  ];

  return (
    <Row gutter={[16, 16]}>
      {shortcuts.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.key}>
          <Card
            hoverable
            onClick={() => handleShortcutClick(item.key)}
            cover={
              <div style={{ fontSize: '24px', padding: '24px', textAlign: 'center' }}>
                {item.icon}
              </div>
            }
          >
            <Card.Meta title={item.title} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
