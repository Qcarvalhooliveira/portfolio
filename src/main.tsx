import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { Header } from './components/header/index.tsx';
import { GlobalStyle } from './styles/GlobalStyles.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Header/>
    <App />
  </React.StrictMode>,
);
