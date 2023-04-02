import React, { Component , useState, useEffect} from 'react';
import { useShoppingCart } from "../Components/carritoContext"
import products from "../data/products.json"                                    // solo se extrae el nombre del prodcuto
import axios from "axios";
import { Page, Text, View, Document, BlobProvider } from '@react-pdf/renderer'

export function DocComponent(){

  const { cartItems, folio, cliente, nombre, addNewItem, changeArticuloItem,
          changeCantidadItem,  changePrecioItem, removeFromCart,
          total, fecha, settFecha } = useShoppingCart();

  // Not in use           
  const [data, setData] = useState([]); 

  useEffect(()=>{
    setNowDate()
    getData()
    setDetailOrder() 
  },[])

  function setDetailOrder(){
    const isDetail = false;  // no se si deba recibir del contexto o como propiedad desde el "link to"
    if (isDetail){
      const order = null; // no se si deba recibir del contexto o como propiedad desde el "link to"
      // rellenar campos con la order
    }
  }

  function getData(){
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
    .get("http://127.0.0.1:8000/api/productos/", {mode: "no-cors"})
    .then((res) => {
      setData(res.data)
      console.log("RESPONSE PRODUCTOS ", res)
    })
    .catch((err) => console.log(err))
  }

  function addProductRows() {
    const defaultId = 3;
    const precio = data.find(p => p.id == defaultId).precio
    const nombre = data.find(p => p.id == defaultId).nombre

    addNewItem(defaultId, precio, nombre);

  }

  function deleteTableRows(index)  {
    removeFromCart(index)
  }

  function onChangeArticuloItem(index, evnt) {

    /* FOR PREDEFINED PRODUCTS
    const { value } = evnt.target;  //id
    const precio = data.find(p => p.id == value).precio
    const nombre = data.find(p => p.id == value).nombre
    changeArticuloItem(index, value, precio, nombre);
    */
  }

  function onChangeCantidadItem(index, evnt) {
    const { value } = evnt.target;
    changeCantidadItem(index, value);
  }

  function onChangePrecioItem(index, evnt) {
    const { value } = evnt.target;
    changePrecioItem(index, value);
  }

  function onChangeFecha(evnt){
    const { value } = evnt.target;
    settFecha(value);
  }

  function setNowDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("fechaInput").value =today+"";
    settFecha(today)
  }

  return (
    <React.Fragment >
    <div style={{ backgroundColor: 'white' }}>
      <div class="row justify-content-end">
        <div class="d-flex col-2 mb-3">
          <label for="folioInput" class="form-label justify-content-end"> Folio </label>
          <input type="text" defaultValue={folio} class="form-control ms-2 justify-content-end" id="folioInput" f/>
        </div>
      </div>
      <div class="d-flex mb-3">
        <div class="d-flex col-8">
          <label for="nombreInput" class="form-label"> Recibe: </label>
          <input type="text" class="form-control mx-2" id="nombreInput" defaultValue={nombre}/>
        </div>
        <div class="d-flex col-4">
          <label for="FechaInput" class="form-label ms-3"> Fecha: </label>
          <input type="date" class="form-control mx-2" id="fechaInput" defaultValue={(e)=>setNowDate(e)}/>
        </div>
      </div>

      <table class="table table-bordered" >
        <thead>
          <tr>
            <th scope="col" style={{"width": "50%"}}>Articulo</th>
            <th scope="col" style={{"width": "10%"}}>Cant.</th>
            <th scope="col" style={{"width": "15%"}}>Precio U.</th>
            <th scope="col" style={{"width": "20%"}}>Subtotal</th>
            <th scope="col" style={{"width": "5%"}}><button className="btn btn-outline-success" onClick={addProductRows}> + </button></th>
          </tr>
        </thead>

        <tbody>
        {
          cartItems.map((item, index)=>{
          const {id, nombre, cantidad, precio, subtotal} = item;
          return(
              <tr>
                <td style={{"width": "50%"}}>
                  <input name="articulo" type="text" defaultValue={nombre} onChange={(evnt)=>(onChangeArticuloItem(index, evnt))} style={{"width": "100%"}} />                  
                </td>
                <td style={{"width": "5%"}}>
                  <input name="cantidad" type="text" defaultValue={cantidad} onChange={(evnt)=>(onChangeCantidadItem(index, evnt))} style={{"width": "100%"}} />
                </td>
                <td style={{"width": "20%"}}> 
                  <input name="precioU" type="text" defaultValue={precio} onChange={(evnt)=>(onChangePrecioItem(index, evnt))} style={{"width": "100%"}}/>
                </td>
                <td style={{"width": "20%"}}>
                  <input name="subtotal" type="text" defaultValue={subtotal} style={{"width": "100%"}}/>
                </td>
                <td style={{"width": "5%"}}>
                  <button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))} style={{"width": "100%"}}> x </button>
                </td>
              </tr>
          )

          })
        }
        </tbody>
      </table>
      <div class="row justify-content-end">
        <label for="montoTotal" class="form-label col-1"> TOTAL:  </label>
        <span id="montoTotal" class= "col-2" > { total } </span>
      </div>

      <br></br>

      <label for="notasInput" class="form-label"> Notas </label>
      <input type="text" class="form-control" id="notasInput"/>
    </div>  
    </React.Fragment>
  );

}
 export default DocComponent;


 // SELECT FOR PREDEFINED PRODUCTS
 // <select id="selectProd" value={id} class="chosen-select input-sm form-control" data-chosen=""
 //                 onChange= { (evnt)=>(onChangeArticuloItem(index, evnt)) } name="articulo" style={{"width": "100%"}}>
 //                     {data.map((p) => <option value={p.id}>{p.nombre}</option>)}
 //                 </select>



/*
// fake data list   value = codigo
let products = [{codigo: 0, nombre:'Producto 1', precio: 55},
               {codigo: 1, nombre: 'Producto 2', precio:43},
               {codigo: 2, nombre: 'Producto 3', precio:443},
               {codigo: 3, nombre: 'Producto 4', precio:5321}, ];

export default class DocComponent extends Component {
  constructor(props) {
    super(props);
    console.log("props RECIBIDAS EN docComponent: ");
    console.log(props);
    this.state = { //this.props
      //carrito:{articulos: [{codigo: 0, articulo: "", cantidad : 0, precioU: 0, subtotal: 0}],                             // [ {codigo: 0, articulo: "", cantidad : 1, precioU: 10, subtotal: 10}, {...} ]
      //         fecha: "a",
      //         cliente: "a",
      //}
    };
  }

  componentDidMount() {   // ejecutado despues de costruir el DOM
 }

  addProductRows = () => {
    const rowsInput = {
        codigo: 0,
        articulo:'',
        cantidad: 0,
        precioU: 0,
        subtotal: 0
    }
    let { carrito } = this.state;
    carrito.articulos.push(rowsInput);
    this.setState({ carrito: {articulos: carrito.articulos} });
  }

  deleteTableRows = (index)=>{
    let { carrito } = this.state;
    carrito.articulos.splice(index, 1);
    this.setState({ carrito: {articulos: carrito.articulos} });
  }

  handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    let { carrito } = this.state;

    if (name == "articulo"){
        const articulo_name = products.filter(prod => prod.codigo == value )[0].nombre;
        carrito.articulos[index][name] = articulo_name;
        carrito.articulos[index].codigo = value;
    }
    else{
      carrito.articulos[index][name] = value;
    }
    this.setState({ carrito: {articulos: carrito.articulos} });
  }

  render() {
    return (
      <React.Fragment>
        <label for="nombreInput" class="form-label"> Nombre </label>
        <input type="text" class="form-control" id="nombreInput"/>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Articulo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio U.</th>
              <th scope="col">Subtotal</th>
              <th><button className="btn btn-outline-success" onClick={this.addProductRows} >+</button></th>
            </tr>
          </thead>

          <tbody>
          {this.state.carrito.articulos.map((data, index)=>{
            const {codigo, articulo, cantidad, precioU, subtotal} = data;
            return(
                <tr key={index}>
                  <td scope="row">
                    <select id="selectProd" value={codigo} class="chosen-select input-sm form-control full-width" data-chosen="" onChange={(evnt)=>(this.handleChange(index, evnt))} name="articulo" >
                      {products.map((p) => <option value={p.codigo}>{p.nombre}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={cantidad} onChange={(evnt)=>(this.handleChange(index, evnt))} name="cantidad"/></td>
                  <td><input type="text" value={precioU} onChange={(evnt)=>(this.handleChange(index, evnt))} name="precioU"/></td>
                  <td><input type="text" value={subtotal} onChange={(evnt)=>(this.handleChange(index, evnt))} name="subtotal"/></td>
                  <td><button className="btn btn-outline-danger" onClick={()=>(this.deleteTableRows(index))}>x</button></td>
                </tr>
            )
          })}
          </tbody>
        </table>

        <label for="FechaInput" class="form-label"> Fecha </label>
        <input type="text" class="form-control" id="FechaInput"/>

        <label for="notasInput" class="form-label"> Notas </label>
        <input type="text" class="form-control" id="notasInput"/>

        <label for="folioInput" class="form-label"> Folio </label>
        <input type="text" class="form-control" id="folioInput"/>

      </React.Fragment>
    );
  }
}


*/






/* CODIGO DESECHEDAO

onSelectProd = () => {
  const  cod_prod = document.getElementById('selectProd').value;
  const  codigos_carrito = this.state.carrito.articulos.map(a => a.codigo);

  if (codigos_carrito.some(item => item == cod_prod)){
    let { carrito } = this.state;
    carrito.articulos.filter(prod => prod.codigo == cod_prod)[0].cantidad += 1;
    this.setState({ carrito: {articulos: carrito.articulos} });

  }
  else{
    let { carrito } = this.state;
    carrito.articulos.push(products.filter(prod => prod.codigo == cod_prod)[0]);
    this.setState({ carrito: {articulos: carrito.articulos} });
  }
};


fillSelect = (event, value) => {
  let select = document.getElementById("selectProd");
  let options = products.map(opt => `<option value=${opt.codigo}> ${opt.nombre} </option>`).join('/n');
  select.innerHTML = options;
};


*/
