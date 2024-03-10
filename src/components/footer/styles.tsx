// No seu arquivo styles.tsx
import styled from 'styled-components';

export const FooterContainer = styled.footer<{ style?: any }>` // Adicionando propriedade de estilo opcional
  width: 100%;
  height: 200px;
  background-color: #800F74;
  position: absolute;

  .icons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60rem;
    padding: 50px;
  }

  img {
    height: 50px;
  }
`;
