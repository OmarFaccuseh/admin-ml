import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import React, { forwardRef , Component } from "react";
import { useShoppingCart } from "../Components/carritoContext"
import Table from "../Components/PDF/TableInvoices"
import RobotoLight from '../Styles/Fonts/Roboto-Light.ttf'
import RobotoMedium from '../Styles/Fonts/Roboto-Medium.ttf'
import RobotoMediumItalic from '../Styles/Fonts/Roboto-MediumItalic.ttf'
import RobotoLightItalic from '../Styles/Fonts/Roboto-LightItalic.ttf'


// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    fontSize : 12,
    padding : 20,
  },
  section: {
    margin: 20,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
    width: '100%',
  },
  folio: {
   marginLeft: 'auto',
   marginRight: 16,
 },
  flex: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16

  },
  nombre: {
    width: '70%',
   
  },
  fecha: {
    width: '30%',
  },
  shadow: {
    fontSize: 9,
    marginLeft: 20,
    marginRight: 20,
  },
  rfc: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  lineRfc: {
    paddingBottom: '12'
  },
  head:{
    display: 'block',
    
    alignItems: 'center',
  },
  log_rfc:{
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 'auto',
    height: 'auto',
    marginHorizontal: '10%',
  },
  img_conteniner: {
    width: '50%',
    height: 'auto',
    paddingLeft: '20',
    paddingRight: '20',
    paddingTop: '20',
    paddingBottom: '0',

  },
  ml_shops: {
    width: '50%',
    textAlign: 'center',
    margin: 16,
    justifyContent: 'right',
    lineHeight: 1.5
  },
  qr_container: {
    width: '40%',
    height: 'auto',
    paddingRight: '50',
  },
  qr: {
    width: 'auto',
    height: 'auto',
    margin:'16'

  },
  ml_shops_qr:{
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notas:{
    marginTop:'10',
  }


});


export const BasicDocument= forwardRef((props, pdfComp) => {
  
  console.log("props recivied in pdfinvoicesComp :", props)

  const  groupsResult  = props.res;

  Font.register({ family: 'Roboto', fonts: [
     { src: RobotoLight, fontWeight: 400}, // font-style: normal, font-weight: normal
     { src: RobotoMedium, fontWeight: 700 },
     { src: RobotoLightItalic, fontStyle: 'italic', fontWeight: 400},
     { src: RobotoMediumItalic, fontStyle: 'italic', fontWeight: 700},
    ]});

  return (
    <div ref={pdfComp}>
      <PDFViewer style={styles.viewer} >
        {/* Start of the document*/}
        <Document onLoadSuccess={async (successEvent) => {
            // tslint:disable-next-line:await-promise
            const data = await successEvent.getData();
        }}>
          {/*render a single page*/}

            <Page size="A4" style={styles.page}>
              <View style={styles.log_rfc}>
                <div style={{flexWrap:'wrap', alignItems: "center", marginLeft: 'auto',  marginRight: 'auto',}}>
                  <Text style={{marginTop:'20', marginBottom:'12', fontWeight: 'bold', fontFamily: 'Roboto' }} bold='true'><i>Facturas de gastos - Agrupacion por criterios.</i></Text>
                </div>
              </View>
             
              <Table items={groupsResult}/>

            </Page>

        </Document>
      </PDFViewer>
    </div>
  );

} );
export default BasicDocument;