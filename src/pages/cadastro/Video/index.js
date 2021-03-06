import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import TemplateBase from '../../../components/TemplateBase';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const { handleInputChange, values } = useForm({});

  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { titulo, url } = values;

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
      <h1>Cadastro de Vídeos</h1>

      <form onSubmit={(event) => {
        event.preventDefault();

        // eslint-disable-next-line max-len
        const categoriaSelecionada = categorias.find((categoria) => categoria.titulo === values.categoria);

        videosRepository.create({
          titulo,
          url,
          categoriaId: categoriaSelecionada.id,
        })
          .then(() => {
            toast.info('Vídeo cadastrado com sucesso');
            history.push('/');
          });
      }}
      >
        <FormField
          label="Título do Vídeo:"
          value={titulo}
          onChange={handleInputChange}
          name="titulo"
          type="text"
        />

        <FormField
          label="URL do Vídeo:"
          value={url}
          onChange={handleInputChange}
          name="url"
          type="text"
        />

        <FormField
          label="Categoria:"
          value={values.categoria}
          onChange={handleInputChange}
          name="categoria"
          type="text"
          suggestions={categoryTitles}
        />
        <Button type="submit" buttonColor="#2a7ae4">Cadastrar</Button>
      </form>
      <p>
        <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
      </p>
    </TemplateBase>
  );
}

export default CadastroVideo;
