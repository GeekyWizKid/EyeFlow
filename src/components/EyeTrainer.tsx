import React, { useState, useEffect } from 'react';
import '../styles/EyeTrainer.css';

interface EyeTrainerProps {
  mode?: 'circular' | 'horizontal' | 'vertical' | 'figure8' | 'spiral' | 'square' | 'random';
  speed?: number; // 动画速度，单位：秒
  isRunning?: boolean;
  dotColor?: string; // 小球颜色
  backgroundColor?: string; // 背景颜色
  dotSize?: number; // 小球大小，单位：像素
  containerClassName?: string; // 容器的额外类名
}

const EyeTrainer: React.FC<EyeTrainerProps> = ({
  mode = 'circular',
  speed = 5,
  isRunning = true,
  dotColor = '#2196f3',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  dotSize = 20,
  containerClassName = ''
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9);
      setContainerSize(size * 0.4); // 设置运动范围为容器的40%
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    
    setStartTime(Date.now());
    let animationFrameId: number;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000; // 转换为秒
      const progress = (elapsed % speed) / speed;

      switch (mode) {
        case 'circular':
          const angle = progress * 2 * Math.PI;
          setPosition({
            x: Math.cos(angle) * containerSize,
            y: Math.sin(angle) * containerSize
          });
          break;
        case 'horizontal':
          setPosition({
            x: Math.cos(progress * 2 * Math.PI) * containerSize,
            y: 0
          });
          break;
        case 'vertical':
          setPosition({
            x: 0,
            y: Math.sin(progress * 2 * Math.PI) * containerSize
          });
          break;
        case 'figure8':
          const t = progress * 2 * Math.PI;
          setPosition({
            x: Math.sin(t) * containerSize,
            y: Math.sin(t * 2) * (containerSize * 0.5)
          });
          break;
        case 'spiral':
          const spiralAngle = progress * 2 * Math.PI * 3;
          // 使用三角函数实现平滑的往返运动
          const radius = (Math.abs(Math.cos(progress * Math.PI))) * containerSize;
          setPosition({
            x: Math.cos(spiralAngle) * radius,
            y: Math.sin(spiralAngle) * radius
          });
          break;
        case 'square':
          const squareProgress = (progress * 4) % 4;
          if (squareProgress < 1) {
            setPosition({ x: -containerSize + squareProgress * containerSize * 2, y: -containerSize });
          } else if (squareProgress < 2) {
            setPosition({ x: containerSize, y: -containerSize + (squareProgress - 1) * containerSize * 2 });
          } else if (squareProgress < 3) {
            setPosition({ x: containerSize - (squareProgress - 2) * containerSize * 2, y: containerSize });
          } else {
            setPosition({ x: -containerSize, y: containerSize - (squareProgress - 3) * containerSize * 2 });
          }
          break;
        case 'random':
          const seed = Math.sin(progress * 2 * Math.PI);
          setPosition({
            x: Math.sin(seed * 8.3) * containerSize,
            y: Math.cos(seed * 7.5) * containerSize
          });
          break;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mode, speed, isRunning, containerSize, startTime]);

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className={`eye-trainer-container ${containerClassName}`} 
      style={{ background: backgroundColor }}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => e.preventDefault()}
    >
      <div
        className="training-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          background: `linear-gradient(145deg, ${dotColor}, ${adjustColor(dotColor, -20)})`,
          boxShadow: `${dotColor}99 0 0 25px`,
          width: `${dotSize}px`,
          height: `${dotSize}px`
        }}
      />
    </div>
  );
};

// 辅助函数：调整颜色亮度
const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
};

// 辅助函数：调整颜色透明度
const adjustColorOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default EyeTrainer;