import { useState } from 'react'
import './App.css'
import EyeTrainer from './components/EyeTrainer'

function App() {
  const [mode, setMode] = useState<'circular' | 'horizontal' | 'vertical' | 'figure8' | 'spiral' | 'square' | 'random'>('circular')
  const [speed, setSpeed] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleStop = () => {
    setIsRunning(false)
    // 可以添加其他重置逻辑
  }

  return (
    <div className="app">
      <div className="control-panel">
        <h1>眼球训练</h1>
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
                圆周运动
              </button>
              <button
                className={mode === 'horizontal' ? 'active' : ''}
                onClick={() => setMode('horizontal')}
              >
                水平运动
              </button>
              <button
                className={mode === 'vertical' ? 'active' : ''}
                onClick={() => setMode('vertical')}
              >
                垂直运动
              </button>
              <button
                className={mode === 'figure8' ? 'active' : ''}
                onClick={() => setMode('figure8')}
              >
                8字运动
              </button>
              <button
                className={mode === 'spiral' ? 'active' : ''}
                onClick={() => setMode('spiral')}
              >
                螺旋运动
              </button>
              <button
                className={mode === 'square' ? 'active' : ''}
                onClick={() => setMode('square')}
              >
                方形运动
              </button>
              <button
                className={mode === 'random' ? 'active' : ''}
                onClick={() => setMode('random')}
              >
                随机运动
              </button>
            </div>
            <div className="speed-control">
              <h3>速度设置</h3>
              <label>速度调节：</label>
              <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
              <span>{speed}秒/周期</span>
            </div>
          </div>
        )}
      </div>

      <div className="trainer-container">
        <EyeTrainer mode={mode} speed={speed} isRunning={isRunning} />
      </div>
    </div>
  )
}

export default App
