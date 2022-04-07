import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Github from './pages/Github';

//componente, criar uma função que retorna um jsx (javacript com html)

ReactDOM.render( //o react dom está enviando o conteudo abaixo dentro da div root
//react.strictMode é um componente do react
//Github 
//  <React.StrictMode>
    <Github />, //antes era app, no lugar de Github
//  </React.StrictMode>,
  document.getElementById('root')
);
