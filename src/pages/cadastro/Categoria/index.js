import React, { useState, useEffect } from 'react';
import TemplateBase from '../../../components/TemplateBase';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';
import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000000',
  };

  const { handleInputChange, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);

  const { titulo, descricao, cor } = values;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!values || values.length === 0) return;

    categoriasRepository.create({
      titulo,
      descricao,
      cor,
    })
      .then((resposta) => {
        setCategorias([...categorias, resposta]);
      })
      .catch((err) => {
        console.log(err);
      });

    clearForm(valoresIniciais);
  };

  useEffect(() => {
    categoriasRepository.getAll()
      .then((categoriasResposta) => {
        setCategorias([
          ...categoriasResposta,
        ]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <TemplateBase>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={handleFormSubmit}>
        <FormField
          label="Nome da Categoria:"
          value={titulo}
          onChange={handleInputChange}
          name="titulo"
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

        <Button>Salvar</Button>
      </form>

      {categorias.length === 0 && (
        <Spinner />
      )}

      <Table categorias={categorias} />
    </TemplateBase>
  );
}

export default CadastroCategoria;
