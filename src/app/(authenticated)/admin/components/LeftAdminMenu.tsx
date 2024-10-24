import React from 'react';
import { Menu } from 'antd';
import { BookOutlined, UserOutlined, SettingOutlined, BarChartOutlined, FileTextOutlined, TagsOutlined, BgColorsOutlined, GlobalOutlined } from '@ant-design/icons';

interface LeftAdminMenuProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

export const LeftAdminMenu: React.FC<LeftAdminMenuProps> = ({ selectedKey, onSelect }) => {
  const menuItems = [
    { key: 'overview', icon: <BookOutlined />, label: 'Accueil Admin' },
    { key: 'user-profiles', icon: <UserOutlined />, label: 'Utilisateurs' },
    { key: 'system-settings', icon: <SettingOutlined />, label: 'System Settings' },
    { key: 'reports-analytics', icon: <BarChartOutlined />, label: 'Reports & Analytics' },
    { key: 'document-templates', icon: <FileTextOutlined />, label: 'Templates' },
    { key: 'document-tags', icon: <TagsOutlined />, label: 'Tags' },
    { key: 'theme-settings', icon: <BgColorsOutlined />, label: 'Theme' },
    { key: 'language-management', icon: <GlobalOutlined />, label: 'Localization' },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onSelect={({ key }) => onSelect(key as string)}
      items={menuItems}
    />
  );
};
