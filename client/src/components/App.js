import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import styled from "styled-components";

const App = () => {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />

            <Routes>

                <Route path="/" element={<Homepage/>} />
                <Route path="/order" element={<h1>Pizza Time?</h1>} />
                

            </Routes>
            
        </BrowserRouter>
    );
};

export default App;
