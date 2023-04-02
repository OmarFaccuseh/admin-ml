import React, { Component , useContext, useState, useEffect} from "react";
import products from "../data/products.json"                                    // solo se extrae el nombre del producto


const DefaultCarrito = { // parese que no es necesario, puede ser {}
  folio : 0,
  nombre : "",
  fecha : "",
  notas : "",
  total : 0,
  cartItems: [],
  ordenes:[], // direct from ML
}
export const carritoContexto = React.createContext(DefaultCarrito);

export function useShoppingCart() {
  return useContext(carritoContexto)
}

export function CarritoProvider ({children}){

  const [cartItems, setCartItems] = useState([]);
  const [folio, setFolio] = useState();
  const [nombre, setNombre] = useState();
  const [fecha, setFecha] = useState();
  const [notas, setNotas] = useState();
  const [total, setTotal] = useState(0);
  const [ordenes, setOrdenes] = useState();

  useEffect(() => { 
    // setOrdenes() TODO: axios to django, get ordenes
    updateTotal(); }, [cartItems]
  );

  function settFolio(folio){
    setFolio(folio)
  }

  function settNombre(nombre){
    setNombre(nombre)
  }

  function settFecha(fecha){
    setFecha(fecha)
  }

  function settNotas(notas){
    setNotas(notas)
  }

  function addNewItem(id, price, qty, subtotal, nombre){
    setCartItems(currItems => {
      //const precio = products.find(i => i.codigo === id).precio;
      //return [...currItems, {codigo: id, cantidad: 1,
      //  precio: price, subtotal: price, nombre: nombre}]

      // slice copia el arreglo, splice borra desde indice 0 hasta 0 (nada en este caso), y agrega lo del 3er arg. 
      let newArray = currItems.slice()
      newArray.splice(0, 0, {codigo:id, cantidad:qty, precio:price, subtotal:subtotal, nombre:nombre})
      return newArray
    })
  }

  function changeArticuloItem(ind, codigo, price, nombre){
    setCartItems( currItems => {
      return currItems.map((item, index) => {
        if (index === parseInt(ind)){
          //const precio = products.find(i => i.codigo == codigo).precio;
          return {...item, codigo: codigo, cantidad: 1,
            precio: price, subtotal: price, nombre: nombre}
        }
        else {
            return item;
        }
      })
    });

  }

  function changeCantidadItem(ind, cantidad){
    setCartItems( currItems => {
      return currItems.map((item, index) => {
        if (index === parseInt(ind)){
          const subtotal = item.precio * cantidad;
          return {...item, cantidad: parseInt(cantidad), subtotal: subtotal}
        }
        else {
            return item;
          }
      })
    });
  }

  function changePrecioItem( ind, precio){
    setCartItems( currItems => {
      return currItems.map((item, index) => {
        if (index === parseInt(ind)){
          const subtotal = precio * item.cantidad;
          return {...item, precio: parseInt(precio), subtotal: subtotal }
        }
        else {
            return item
          }
      })
    });
  }

  function removeFromCart(ind) {
    setCartItems(currItems => {
      return currItems.filter((item, index) => index != parseInt(ind));
    })
  }

  function resetCarrito(){
    setCartItems([]);
  }

  function updateTotal(){
    setTotal(cartItems.reduce((prev, curr) => prev + curr.subtotal,  0));
  }

  return (
    <carritoContexto.Provider
      value={{
        resetCarrito,
        addNewItem,
        changeArticuloItem,
        changeCantidadItem,
        changePrecioItem,
        removeFromCart,
        cartItems,
        folio,
        nombre,
        fecha,
        notas,
        total,
        settFolio,
        settNombre,
        settFecha,
        settNotas,
        ordenes
      }}
    >
      { children }

    </carritoContexto.Provider>
  )

}

export default CarritoProvider;


/*
class CarritoProvider extends Component {

  state = {
    carrito:{campo1 : 'el estado soy yo'},
  }

  // NO SE si sera necesario
  setCarrito = (carrito) => {
   this.setState((prevState) => ({ carrito }));
 }

 render() {
    const { carrito } = this.state;  // es necesario para que los consumers actualicen el state
    const { setCarrito } = this;

    return (
      <ContextoCarrito.Provider
        value={{
          carrito,
          setCarrito,
        }}
      >
        { this.props.children }
      </ContextoCarrito.Provider>
    )
  }
}

const CarritoConsumer = ({ name, children }) => (
   render(){
     return (
        (value) => {
          return ( children(value) );
        }
     )
   }
);

export default ContextoCarrito;
export { CarritoProvider, CarritoConsumer };
*/
