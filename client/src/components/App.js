import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyles";
import Header from "./Header";

const App = () => {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />

            <Routes>

                <Route path="/" element={<h1>Pizza Time!</h1>} />
                <Route path="/order" element={<h1>Pizza Time?</h1>} />

            </Routes>
            
        </BrowserRouter>
    );
};

export default App;
