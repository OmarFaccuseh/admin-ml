import React, { Component , useState, useEffect} from "react";
import ListOrders from './pages/list_orders/Components/ListOrders';

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