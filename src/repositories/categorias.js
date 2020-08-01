import config from '../config/index';

const CATEGORIES_URL = `${config.URL_BACKEND}/categorias`;
const getAllWithVideos = async () => {
  const data = await fetch(`${CATEGORIES_URL}?_embed=videos`);
  if (data.ok) {
    const resposta = await data.json();
    return resposta;
  }

  throw new Error('Falha ao comunicar com o servidor');
};

const getAll = async () => {
  const data = await fetch(CATEGORIES_URL);
  if (data.ok) {
    const resposta = await data.json();
    return resposta;
  }

  throw new Error('Falha ao comunicar com o servidor');
};

const create = async (data) => {
  const response = await fetch(CATEGORIES_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const resposta = await response.json();
    return resposta;
  }

  throw new Error('Não foi possível cadastrar os dados');
};

export default {
  getAllWithVideos,
  getAll,
  create,
};
