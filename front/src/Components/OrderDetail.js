import React, { Component , useState, useEffect, useRef, forwardRef } from "react";
import Body from "./Body";
import axios from "axios";
import 'bootstrap';  // para tumbable
import DocComponent from './docComponent';
import PdfComponent from './pdfComponent';
import { useShoppingCart } from "./carritoContext"
import {useReactToPrint} from 'react-to-print'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import Navbar from '../Navigation/Navbar'

function OrderDetail() {

  const [showPdf, setShowPdf] = useState(true);
  const { cartItems, settFolio, settNombre, settFecha, settNotas, ordenes, addNewItem, changeCantidadItem, resetCarrito} = useShoppingCart();

  const {order_id} = useParams()  // parameter from Link (Routes)

  useEffect(()=>{
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
    .get("http://127.0.0.1:8000/inventario/order_detail/" + order_id + "/", 
      {mode: "cors"},
    )
    .then((res) => {
      const order = res.data[0].fields
      console.log("ORDER DETAIL ReSpOnSe: ", order)
      initializeContext(order);
    })
    .catch((err) => console.log(err))
  }, [])


  function initializeContext(order){
    console.log('Props Recieved: ' +  JSON.stringify(order))
    resetCarrito();
    settFolio(order.order_id);
    settNombre(order.customer);
    settNotas(order.notas)
    addNewItem(4, order.unit_price, order.qty, order.subtotal, order.product);
    changeCantidadItem(order.qty) // not worked
  }

  function createNote (event, value) {
    settNombre(document.getElementById('nombreInput').value);
    settFecha(document.getElementById('fechaInput').value);
    settNotas(document.getElementById('notasInput').value);
    settFolio(document.getElementById('folioInput').value);
  };

  // Aqui se almacenara una referencia al DOM element de pdfComp, para que printNote acceda
  const pdfComp = useRef()
  const printNote = () => {
                    const blob = new Blob([], { type: 'application/pdf' });
                    window.open(URL.createObjectURL(blob));
                    console.log("DOOOCCCC PPPDDDDFFF")
                    console.log(pdfComp.current) 
                  }

      /*useReactToPrint({      
      content: () => pdfComp.current,
      documentTitle: 'Order_print',
      onAfterPrint: ()=> alert('Impresion finalizada')
  }); */

 
  return (
    <div>
      <main className="container">

          <div>
             <Navbar />
          </div>   
          <h1 className="text-center my-3">
            NOTE GENERATOR
          </h1>
          <div className="row">
            <div className="col-md-10 col-sm-12 mx-auto mb-2 p-0">
              <div className="card p-3">

                <div className="mb-3">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="drop-template" data-bs-toggle="dropdown" aria-expanded="false">
                      Select Template
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="drop-template">
                      <li><a class="dropdown-item" > Template 1 </a></li>
                    </ul>
                  </div>
                </div>

                <div id="doc-template" >
                      <DocComponent />
                </div>

              </div>
            </div>
          </div>
          <div align="center">
            <button className="btn btn-primary m-2" onClick={(e) => createNote(e, 'idd:1')}>
              Generate PDF
            </button>
            <button className="btn btn-primary m-2" onClick={(e) => printNote(e, 'idd:2')}>
              IMPRIMIR
            </button>
          </div>
          <div className="row ">
            <div className="col-md-10 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="m-0">

                  <div id="doc-pdf">
                      <PdfComponent ref={pdfComp}/>  // regresame tu DOM en esta var
                  </div>
                </div>

                <ul className="list-group list-group-flush border-top-0">

                </ul>
              </div>
            </div>
          </div>
     </main>



    </div>
  );

}

export default OrderDetail;