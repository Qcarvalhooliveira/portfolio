import styled from "styled-components";

export const HomepageContainer = styled.div`


    width: 100%;
    text-align: center;
   
    font-family: 'Bungee Hairline', sans-serif; 


h1 {
    font-family: 'Bungee';
    font-weight:600;
    margin-top: 30px;
}
.list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    
}

.item {
    display: flex; 
    align-items: center; 
    margin: 30px 70px;
    border-radius: 20px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f4ecf7;
}

.item img {
    max-width: 30%; 
    height: auto; 
    margin-right: 20px;
    border-radius: 10px;
}

.content {
    display:flex;
    flex-direction: column;
    align-items:flex-start;    
    flex-grow: 1;
    padding: 15px;

}


.title {
    font-family: 'Bungee';
    font-weight:600;
    font-size:1.3rem;
    margin-bottom: 10px;
    color:#800F74;
}

.topic {
    font-size: 1em;
    color: #666;
    margin-bottom: 15px;
    font-weight:700;
}

.tools {
    font-style: italic;
    margin-bottom: 15px;
    font-weight:700;
}

.description {
    text-align: justify;
    margin-bottom: 15px;
    font-weight:700;
}

.buttom {
    text-align: center;
}

.buttom button {
    padding: 10px 20px;
    background-color: #800F74;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.buttom button:hover {
    background-color: #cb6ce6;
}

.About {
    width: 100%;
    height: 800px;
    background-color: #800F74;
    padding: 20px;
}

.About .foto {
    max-width:20%;
    max-height:30%;

}

.About h1 {
    font-family: 'Bungee';
    color: #ffff;
    font-weight: 600;
    
}

.About p {
    color: #ffff;
    text-align: justify;
    padding: 30px 100px 10px 100px;
    font-weight: 700;
    font-size: 18px;

}

.About div img {

    padding:30px;
}

.Contact {
    width: 100%;
    height: 400px;
    
}

.Contact h1 {
    font-family: 'Bungee';
    color: #800F74;
    font-weight: 600;
}

.email-container {
    display: flex; 
    align-items: center; 
    justify-content: center;
    padding: 20px;
    gap: 20px;   
    max-width: 60%;
    height: 100px;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f4ecf7;
}

.Contact p {
  padding: 20px;
  font-family: 'Bungee';
  font-weight: 400;
  font-size: 18px;
}

.Contact button {
    padding: 20px;
    text-decoration: none;
}

.Contact a {
  padding: 10px;
  background-color: #800F74;;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
}

    

`;