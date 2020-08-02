import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Span = styled.span`
    cursor: pointer;
`;

function Action({
  icon, type, onClick, categoriaId,
}) {
  const handleClick = () => {
    onClick(categoriaId, type);
  };

  return (
    <Span onClick={handleClick}>
      <img src={icon} alt={`Ícone de ${type}`} title={type} />
    </Span>
  );
}

Action.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  categoriaId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Action;
