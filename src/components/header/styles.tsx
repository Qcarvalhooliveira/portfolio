import styled from "styled-components";

export const HeaderContainer = styled.header`

display: flex;
align-items: flex-start;
justify-content: space-between;
padding: 4rem;
height:100vh;

background: no-repeat;
background-size: cover;


   

:first-child{
    display:flex;
    align-items: center;
    justify-content:center;
    img {
        height: 4rem;
        width: 4rem;
    }

 
}
.navigation{
       display: flex;
       align-items: center;
       justify-content:space-between;
       gap: 1rem;

      button {
      background: transparent;
      border: none;
      padding: 0.5rem 1rem;
      color: #fff;
    
      cursor: pointer;
      transition:0.3s;
      &:hover {
         
         background:transparent;
         color: #800F74;
       
       }
   
    }
    }

button {
    display: flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
    text-decoration: none;

    width: 130px;
    height: 35px;
    border-radius: 22px;
    background-color: #cb6ce6;
    color: #FFFFFF;
    border: none;
    font-family: 'Source Sans Pro', sans-serif; 
    font-weight: 600;
    font-size: 14px;
    box-shadow: 3px 3px 10px 3px rgba(0.25,0.25,0.25,0.25);
    padding: 0.5rem 1rem;
     
    transition: 0.3s;

      &:hover {
         
        background: #800F74;
      }

}

.side-links {
    
    position: fixed; // Fixa o componente na tela
    left: 10px; // Distância da borda esquerda
    top: 50%; // Centraliza verticalmente
    display: flex;
    flex-direction: column; // Links em coluna
    gap: 15px; // Espaçamento entre os links

    a {
      color: #fff; // Cor do texto
      text-decoration: none; // Remove o sublinhado
      // Mais estilos para os links, se necessário
    }

    a:hover {
      color: #cb6ce6; // Cor ao passar o mouse
    }
  }

`;