import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Workspace } from './pages/Workspace';

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/ex1"
        element={<Workspace />}
      />
    </Routes>
  );

}

export default App;
