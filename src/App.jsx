import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
 
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), 
  linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [currentGreeting, setCurrentGreeting] = useState('');
  const [showGreeting, setShowGreeting] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const greetings = ['Hey', 'Hello', 'Ciao', 'નમસ્તે', 'Bonjour'];
    let index = 0;

    const greetingInterval = setInterval(() => {
      setCurrentGreeting(greetings[index]);
      index++;
      if (index >= greetings.length) {
        clearInterval(greetingInterval);
        setShowGreeting(false);
        setShowIntro(true);
      }
    }, 350); // Change greeting every 0.35 seconds

    return () => clearInterval(greetingInterval); // Cleanup on unmount
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        {showIntro && <Navbar className="fade-in" />}
        <Body>
          {showGreeting && <div className="greeting">{currentGreeting}</div>}
          {showIntro && (
            <div className="fade-in">
              <HeroSection />
              <Wrapper>
                <Skills />
              </Wrapper>
              <Projects openModal={openModal} setOpenModal={setOpenModal} />
              <Wrapper>
                <Contact />
              </Wrapper>
              <Footer />
              {openModal.state && (
                <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
              )}
            </div>
          )}
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;