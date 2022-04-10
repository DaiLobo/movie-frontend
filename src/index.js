import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./Router";

//componente, criar uma função que retorna um jsx (javacript com html)

ReactDOM.render( //o react dom está enviando o conteudo abaixo dentro da div root
  <MantineProvider>
    <ColorSchemeProvider>
    <NotificationsProvider>
      <Router />
    </NotificationsProvider>
    </ColorSchemeProvider>
  </MantineProvider>,
  document.getElementById('root')
);
