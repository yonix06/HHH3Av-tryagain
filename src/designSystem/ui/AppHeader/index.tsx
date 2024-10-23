import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'
import { Flex, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const AppHeader: React.FC<Props> = ({
  title = 'TryAgain',
  description,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [headerColor, setHeaderColor] = useState('rgba(0, 0, 0, 0)');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const opacity = Math.min(scrollY / 200, 0.8);
    setHeaderColor(`rgba(0, 0, 0, ${opacity})`);
  }, [scrollY]);

  return (
    <div className="sticky top-0 z-50 transition-all duration-300" style={{ backgroundColor: headerColor }}>
      <Flex justify="center" className="transform translate-y-[-10px]" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <Logo height="100" />
      </Flex>

      <Flex vertical align="center" className="pb-4">
        <Title level={3} style={{ margin: 0 }} className="text-white">
          {title}
        </Title>
        {description && <Text type="secondary" className="text-gray-300">{description}</Text>}
      </Flex>
    </div>
  )
}
