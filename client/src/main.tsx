import ReactDOM from 'react-dom/client';

import './styles/index.css';

import App from './App';

import './setupAxios.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
