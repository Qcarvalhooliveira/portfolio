import styled from "styled-components";

export const HeaderContainer = styled.header`

display: flex;
align-items: flex-start;
justify-content: space-between;
padding: 4rem;
flex-wrap:wrap;
height:100vh;

background: no-repeat center center;


   

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
    color: #fff;

    background: #7843e6; 
      border: 1 pxrgba(255, 255, 255, 0.2);
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: 0.3s;

      &:hover {
         
        background: #800F74;
      }

}
`;