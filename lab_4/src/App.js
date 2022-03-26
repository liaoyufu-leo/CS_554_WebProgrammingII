import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./component/Home"
import Characters from "./component/Characters"
import Character from "./component/Character"
import Comics from "./component/Comics"
import Comic from "./component/Comic"
import Series from "./component/Series"
import Serie from "./component/Serie"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters/page/:page" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/comics/page/:page" element={<Comics />} />
          <Route path="/comics/:id" element={<Comic />} />
          <Route path="/series/page/:page" element={<Series />} />
          <Route path="/series/:id" element={<Serie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
