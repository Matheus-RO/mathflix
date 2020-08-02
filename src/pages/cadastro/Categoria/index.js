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

  const {
    handleInputChange, values, clearForm, setValues,
  } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);
  const [operacao, setOperacao] = useState('Criar');
  const [idCategoriaAtual, setIdCategoriaAtual] = useState(0);

  const { titulo, descricao, cor } = values;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!values || values.length === 0) return;

    const requisicao = {
      titulo,
      descricao,
      cor,
    };

    if (operacao === 'Criar') {
      categoriasRepository.create(requisicao)
        .then((resposta) => {
          setCategorias([...categorias, resposta]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      categoriasRepository.update({ ...requisicao, id: idCategoriaAtual })
        .then((resposta) => {
          const categoriaAtualizadaIndex = categorias.findIndex(
            // eslint-disable-next-line comma-dangle
            (categoria) => categoria.id === idCategoriaAtual
          );

          const novasCategorias = [...categorias];
          novasCategorias[categoriaAtualizadaIndex] = resposta;
          console.log(novasCategorias, 'updated');
          setCategorias(novasCategorias);
          console.log(categorias);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setOperacao('Criar');
    setIdCategoriaAtual(0);
    clearForm(valoresIniciais);
  };

  const handleActionClick = (id, type) => {
    if (type === 'Deletar') {
      categoriasRepository.remove(id);

      const categoriasAtuais = categorias.filter((categoria) => categoria.id !== id);
      setCategorias(categoriasAtuais);
      return;
    }

    const categoriaEdicao = categorias.find((categoria) => categoria.id === id);
    console.log(categoriaEdicao);

    setValues({
      titulo: categoriaEdicao.titulo,
      descricao: categoriaEdicao.descricao,
      cor: categoriaEdicao.cor,
    });

    setIdCategoriaAtual(id);
    setOperacao(type);
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

      <Table categorias={categorias} onActionClick={handleActionClick} />
    </TemplateBase>
  );
}

export default CadastroCategoria;
