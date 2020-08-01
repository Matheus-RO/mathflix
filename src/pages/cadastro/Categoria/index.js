import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TemplateBase from '../../../components/TemplateBase';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };

  const { handleInputChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (values === '') return;

    setCategorias([...categorias, values]);
    clearForm(valoresIniciais);
  };

  useEffect(() => {
    categoriasRepository.getAll()
      .then((categoriasResposta) => {
        setCategorias([
          ...categoriasResposta,
        ]);
        console.log(categoriasResposta);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const { titulo, descricao, cor } = values;
  return (
    <TemplateBase>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={handleFormSubmit}>
        <FormField
          label="Nome da Categoria:"
          value={titulo}
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
        {categorias.map((categoria) => <li key={categoria.id}>{categoria.titulo}</li>)}
      </ul>

      <Link to="/">Ir para Home</Link>
    </TemplateBase>
  );
}

export default CadastroCategoria;
