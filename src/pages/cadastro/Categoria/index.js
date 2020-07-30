import React, { useState } from 'react';
import TemplateBase from '../../../components/TemplateBase';
import FormField from '../../../components/FormField';
import { Link } from 'react-router-dom';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (values === '') return;

    setCategorias([...categorias, values]);
    setValues(valoresIniciais);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setValue(event.target.getAttribute('name'), value);
  };

  const { nome, descricao, cor } = values;
  return (
    <TemplateBase>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={handleFormSubmit}>
        <FormField
          label="Nome da Categoria:"
          value={nome}
          onChange={handleInputChange}
          name="nome"
          type="text"
        />

        <div>
          <label>
            Descrição:
            <textarea
              type="text"
              name="descricao"
              onChange={handleInputChange}
              value={descricao}
            />
          </label>
        </div>

        <FormField
          label="Cor:"
          value={cor}
          onChange={handleInputChange}
          name="cor"
          type="color"
        />

        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {categorias.map((categoria, index) => {
          return <li key={`${index}_${categoria}`}>{categoria.nome}</li>;
        })}
      </ul>

      <Link to="/">Ir para Home</Link>
    </TemplateBase>
  );
}

export default CadastroCategoria;
