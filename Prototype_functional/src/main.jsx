import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// 在页面根节点启动导览应用，并通过严格模式检查开发阶段的副作用。
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
