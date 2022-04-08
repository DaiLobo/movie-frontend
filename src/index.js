import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./Router";

//componente, criar uma função que retorna um jsx (javacript com html)

ReactDOM.render( //o react dom está enviando o conteudo abaixo dentro da div root
//react.strictMode é um componente do react
//Github 
//  <React.StrictMode>
    <Router />, //antes era app, no lugar de Github
//  </React.StrictMode>,
  document.getElementById('root')
);
