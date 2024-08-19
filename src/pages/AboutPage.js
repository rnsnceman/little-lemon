import React from 'react';
import Nav from '../components/Nav';
import '../App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from '../Context';

const AboutPage =() => {
    return (
        <ContextProvider>
            <ChakraProvider>
            <div>
                <Nav></Nav>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>About Us</h1>
            </div>
            </ChakraProvider>
        </ContextProvider>
    )
}

export default AboutPage