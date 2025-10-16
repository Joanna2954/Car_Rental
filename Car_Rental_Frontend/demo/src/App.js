import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarManagement from './components/CarManagement';
import RentalManagement from './components/RentalManagement';

function App() {
  return (
   <div>
    


<BrowserRouter>

<Routes>
 

        <Route path="/cars" element={<CarManagement />} />
        <Route path="/rental" element={<RentalManagement />} />


</Routes>
</BrowserRouter>
  
   </div>
  );
}

export default App;
