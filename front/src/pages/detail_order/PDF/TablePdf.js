import React, { Component, Fragment, useContext } from "react";
import { Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  tableContainer: {
   flexDirection: "row",
   flexWrap: "wrap",
   padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    display: 'flex',
    borderTop: '1px solid #EEE',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  rowHead: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    display: 'flex',
    borderTop: '1px solid #EEE',
    paddingLeft: 5, 
    paddingRight: 5,
    backgroundColor: '#D0D0D0',
    border: '1px solid #808080',
  },
  description: {
    width: "60%",
  },
  xyz: {
    width: "40%",
  },
  row1Head: {
    width: '55%',
    fontWeight: 'bold',
    paddingTop:2,
    paddingBottom: 2,
    paddingLeft: 5, 
    paddingRight: 5,
    borderRight: '1px solid #808080',
  },
  row2Head: {
    width: '13%',
    textAlign: 'center', 
    borderRight: '1px solid #808080',   
    paddingTop:2,
    paddingBottom: 2,
  },
  row3Head: {
    width: '15%',
    borderRight: '1px solid #808080',
    paddingTop:2,
    paddingBottom: 2,
    paddingLeft: 5,
  },
  row4Head: {
    width: '17%',
    paddingLeft: 5,
  },
  row1: {
    width: '55%',
    height: '100%',
    fontWeight: 'bold',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,  
  },
  row2: {
    width: '13%',
    height: '100%',
    textAlign: 'center',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row3: {
    width: '15%',
    height: '100%',
   
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row4: {
    height: '100%',
    width: '17%',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
    },
});


export default function Table(items){
  const cartItems = items.items
  return (
  <Fragment>
    <View style={styles.tableContainer}>
      <View style={styles.rowHead}>
        <Text style={styles.row1Head}>Producto</Text>
        <Text style={styles.row2Head}>Cant.</Text>
        <Text style={styles.row3Head}>Precio U.</Text>
        <Text style={styles.row4Head}>Subtotal</Text>
      </View>
      {cartItems.map((item, i) => {
        return (
          <View style={styles.row} key={i}>
            <Text style={styles.row1}> {item.nombre} </Text>
            <Text style={styles.row2}> {item.cantidad} </Text>
            <Text style={styles.row3}> {'$ ' + item.precio} </Text>
            <Text style={styles.row4}> {'$ ' + item.subtotal} </Text>
          </View>
        )})
      }
    </View>
    </Fragment>
  )
}
