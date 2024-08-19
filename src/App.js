import './App.css';
import Hero from './components/Hero.js';
import Specials from './components/Specials.js';
import Footer from './components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from './Context.js';
import Nav from './components/Nav.js';

function App() {

  return (
    <ContextProvider>
    <ChakraProvider>
      <Nav />
      <Hero />
      <Specials />
      <Footer />
    </ChakraProvider>
    </ContextProvider>
  );
}

export default App;
