import { useParams } from "react-router-dom"
import React, { Component , useState, useEffect} from "react";
import { useShoppingCart } from "../Components/carritoContext"
import axios from 'axios';
import App from '../App';


export function DetailOrder() {

  const [orderDetail, setOrderDetail] = useState();
  const {order_id} = useParams()  // parameter from Link (Routes)
  const {cartItems, settFolio, settNombre, settFecha, settNotas, ordenes} = useShoppingCart();

  const fakeData = { 
      order_id : '010101010101010101',
      product: 'Herramienta de ejemplo',
      price: 100,
      qty: '1',
      subtotal: '1000',  
      customer: 'Cliente Ejemplo'
  }
  
  useEffect(()=>{
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
    .get("http://127.0.0.1:8000/inventario/order_detail/" + order_id + "/", 
      {mode: "cors"},
    )
    .then((res) => {
      const order = res.data[0].fields
      console.log("ORDER DETAIL ReSpOnSe: ", order)
      setOrderDetail(order);
    })
    .catch((err) => console.log(err))
  }, [])
  
  if (orderDetail) {
    return (
      <div style={{ backgroundColor: '#4B4B4C' }}>
        <main className="container">
          <h1>ORDER {order_id}</h1>

          <div id="doc-app">
            <App order={orderDetail}/>

          </div>
        </main>
      </div>
    )
  }
  //else{
    return null;
  //}
  
}

export default DetailOrder;