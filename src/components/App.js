import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import { useState } from 'react';

function App() {
  const [output, setOutput] = useState(null);
  const [crop, setCrop] = useState()

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home setCrop={setCrop} crop={crop} output={output} setOutput={setOutput} />} />
        <Route exact path='/filter' element={<Filter output={output} crop={crop} />} />
      </Routes>
    </Router>
  );
}

export default App;
