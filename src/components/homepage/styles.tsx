import styled from "styled-components";

export const HomepageContainer = styled.div`


    max-width: 100%;
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


.buttom a {
    text-align: center;
    text-decoration: none;
    font-weight: 600;
    padding: 10px 20px;
    background-color: #800F74;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.buttom a:hover {
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
    max-width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 80px;
  
}

.Contact h1 {
    font-family: 'Bungee';
    color: #800F74;
    font-weight: 600;
}

.email-container {
    max-width: 100%;
    display: flex; 
    align-items: center; 
    justify-content: center;
    padding: 20px;
    gap: 20px;   
    height: 100px;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f4ecf7;

    button{
        padding: 20px;
        border: none;
        font-size: 25px;
        cursor: pointer;
    }
}

.Contact p {
  padding: 20px;
  font-family: 'Bungee';
  font-weight: 400;
  font-size: 18px;
}


.Contact a {
  padding: 10px;
  background-color: #800F74;;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
} 

@media screen and (max-width: 768px) {

.list{
    padding: 2px;
}

.item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }

.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.About{
    width: 100%;
    height: 950px;
}

.About p{

    padding: 30px 50px 20px 70px;
    
}
.About div img {
    width: 95%;
    padding: 40px;
}
.email-container{
    max-width: 80%;
}

@media screen and (max-width: 480px) {

    .item {
        width: 95%;
    }

    .About{
    width: 100%;
    height: auto;
}

    .About p{
        width: 100%;
        padding: 10px 0;
        margin: 0 auto;
        box-sizing: border-box;  
}

    .About div img {
        max-width: 100%;
        padding: 15px;
    }

    .Contact {
        width: 100%;
        padding: 10px;
        gap: 30px;
    }

    .email-container {
        width: 100%;
        flex-direction: column;
        height: auto;
    }

    .Contact p, .Contact button, .Contact a {
        padding: 0 8px;
        font-size: 14px;
    }

    .Contact button, .Contact a {
        width: auto;
        padding: 8px 16px;

}
}
}
`;