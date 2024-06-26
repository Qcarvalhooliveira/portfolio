/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { HomepageContainer } from "./styles";
import printf from "../../assets/ printf.png";
import shell from "../../assets/ Simple Shell.png";
import airbnb from "../../assets/ Airbnb.png";
import afrohair from "../../assets/Banner-afrohair.png";
import foto from "../../assets/foto.png";
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';




const itemVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

export function Homepage(){

  const copyToClipboard = () => {
    navigator.clipboard.writeText("queisecarvalhodev@gmail.com")
      .then(() => {
        alert('E-mail copied to clipboard!');
      })
      .catch(err => {
        console.error('Something went wrong', err);
      });
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(
    < HomepageContainer>
      <div id="projects" className="list">
        <h1>Projects</h1>
        {isMobile ? (
          <Carousel>
            <Carousel.Item>
              <div className='item'>
                <img src={afrohair} alt="afrohair"/>
                <div className="content">
                  <div className="title">Projet AFROHAIR</div>
                  <div className="topic">Project Portfolio Frontend et Backend</div>
                  <div className="tools">
                    Frontend - HTML - CSS - React - TypeScript<br />
                    Backend - Node.js - Knex.js - SQlite
                  </div>
                  <div className="description">For my final evaluation, I was tasked with creating a website from scratch, utilizing all the knowledge I had acquired throughout the course. It was incredibly rewarding to develop a fully functional site dedicated to the sale of natural hair products. This project allowed me to showcase my skills in front-end and back-end development, translations, and payment integrations. Its success has inspired me to pursue further specialization in full-stack development to enhance my skills even more.
                  </div>
                  <div className="buttom">
                    <a href="https://github.com/Qcarvalhooliveira/Afro-Hair" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="item">
                <img src={airbnb} alt="airbnb"/>
                <div className="content">
                  <div className="title">Project AirBNB Clone</div>
                  <div className="topic">Project d’Evaluation fin du 2° trimestre</div>
                  <div className="tools">
                    Pyhton - Flask - MySQL - JavaScript - HTML- CSS
                  </div>
                  <div className="description">For our end-of-second-trimester evaluation, we took on the task of cloning the AirBNB website. This project significantly enhanced our front-end and back-end development skills. It was a comprehensive learning experience, deepening our understanding of full-stack web development.
                  </div>
                  <div className="buttom">
                    <a href="https://github.com/Qcarvalhooliveira/holbertonschool-AirBnB_clone_v4" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="item">
                <img src={shell} alt="shell"/>
                <div className="content">
                  <div className="title">Project Simple Shell</div>
                  <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
                  <div className="tools">C</div>
                  <div className="description">As our second evaluation project in the first trimester, we faced the challenge of building a command interpreter from scratch. It was a demanding project that tested our abilities. Successfully completing it demonstrated our growing skills in handling complex programming tasks.
                  </div>
                  <div className="buttom">
                    <a href="https://github.com/Qcarvalhooliveira/holbertonschool-simple_shell" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="item">
                <img src={printf} alt="printf"/>
                <div className="content">
                  <div className="title">Project PRINTF</div>
                  <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
                  <div className="tools">C</div>
                  <div className="description">Our first project aimed to showcase the skills we acquired in the first trimester, focusing on variables, strings, and memory allocation in C. This project involved creating our version of the printf function, highlighting our foundational understanding of C programming.
                  </div>
                  <div className="buttom">
                    <a href="https://github.com/Qcarvalhooliveira/holbertonschool-printf" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        ) : (

          <>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 1.0 }} className="item">
              <img src={afrohair} alt="afrohair"/>
              <div className="content">
                <div className="title">Projet AFROHAIR</div>
                <div className="topic">Project Portfolio Frontend et Backend</div>
                <div className="tools">
                  Frontend - HTML - CSS - React - TypeScript<br />
                  Backend - Node.js - Knex.js - SQlite
                </div>
                <div className="description">For my final evaluation, I was tasked with creating a website from scratch, utilizing all the knowledge I had acquired throughout the course. It was incredibly rewarding to develop a fully functional site dedicated to the sale of natural hair products. This project allowed me to showcase my skills in front-end and back-end development, translations, and payment integrations. Its success has inspired me to pursue further specialization in full-stack development to enhance my skills even more.
                </div>
                <div className="buttom">
                  <a href="https://github.com/Qcarvalhooliveira/Afro-Hair" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 1.0 }} className="item">
              <img src={airbnb} alt="airbnb"/>
              <div className="content">
                <div className="title">Project AirBNB Clone</div>
                <div className="topic">Project d’Evaluation fin du 2° trimestre</div>
                <div className="tools">
                  Pyhton - Flask - MySQL - JavaScript - HTML- CSS
                </div>
                <div className="description">For our end-of-second-trimester evaluation, we took on the task of cloning the AirBNB website. This project significantly enhanced our front-end and back-end development skills. It was a comprehensive learning experience, deepening our understanding of full-stack web development.
                </div>
                <div className="buttom">
                  <a href="https://github.com/Qcarvalhooliveira/holbertonschool-AirBnB_clone_v4" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 1.0 }} className="item">
              <img src={shell} alt="shell"/>
              <div className="content">
                <div className="title">Project Simple Shell</div>
                <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
                <div className="tools">C</div>
                <div className="description">As our second evaluation project in the first trimester, we faced the challenge of building a command interpreter from scratch. It was a demanding project that tested our abilities. Successfully completing it demonstrated our growing skills in handling complex programming tasks.
                </div>
                <div className="buttom">
                  <a href="https://github.com/Qcarvalhooliveira/holbertonschool-simple_shell" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 1.0 }} className="item">
              <img src={printf} alt="printf"/>
              <div className="content">
                <div className="title">Project PRINTF</div>
                <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
                <div className="tools">C</div>
                <div className="description">Our first project aimed to showcase the skills we acquired in the first trimester, focusing on variables, strings, and memory allocation in C. This project involved creating our version of the printf function, highlighting our foundational understanding of C programming.
                </div>
                <div className="buttom">
                  <a href="https://github.com/Qcarvalhooliveira/holbertonschool-printf" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>
          </>
        )};
      </div>

      <div id="about" className="About">
        <img className="foto" src={foto} alt="foto" />
        <h1>About me</h1>
        <div>
          <p>Hello, I'm Queise Carvalho! A programming student at Holberton School and I'm currently pursuing a specialization in full-stack development. Seeking new challenges, I transitioned from the administrative field to the world of programming. I've been living in France since 2016, where I worked as a paralegal for four years. However, I decided to make a career shift into technology and I'm thoroughly enjoying the journey. Being multilingual in Portuguese, French, English  and Spanish greatly aids in my studies and I'm keen on continuously advancing in this field.</p>

          <p>During the first cycle at Holberton School, I have acquired skills in a wide range of technologies and programming languages. Here are some of the key tools and languages I've learned:</p>

          <img src="https://skillicons.dev/icons?i=c,js,typescript,python,html,css,bootstrap,react,nodejs,mysql,git,github,vscode,figma,linux" />
        </div>
      </div>

      <div id="contact" className="Contact">
        <h1>Contact</h1>
        <div className="email-container">
          <p>queisecarvalhodev@gmail.com</p>
          <button title="copy" onClick={copyToClipboard}>📋</button>
          <a href="mailto:queisecarvalhodev@gmail.com" className="send-email-button">Send</a>
        </div>
      </div>
    </HomepageContainer>
  );
}