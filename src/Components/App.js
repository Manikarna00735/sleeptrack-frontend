import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Introduction from './Introduction';
import Sleeptracker from './Sleeptracker';




function App() {
  
  
  return (
    
    <div >
      
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Introduction />}/>
        <Route path="/sleeptrack" element={<Sleeptracker />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
