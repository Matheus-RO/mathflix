import { useState } from 'react';

export default function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);
  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setValue(event.target.getAttribute('name'), value);
  };

  const clearForm = () => {
    setValues(valoresIniciais);
  };

  return {
    values,
    handleInputChange,
    clearForm,
    setValues,
  };
}
