import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ListOrders from './Components/listOrders'
import DetailOrder from './Components/detailOrder';
import reportWebVitals from './reportWebVitals';
import CarritoProvider from './Components/carritoContext'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
      <BrowserRouter>
        <CarritoProvider style={{ backgroundColor: 'white' }}>
          <Routes>
            <Route index element={<ListOrders />}         /> 
            <Route path='orders/:order_id' element={<DetailOrder />}     />
          </Routes>
        </CarritoProvider>
      </BrowserRouter>

      

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
