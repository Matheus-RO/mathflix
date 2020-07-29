import React from 'react';
import TemplateBase from '../../../components/TemplateBase';
import { Link } from 'react-router-dom';

function CadastroVideo() {
  return (
    <TemplateBase>
      <h1>Cadastro de Vídeos</h1>

      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </TemplateBase>
  );
}

export default CadastroVideo;
