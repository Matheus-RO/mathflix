import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Action from './components/Action';
import EditIcon from '../../assets/img/edit-icon.svg';
import DeleteIcon from '../../assets/img/delete-icon.svg';

const TableParent = styled.table`
  border: 2px solid var(--primary);
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10vh;
  margin-top: 5vh;
  
  tbody > tr{
    border: 5px solid rgba(0, 0, 0, 0.9);
    background-color: #080909;
  }

  td{
    padding: 5px;
  }
`;

const TableHead = styled.thead`
  font-size: 1.3rem;
  tr{
    background-color: #53585d;
  }
`;

const ActionTD = styled.td`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

function Table({ categorias, onActionClick }) {
  if (!categorias || categorias.length === 0) {
    return null;
  }

  const handleActionClick = (id, type) => {
    onActionClick(id, type);
  };

  return (
    <div>
      <TableParent>
        <TableHead>
          <tr>
            <td style={{ width: '20%' }}>Nome</td>
            <td style={{ width: '73%' }}>Descrição</td>
            <td style={{ width: '7%' }}>Ações</td>
          </tr>
        </TableHead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.titulo}</td>
              <td>{categoria.descricao}</td>
              <ActionTD>
                <Action icon={EditIcon} type="Editar" onClick={handleActionClick} categoriaId={categoria.id} />
                <Action icon={DeleteIcon} type="Deletar" onClick={handleActionClick} categoriaId={categoria.id} />
              </ActionTD>
            </tr>
          ))}
        </tbody>
      </TableParent>
    </div>
  );
}
Table.defaultProps = {
  categorias: {},
};

Table.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.object),
  onActionClick: PropTypes.func.isRequired,
};

export default Table;
