import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TemplateBase from '../../../components/TemplateBase';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

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

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';
    const getCategorias = async () => {
      const data = await fetch(URL);
      const resposta = await data.json();
      setCategorias([
        ...resposta,
      ]);
    };

    getCategorias();
  }, []);

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

        <FormField
          label="Descrição:"
          value={descricao}
          onChange={handleInputChange}
          name="descricao"
          type="textarea"
        />

        <FormField
          label="Cor:"
          value={cor}
          onChange={handleInputChange}
          name="cor"
          type="color"
        />

        <Button>Cadastrar</Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Carregando...
        </div>
      )}

      <ul>
        {categorias.map((categoria, index) => <li key={`${index}_${categoria}`}>{categoria.titulo}</li>)}
      </ul>

      <Link to="/">Ir para Home</Link>
    </TemplateBase>
  );
}

export default CadastroCategoria;
