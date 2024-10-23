import { Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React, { ImgHTMLAttributes, useEffect, useState } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({
  height = 70,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [colorShift, setColorShift] = useState(0)

  const goTo = (url: string) => {
    router.push(url)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setColorShift((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <Flex align="center" gap={10}>
      <img
        src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/HHH3Av-tryagain-UKuU"
        {...props}
        alt="Logo"
        height={height}
        style={{
          borderRadius: '5px',
          cursor: 'pointer',
          objectFit: 'contain',
          height: `${height}px`,
          transition: 'all 3s ease-in-out',
          animation: `float 3s ease-in-out infinite, colorShift 3s linear infinite`,
          filter: `hue-rotate(${colorShift}deg)`,
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          ...style,
        }}
        onClick={() => goTo('/home')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isLabel && (
        <Typography.Title level={4} style={{ margin: '0px' }}>
          TryAgain
        </Typography.Title>
      )}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes colorShift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </Flex>
  )
}
