import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CadastroVideo from './pages/cadastro/Video';
import CadastroCategoria from './pages/cadastro/Categoria';

const page404 = () => <div>Página 404</div>;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/cadastro/video" component={CadastroVideo} exact />
      <Route path="/cadastro/categoria" component={CadastroCategoria} exact />

      {/* Rota default - Se tiver sem path e o usuário tentar navegar por uma rota inixistente ele sempre exibirá este componente */}
      <Route component={page404} />
    </Switch>
  </BrowserRouter>,

  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById('root')
);
