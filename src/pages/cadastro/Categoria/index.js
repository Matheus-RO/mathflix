import React from 'react';
import TemplateBase from '../../../components/TemplateBase';
import { Link } from 'react-router-dom';

function CadastroCategoria() {
  return (
    <TemplateBase>
      <h1>Cadastro de Categoria</h1>

      <Link to="/">Ir para Home</Link>
    </TemplateBase>
  );
}

export default CadastroCategoria;
