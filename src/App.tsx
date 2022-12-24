import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar'
import Writer from './Components/Writer'
import Books from './Components/Books'
import SingleBook from './Components/SingleBook';

function App() {
  return (
 <>
 <BrowserRouter>
    <Routes>
    <Route path='' element={<Sidebar />}>
    <Route path='add-writer' element={<Writer />} />
    <Route path='add-book' element={<Books />} />
    <Route path="/add-book/:id" element={<SingleBook />} />

    </Route>
    </Routes>
 </BrowserRouter>
 </>
  );
}

export default App;
