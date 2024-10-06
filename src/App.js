import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Terrestrial from './components/Terrestrial';
import SuperEarth from './components/Super_Earth';
import GasGiant from './components/Gas_Giant';
import Unknown from './components/Unknown';
import NeptuneLike from './components/Neptune_Like';
import Body from './components/Body';
import Quiz from './components/Quiz';



function Content() {
    
    return (
        <div className="bodySection">
            <Routes>
                <Route path="/" element={<Body />} />
                
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/gas-giant" element={<GasGiant />} />
                <Route path="/terrestrial" element={<Terrestrial />} />
                <Route path="/super-earth" element={<SuperEarth />} />
                <Route path="/neptune-like" element={<NeptuneLike/>} />
                <Route path="/unknown" element={<Unknown />} />
            </Routes>
        </div>
    );
}


function App() {
    return (
        <Router>
            {/* Use the Content component to conditionally apply bodySection */}
            <Content />
        </Router>
    );
}

export default App;
