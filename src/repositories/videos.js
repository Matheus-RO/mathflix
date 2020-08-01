import config from '../config/index';

const VIDEOS_URL = `${config.URL_BACKEND}/videos`;
const create = async (data) => {
  const response = await fetch(VIDEOS_URL, {
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
  create,
};
