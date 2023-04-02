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
import Table from "../Components/PDF/Table"
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
  const { cartItems, total, folio, nombre, fecha, notas} = useShoppingCart();


  console.log("ITEMS FROM PDF_DOC", cartItems)

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
          <Document 
                    onLoadSuccess={async (successEvent) => {
                    // tslint:disable-next-line:await-promise
                    const data = await successEvent.getData();
          }}  >
            {/*render a single page*/}

              <Page size="A4" style={styles.page}>
                <View style={styles.log_rfc}>
                  <div style={{flexWrap:'wrap', alignItems: "center", marginLeft: 'auto',  marginRight: 'auto',}}>
                    <Text style={{marginTop:'20', marginBottom:'12', fontWeight: 'bold', fontFamily: 'Roboto' }} bold='true'><i>PARA CUALQUIER DUDA O INCONVENIENTE CON TU COMPRA ESTOY DISPONIBLE</i></Text>
                    <Text style={{marginBottom:'8'}}> 8712328597    /    omar_fs.07@hotmail.com </Text>
                  </div>
                  <View style={styles.img_conteniner}>
                      <Image src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt='imagenpng' style='styles.logo'/>
                  </View>
                    <div style={styles.rfc}>
                      <Text style={styles.lineRfc}>Herramientas y Accesorios Toto-Tools</Text>
                      <Text style={styles.lineRfc}>RFC: FASJ960709N19</Text>
                      <Text style={styles.lineRfc}>C. Leona vicario #110 sur.</Text>
                      <Text style={styles.lineRfc}>Colonia Ejidal. 27446.</Text>
                      <Text style={styles.lineRfc}>Matamoros, Coahuila. México.</Text>
                    </div>
                </View>
               

                <View style={styles.section}>
                  <Text style={styles.folio}> Folio: {folio}</Text>
                  <div style={styles.flex}>
                    <Text style={styles.nombre}> Recibe: {nombre}</Text>
                    <Text style={styles.fecha}> Fecha: {fecha}</Text>
                  </div>
                  <div > 
                    <div style={{width: '58%', borderBottom:'1px', borderBottomColor: '#000000', marginLeft:'45'}}></div>
                    <div style={{width: '21%', borderBottom:'1px', borderBottomColor: '#000000', marginLeft:'auto', marginRight:'5'}}></div>
                  </div>
                </View>
                <Table items={cartItems} style={styles.table}/>
                <Text style={{marginLeft: 'auto', marginRight: 60, fontWeight: 'bold', fontFamily: 'Roboto', fontSize: 14,}}> Total : $ {total} </Text>
                <div style={{margin: 20, fontSize: 10}}>
                  <Text style={styles.notas}> Notas: {notas} </Text>
                </div>
                <div style={styles.shadow}>
                  <Text style={{color: '#5f5f5f'}}>En caso de requerir Factura por favor envíenos sus datos (nombre o razón social, RFC, uso CFDI, forma de pago) a través de su compra en Mercadolibre, o al correo: omar_fs.07@hotmail.com, o whatsapp: 8714147279.
                  </Text>
                </div>
                <Text style={{marginLeft:'auto', marginRight:'auto', marginTop:'25', marginBottom:'25',
                fontFamily: 'Roboto',  fontStyle: 'italic', fontWeight: 'bold'}}>¡ Gracias por su Preferencia !</Text>
                <View style={styles.ml_shops_qr}>
                  <div style={styles.ml_shops}>
                     <Text style={{fontFamily: 'Roboto'}}>¡ Visita nuestro MercadoShops! </Text>
                     <Text style={{fontFamily: 'Roboto'}}>Ahora puedes acceder a precios más bajos </Text>
                     <Text style={{fontFamily: 'Roboto', fontWeight: 'bold'}}>fasutec-ml.mercadoshops.com.mx </Text>
                     <Text style={{fontFamily: 'Roboto', fontSize: 10, color: '#5f5f5f'}}>El proceso de compra es el mismo que en Mercadolibre </Text>
                  </div>
                  <View style={styles.qr_container}>
                    <Image style={styles.qr} src={process.env.PUBLIC_URL + '/images/qr_fasutec.jpg'} alt='imagenqr'/>
                  </View>
                </View>
              </Page>

          </Document>
        </PDFViewer>
      </div>
    );

} );
export default BasicDocument;

/*
<PDFViewer style={styles.viewer}>
  <Document>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{folio}</Text>
          <div class="d-flex">
            <Text class="d-flex">{nombre}</Text>
            <Text class="d-flex" disabled>{fecha}</Text>
          </div>
        </View>
        <View style={styles.section}>
          <Text>{cartItems.length}</Text>
        </View>
      </Page>

  </Document>
</PDFViewer>
*/