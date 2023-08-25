import React, { Component , useState, useEffect} from "react";
import ListOrders from './Components/ListOrders';
import Navbar from "./Navigation/Navbar.js";

// TODO:  ESTE DEBERIA SER APP, y que desde aqui se renderize solo LIST ORDERS !!!!!!!!

export function App() {

  return (
    <div >
      <main className="container">
        <div id="doc-app">
          <ListOrders />
        </div>
      </main>
    </div>
  )
  
}

export default App;