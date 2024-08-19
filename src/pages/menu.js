import React from 'react';
import Nav from '../components/Nav';
import '../App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from '../Context';

const menu =() => {

    return (
        <ContextProvider>
        <ChakraProvider>
           <Nav></Nav>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <h1>Menu</h1>
        </ChakraProvider>
        </ContextProvider>
    )
}

export default menu