import React from 'react';
import Nav from '../components/Nav';
import '../App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from '../Context';

const OrderPage =() => {

    return (
        <ContextProvider>
            <ChakraProvider>
               <Nav></Nav>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <h1>Order a deliver</h1>
            </ChakraProvider>
        </ContextProvider>
    )
}

export default OrderPage