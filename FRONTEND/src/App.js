import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './Routes';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesIndex />
    </BrowserRouter>
  );
};

export default App;