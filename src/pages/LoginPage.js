import React from 'react';
import Nav from '../components/Nav';
import '../App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from '../Context';

const LoginPage =() => {

    return (
        <ContextProvider>
            <ChakraProvider>
               <Nav></Nav>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <h1>Login</h1>
            </ChakraProvider>
        </ContextProvider>
    )
}

export default LoginPage