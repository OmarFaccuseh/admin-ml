import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import DetailOrder from './detailOrder';
import { Link } from 'react-router-dom';


export function ListOrders(){

    const [orders, setOrders] = useState([]);

	useEffect(()=>{
		getData()
	},[])

	function getData(){
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios
		.get("http://127.0.0.1:8000/api/orders/", {mode: "no-cors"})
		.then((res) => {
			setOrders(res.data)
			console.log("RESPONSE ORDERS ", res)
		})
		.catch((err) => console.log(err))
	}

	function get_url_order(order_id){
		return "orders/" + order_id
	}

	return (
		< >
			<main className="container" >

			  <h2> <Link to="/"> Home </Link></h2>		

	          <h1 className="text-center my-4">
	            ORDENES DE VENTA (ML)
	          </h1>
	          <table class="table table-bordered">
	            <thead>
	              <tr class='col-12 row'>
	                <th scope="col" style={{"width": "10%"}}>Status</th>
	                <th scope="col" style={{"width": "15%"}}>Venta ID</th>
	                <th scope="col" style={{"width": "40%"}}>Articulo</th>
	                <th scope="col" style={{"width": "5%"}}>Qty.</th>
	                <th scope="col" style={{"width": "10%"}}>Subtotal</th>
	                <th scope="col" style={{"width": "20%"}}>Cliente</th>
	              </tr>
	            </thead>
	            <tbody>
	            {
	              orders.map((orden, index)=>{
	              const {order_id , product, subtotal, customer, qty, status} = orden;
	              console.log('STATTT '+ JSON.stringify(orders));
	              return(
	                <tr  class='col-12 row'>
	                  <td class='col-2' style={{"width": "10%"}}>
	                  	<span name="status" type="text" value={status} style={{"width": "10%"}}> {status} </span>
	                  </td>
	                  <td class='col-2' style={{"width": "15%"}}>
	                  	<span name="order_id" type="text" value={order_id} style={{"width": "15%"}}> {order_id} </span>
	                  </td>
	                  <td class='col-4' style={{"width": "40%"}}>
	                  	<Link to={get_url_order(order_id)}> 
	                  		<span name="product" type="text" value={product} style={{"width": "40%"}}> {product} </span> 
	                  	</Link>
	                  </td>
	                  <td class='col-2' style={{"width": "5%"}}>
	                  	<span name="qty" type="text" value={qty} style={{"width": "5%"}}> {qty} </span>
	                  </td>
	                  <td class='col-2' style={{"width": "10%"}}>
	                  	<span name="subtotal" type="text" value={subtotal} style={{"width": "10%"}}> {subtotal} </span>
	                  </td>
	                  <td class='col-2' style={{"width": "20%"}}>
	                  	<span name="customer" type="text" value={customer} style={{"width": "20%"}}> {customer} </span>
	                  </td>
	                </tr>
	              )
	              })
	            }
	            </tbody>
	          </table>
            </main>

			

		</>

	)
}

export default ListOrders;

