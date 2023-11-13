import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import styled from "styled-components";
import PizzaDetails from "./PizzaDetails"; 

import { useParams } from "react-router-dom";
import Order from "./Order";
import OrderConfirmation from "./OrderConfirmation";


const App = () => {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />

            <Routes>

                <Route path="/" element={<Homepage/>} />
                {/* <Route path="/order" element={<h1>Pizza Time?</h1>} /> */}
                <Route path={`/pizzas/:pizzaId`} element={<PizzaDetails />} />
                <Route path="/order" element={< Order />} />   
                <Route path={`/confirm/:orderId`} element={<OrderConfirmation />} />             

            </Routes>
            
        </BrowserRouter>
    );
};

export default App;
