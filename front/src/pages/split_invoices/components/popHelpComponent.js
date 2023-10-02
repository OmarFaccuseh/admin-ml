import React, { Component, Fragment, useContext, useRef, useEffect, useState} from "react";
import {StyleSheet} from "@react-pdf/renderer";
import axios from 'axios';

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
    padding: 'auto',
    maring: 'auto',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  popup: {
    borderRadius: 25,
    background: "#5C9090",
    position: "absolute", 
    left: 0, 
    right: 0, 
    marginLeft: "auto", 
    marginRight: "auto",
    width: "70%",
    color: "white",
  },
  popHelp:{
    justifyContent: "end",
    fontSize: 17,
    color: "white",
  }
});

export default function PopHelpComponent(props){
  return (
  <Fragment>
     <div>
      {
        <div className="popup my-5 p-5 d-flex justify-content-center" style={styles.popup}>
          <div className="popup-header d-flex flex-column">
              <h1 onClick={props.onClosePop} className="d-flex" style={styles.popHelp}>X</h1>
              <h5>Seleccion de una sola vez los XML, cada grupo sera uuna tabla independiente que agrupara y mostrara los totales de las facturas que cumplan con los criterios</h5>
          </div>
        </div>
      }
      </div>
  </Fragment>
  )
}

export function PopSelectGroupComponent(props){
  const updateConfigs = null;
  // hacer un fetch a django , traer las configs de grupos y actualizar props.setConfigs

  useEffect(()=>{ }, [])

  return (
    <Fragment>
    <div>
    {
      <div className="popup my-5 p-5 d-flex justify-content-center" style={styles.popup}>
        <div className="popup-header d-flex flex-column">
            <h1 onClick={props.closePopHelp} className="d-flex" style={styles.closepop}>X</h1>
            <select>
              {props.options.map((option) => ( <option value={option.value}>{option.label}</option>

          ))}

            </select>
        </div>
      </div>
    }
    </div>
    </Fragment>
  )
}

