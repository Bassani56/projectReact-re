import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppTabela from './AppTabela';
import Conteudo from './pesquisaCards/Conteudo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AppTabela />
      
      <Conteudo/>
  </React.StrictMode>
);


