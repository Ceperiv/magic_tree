import React from 'react';

import './App.css';
import {Routers} from "./routers/routers";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routers/>
            </div>
        </BrowserRouter>
    );
}

export default App;
