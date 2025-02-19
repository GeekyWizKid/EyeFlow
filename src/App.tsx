import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import './App.css'
import EyeTrainer from './components/EyeTrainer'

function App() {
  const [mode, setMode] = useState<'circular' | 'horizontal' | 'vertical' | 'figure8' | 'spiral' | 'square' | 'random' | 'diagonal' | 'butterfly' | 'zShape' | 'diamond' | 'wave'>('circular')
  const [speed, setSpeed] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [duration, setDuration] = useState(3) // 训练时长（分钟）
  const [remainingTime, setRemainingTime] = useState(0) // 剩余时间（秒）
  const [dotColor, setDotColor] = useState('#2196f3') // 小球颜色
  const [backgroundColor, setBackgroundColor] = useState('rgba(255, 255, 255, 0.1)') // 背景颜色
  const [dotSize, setDotSize] = useState(20) // 小球大小
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStart = () => {
    setIsRunning(true)
    setRemainingTime(duration * 60)
    if (isMobile) {
      setIsFullscreen(true)
      setShowSettings(false)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
    setRemainingTime(0)
    setIsFullscreen(false)
  }

  useEffect(() => {
    let timer: number
    if (isRunning && remainingTime > 0) {
      timer = window.setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            handleStop()
            alert('训练完成！')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, remainingTime])

  return (
    <div className={`app ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className={`control-panel ${isFullscreen ? 'hidden' : ''}`}>
        <h1>眼球训练 {remainingTime > 0 && `(${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')})`}</h1>
        <div className="main-controls">
          {!isRunning ? (
            <button onClick={handleStart} className="control-btn start">开始</button>
          ) : (
            <button onClick={handlePause} className="control-btn pause">暂停</button>
          )}
          <button onClick={handleStop} className="control-btn stop">结束</button>
          <button onClick={() => setShowSettings(!showSettings)} className="control-btn settings">设置</button>
        </div>

        {showSettings && (
          <div className="settings-panel">
            <div className="mode-selector">
              <h3>训练模式</h3>
              <button
                className={mode === 'circular' ? 'active' : ''}
                onClick={() => setMode('circular')}
              >
                ⭕ 圆周运动
              </button>
              <button
                className={mode === 'horizontal' ? 'active' : ''}
                onClick={() => setMode('horizontal')}
              >
                ↔️ 水平运动
              </button>
              <button
                className={mode === 'vertical' ? 'active' : ''}
                onClick={() => setMode('vertical')}
              >
                ↕️ 垂直运动
              </button>
              <button
                className={mode === 'figure8' ? 'active' : ''}
                onClick={() => setMode('figure8')}
              >
                ∞ 8字运动
              </button>
              <button
                className={mode === 'spiral' ? 'active' : ''}
                onClick={() => setMode('spiral')}
              >
                🌀 螺旋运动
              </button>
              <button
                className={mode === 'square' ? 'active' : ''}
                onClick={() => setMode('square')}
              >
                ⬜ 方形运动
              </button>
              <button
                className={mode === 'random' ? 'active' : ''}
                onClick={() => setMode('random')}
              >
                🎲 随机运动
              </button>
              <button
                className={mode === 'diagonal' ? 'active' : ''}
                onClick={() => setMode('diagonal')}
              >
                ⤡ 对角线运动
              </button>
              <button
                className={mode === 'butterfly' ? 'active' : ''}
                onClick={() => setMode('butterfly')}
              >
                🦋 蝴蝶运动
              </button>
              <button
                className={mode === 'zShape' ? 'active' : ''}
                onClick={() => setMode('zShape')}
              >
                Z Z字形运动
              </button>
              <button
                className={mode === 'diamond' ? 'active' : ''}
                onClick={() => setMode('diamond')}
              >
                💎 菱形运动
              </button>
              <button
                className={mode === 'wave' ? 'active' : ''}
                onClick={() => setMode('wave')}
              >
                〰️ 波浪运动
              </button>
            </div>
            <div className="speed-duration-controls">
              <div className="control-group">
                <h3>运动速度</h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />
                <span>{speed}秒/周期</span>
              </div>
              <div className="control-group">
                <h3>训练时长</h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
                <span>{duration}分钟</span>
              </div>
            </div>
            <div className="color-controls">
              <div className="control-group">
                <h3>小球颜色</h3>
                <input
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                />
              </div>
              <div className="control-group">
                <h3>背景颜色</h3>
                <input
                  type="color"
                  value={backgroundColor.replace(/[^#\d]/g, '#')}
                  onChange={(e) => setBackgroundColor(`${e.target.value}1a`)}
                />
              </div>
            </div>
            <div className="control-group">
              <h3>小球大小</h3>
              <input
                type="range"
                min="10"
                max="50"
                value={dotSize}
                onChange={(e) => setDotSize(Number(e.target.value))}
              />
              <span>{dotSize}像素</span>
            </div>
          </div>
        )}
      </div>

      <EyeTrainer
        mode={mode}
        speed={speed}
        isRunning={isRunning}
        dotColor={dotColor}
        backgroundColor={backgroundColor}
        dotSize={dotSize}
        containerClassName={isMobile ? (isRunning ? 'fullscreen-mode' : 'hidden') : ''}
      />
    </div>
  )
}

export default App
