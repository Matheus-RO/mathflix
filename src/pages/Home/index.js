import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import TemplateBase from '../../components/TemplateBase';
import categoriasRepository from '../../repositories/categorias';
import Spinner from '../../components/Spinner';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <TemplateBase paddingAll={0}>
      {dadosIniciais.length === 0 && (<Spinner />)}

      {dadosIniciais.map((categoria, index) => {
        if (index === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription="Ao saber que tem câncer já em estado terminal, um gênio da química que nunca conseguiu ir além de se tornar um professor decide usar sua experiência no laboratório para juntar um dinheiro para sua família, produzindo a melhor metanfetamina do mundo."
              />
              <Carousel ignoreFirstVideo category={dadosIniciais[0]} />
            </div>
          );
        }

        return (
          <Carousel key={categoria.id} category={categoria} />
        );
      })}
    </TemplateBase>
  );
}

export default Home;
