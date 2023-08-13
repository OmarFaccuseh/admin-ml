import React, { Component , useState, useEffect, useRef, forwardRef } from "react";
import Body from "./Components/Body";
import axios from "axios";
import 'bootstrap';  // para tumbable
import DocComponent from './Components/docComponent';
import PdfComponent from './Components/pdfComponent';
import { useShoppingCart } from "../src/Components/carritoContext"
import {useReactToPrint} from 'react-to-print'
import { Link } from 'react-router-dom';



// Comment added 01
// this comentario debe ser agrgeado al commmit
// antes de debe recuperar la ultima version de la verison en el repositorio
// realizar merge con la version recuperada de este la version actualizada, en el sevidor
// revisar y probar que todos los commits sera verificados por el admin del pryecto.
// para arecursas ese metodo de revision es tomar el significado


function App({order}) {

  const [showPdf, setShowPdf] = useState(true);
  const { cartItems, settFolio, settNombre, settFecha, settNotas, ordenes, addNewItem, changeCantidadItem, resetCarrito} = useShoppingCart();

  useEffect(()=>{
    initializeContext();
  },[]);

  function initializeContext(){
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
      
      LAMBDA QUE SE DEBE APLICAR 

      A partir de aqui los cambios hay que commiterlos para que no de planchen las actulizacione
      hacer merge de todos los posibles cambios parezca bugueables en el mismo ins
      tante
      antes de hacer committ eliminar estos comentarios para que no se almacenne en el cache de las 
      particiones
  }); */


 // Directorio activo active directory spipa dodoria swipe copy
 
  return (
    <div>
      <main className="container">

          <h2> <Link to="/"> Home </Link></h2>    
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


export default App;

// como mierda voy a por voy replicar los datos del la base de datos 



/*
import React, { Component , useState } from "react";
import Body from "./Components/Body";
import axios from "axios";
import 'bootstrap';  // para tumbable
import DocComponent from './Components/docComponent';
import PdfComponent from './Components/pdfComponent';
import Preview from './Components/PDF/Preview'
import CarritoConsumer from './carritoContext'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.pdfRef = React.createRef();  // ref a instancia PdfComponent
    this.docRef = React.createRef();  // ref a instancia PdfComponent

  }

   // ejecutado despues de costruir el DOM
   componentDidMount() {
  }

  // TODO : Anidar previamente(donde?) las lineas al item
  handleSubmit = (item) => {
    if (item.id) { // already exists
      axios.put("/api/notas/${item.id}/", item);
      return;
    }
    axios.post("/api/notas/", item);
  };

  handleDelete = (item) => {
    axios.delete("/api/notas/${item.id}/");
  };

  createNote = (event, value) => {
    this.setState({
      template_drop: value,
      showPdf: true,
    });

    const nombre = document.getElementById('nombreInput').value;
    const fecha = document.getElementById('FechaInput').value;
    const notas = document.getElementById('notasInput').value;
    const folio = document.getElementById('folioInput').value;
    const carrito = this.docRef.current.state.carrito;

    this.pdfRef.current.setState({campos : { nombre: nombre,
                                            fecha: fecha,
                                            notas: notas,
                                            folio: folio}});
  };

  editNote = (note) => {
  };

  SelectTemplateChange(event, value) {
  }

  render() {

    return (
      <div>
        <main className="container">
            <h1 className="text-black text-uppercase text-center my-4">NOTE GENERATOR</h1>
            <div className="row">
              <div className="col-md-10 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="mb-5">

                    <div class="form-group">
                    </div>

                    <h2>Note Template</h2>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Template
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" onClick={(e) => this.SelectTemplateChange(e, 'idd:1')}> Template 1 </a></li>
                      </ul>
                    </div>
                  </div>

                  <div id="doc-template">
                      <CarritoConsumer>
                        <DocComponent  />  //ref={this.docRef}
                      </CarritoConsumer>
                  </div>

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="mb-4">
                    <button className="btn btn-primary" onClick={(e) => this.createNote(e, 'idd:1')}>
                      Generate PDF
                    </button>

                    <div id="doc-pdf">
                    {
                      //this.state.showPdf?
                      <CarritoConsumer>
                         <PdfComponent ref={this.pdfRef} />
                      </CarritoConsumer>

                      //  :
                      //  <div></div>
                    }
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
}

export default App;
*/
