import styled, { css } from 'styled-components';

const Button = styled.button`
  color: var(--white);
  border: 1px solid var(--white);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.3s;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
  /* background-color: var(--primary); */
  ${({ buttonColor }) => {
    const hasColor = buttonColor !== '';

    return hasColor && css`
        background-color: ${buttonColor};
    `;
  }}
`;
export default Button;
