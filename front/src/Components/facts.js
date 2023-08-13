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
import App from '../App'
import React, { Component , useState, useEffect, useRef} from "react";
import PdfInovices from './pdfInvoicesComp';
import PopHelp from './popHelpComponent';



const styles = StyleSheet.create({  
  tableRadius: {
   borderRadius: "9px",
   overflow: "hidden" ,/* add this */
   borderCollapse: "separate",
   borderWidth : "3px"
  }
})

const resJoke = [{"name": "GP_1", "invoices": [{"RFC": "FERRE0390332", "razon": "FERRECSA", "subtotal": 772, "iva": 21, "total": 823},
                                               {"RFC": "TLA909801021", "razon": "TLAPALERO", "subtotal": 646, "iva": 14, "total": 730},],
                  "total": 7745
                },
                {"name": "GP_1", "invoices": [{"RFC": "MAR979832723", "razon": "CASAMARCUS", "subtotal": 72, "iva": 2, "total": 83},
                                              {"RFC": "AMZ83972918", "razon": "AMAZON", "subtotal": 956, "iva": 30, "total": 999},],
                  "total": 7745
                },]


function MakeFacts(){

  const [groups, setGroups] = useState([]);
  const [factsByGroup, setFactsByGroup] = useState([]);
  const [xml_files, setXmlFiles] = useState([]);
  const [popHelp,setPopHelp]=useState(false)


  var res = []
  const pdfComp = useRef();
  const popHelpRef = useRef();


  var xml_objs = [];
  var reduce_facts = [
    {"RFC": "ADWADAF122321", "razon": "Nombre de la empresa", "subtotal": 1234, "iva" : 45, "total" : 21346 },
    {"RFC": "ADWADAF122321", "razon": "Nombre de la empresa", "subtotal": 1234, "iva" : 45, "total" : 21346 },
    {"RFC": "ADWADAF122321", "razon": "Nombre de la empresa", "subtotal": 1234, "iva" : 45, "total" : 21346 },
    ];


  useEffect(()=>{
    setGroups(currGroups => {
      // slice copia el arreglo, splice borra desde indice 0 hasta 0 (nada en este caso), y agrega lo del 3er arg. 
      let newArray = currGroups.slice()
      newArray.splice(0, 0, { name : 'default_group',                                                     // only = operator
                              criteria : [{'field' : 'emisor',  'operator' : '=',  'value' : 'Ferrecsa'}] // field: RFC(receptor), razon, subtotal, iva, total
      });
      return newArray;
    })
  },[]);

  function onChangeFiles (event){
    setXmlFiles(event.target.files);
  }
  

  function onNewCriterion (name, event){
    setGroups(currGroups => {
      return currGroups.map((item, index) => {
        if (name == item.name){
          let newArray = item.criteria.slice()
          newArray.splice(newArray.length, newArray.length, { 'field' : 'new',  'operator' : 'new',  'value' : 'new' });
          return {...item, criteria: newArray}
        }
        else {
            return item;
        }
      })
    })
  }

  function onNewGroup (event){
    setGroups(currGroups => {
      let newArray = currGroups.slice()
      newArray.splice(newArray.length, newArray.length, { name : 'GGGGGG',
                              criteria : [{'field' : '',  'operator' : '',  'value' : ''}]
      });
      return newArray;
    })
  }

  function onChangeCriterion(nameCriterion, nameGroup, index, event){
    setGroups( groups => {
        return groups.map((group) => {
          if (nameGroup == group.name){
            let newArray = group.criteria.slice()
            newArray[index][nameCriterion] = event.target.value            
            return {...group, criteria : newArray }
        }
        else {
            return group;
        }
      })
    });
  }

  function onChangeNameGroup(ind, event){
    setGroups( currGroups => {
      return currGroups.map((grupo, index) => {
        if (ind == index){
          return {...grupo, name : event.target.value}
        }
        else {
            return grupo;
        }
      })
    });
  }

  function onDelCriterion(indexGroup, indexCriterion, event){
    setGroups( groups => {
      return groups.map((group, index) => {
        if (index == indexGroup){
          let newArray = group.criteria.slice()
          newArray.splice(indexCriterion, 1);
          return {...group, criteria : newArray }
        }
        else {
          return group;
        }
      })
    });
  }

  function generate(event){
    var readXml=null;
    var reader = new FileReader();

    // read recursive all xml files
    function readFile(index) {
      if( index >= xml_files.length ){
        filterFacts()
        return; // ... break recursive call
      }
      var file = xml_files[index];

      reader.onload = function(e) {          
        readXml= e.target.result;    // string xml
        var parser = new DOMParser();
        var doc = parser.parseFromString(readXml, "application/xml");
        xml_objs.push(doc)

        const ele_customer = doc.getElementsByTagName("cfdi:Receptor")[0]  // htmlcollection list
        const ele_items    = doc.getElementsByTagName("cfdi:Concepto")        // handled like array
        var ele_taxes      = doc.getElementsByTagName('cfdi:Impuestos');
        var taxes_translate = 0;
        for(var i = 0; i < ele_taxes.length; i++){
            taxes_translate = Number(ele_taxes[i].getAttribute('TotalImpuestosTrasladados')); 
            if (taxes_translate > 0) {break;}
        }

        const attr_rfc  = ele_customer.getAttribute("Rfc")
        const attr_name = ele_customer.getAttribute("Nombre")
        const sum_subtotal = Array.from(ele_items).reduce((prev, curr) => prev + Number(curr.getAttribute("Importe")), 0);
        
        reduce_facts.push({"RFC" : attr_rfc, "razon": attr_name, "subtotal": sum_subtotal, "iva": taxes_translate, "total": sum_subtotal + taxes_translate,})
      
        readFile(index+1) // ...recursive call
      }
      reader.readAsText(file);
    }
    readFile(0);

    // ... Filter by criteria's groups
    function filterFacts(){
      groups.map((group, index,) => {
        
        console.log("ALL GROUPs :  " + groups)
        console.log("IN GROUP :  " + group.name)
        console.log("REDUCE FACTS :  " + JSON.stringify(reduce_facts))

        

        function satisfyCriteria(fact) {   // Need satisfy all criterion
          var satisfy = true;            
          for(var i=0; i < group.criteria.length; i++){

            console.log("CRITERIA : " + i + "  " + JSON.stringify(group.criteria[i]))
            
            const field_criterion =  isNaN(group.criteria[i].field ) ? group.criteria[i].field : Number(group.criteria[i].field )    
            const operator_criterion =  group.criteria[i].operator 
            const value_criterion =  isNaN(group.criteria[i].value ) ? group.criteria[i].value : Number(group.criteria[i].value)  

            if ( (isNaN(field_criterion) || isNaN(value_criterion)) && operator_criterion != "=" ){
              console.log("Los operadores '<' y '>' solo se pueden validar si el campo y criterio son numeros, si no, incuplira el criterio")
              satisfy = false;
              break;
            }

            switch (operator_criterion) {
              case "=":
                if (fact[field_criterion] !== value_criterion){
                  satisfy = false;
                }
                break;
              case ">":
                if (fact[field_criterion] <= value_criterion){
                  satisfy = false;
                }
                break;
              case "<":
                if (fact[field_criterion] >= value_criterion){
                  satisfy = false;
                }
                break;
              default:
                break;
            }
          }
          return satisfy;
        }

        const group_facts = reduce_facts.filter(fact => true)
        const subtotal_facts = group_facts.reduce((prev, curr) => prev + curr.subtotal, 0);
        const iva_facts      = group_facts.reduce((prev, curr) => prev + curr.iva, 0);
        const total_facts    = group_facts.reduce((prev, curr) => prev + curr.total, 0);
        const obj_group = {"group_name": group.name, "invoices":group_facts, "subtotal": subtotal_facts,
                           "iva": iva_facts, "total": total_facts}
        setFactsByGroup(facts => {
                  let newArray = facts.slice();
                  newArray.splice(0, index==0 ? factsByGroup.length : 0 , obj_group);  // on first lap remove prev 
                  return newArray;
        }) 
      })
    }


  }

  function onPopHelp(event){
    setPopHelp(!popHelp);
  }

  const closePopHelp=()=>{
        setPopHelp(false)
  }
  

  return (
    <div>
      <main className="container px-5">

      <div>
      {
        popHelp?
        <PopHelp closePopHelp={closePopHelp}/> : ""
      }
      </div>

      <div class="d-flex  justify-content-center">
        <div class="d-flex justify-content-start">
          <h5 className="d-flex align-items-center my-4 px-2 text-muted bg-light" onClick={(evnt)=>(popHelp(evnt))}>
            How work?
          </h5>
        </div>
        <h1 className="m-4">
          SPLIT INVOICES
          <small class="blockquote"> XML Files </small>
        </h1>
      </div>

      <div class="mb-3 d-flex " >
        <div class="mb-3 d-flex flex-column" style={{ "width": "100%" }}>
          <label for="formFiles" class="form-label" > Select XML Files </label>
          <input class="form-control" type="file" id="formFiles" multiple onChange={(evnt)=>(onChangeFiles(evnt))} style={{ "width": "80%" }}/>
        </div>
        <div class="mb-3 d-flex flex-column " style={{ "width": "50%", "height": "50%", "justifyContent": "flex-end"  }}>
          <span class="mb-3"> Current Config: Config Name / No config saved yet</span>
          <div class="mb-3 d-flex flex-row ">
            <button class="btn btn-secondary m-1" id="select_save" onClick={(evnt)=>(onPopHelp(evnt))}> Open groups </button>
            <button class="btn btn-secondary m-1" id="select_save" onClick={(evnt)=>(onPopHelp(evnt))}> Save changes </button>
            <button class="btn btn-secondary m-1" id="select_save" onClick={(evnt)=>(onPopHelp(evnt))}> Save new config </button>
          </div>
        </div> 
      </div> 

      <div class="mb-3">
        <h3 class="m-4"> GRUPOS </h3>

        <table class="table table-bordered" id="groups"  style={styles.tableRadius}>
          <tbody>
          {
            groups.map((group, indexGp)=>{
            const {name, criteria} = group;
            return(
              <tr key={indexGp}>
                <td  style={styles.tableRadius} class="">
                  <div class=" col-12 d-flex p-2">
                    <input type="text" onChange={(evnt)=>(onChangeNameGroup(indexGp, evnt))} class="border-0 col-11" /> 
                    <button type="button" class="btn btn-warning col-1" >Delete</button>
                  </div>
                  <p name="criteria_label" type="text"> Criteria </p>

                  <table class="table table-bordered" id="criteria_by_group" >
                    <thead class="table-success">
                      <tr class='col-12 '>
                        <th scope="col" style={{"width": "32%"}}>Field</th>
                        <th scope="col" style={{"width": "32%"}}>Is</th>
                        <th scope="col" style={{"width": "32%"}}>To Value</th>
                        <th scope="col" style={{"width": "4%"}}> </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      criteria.map((criterion, index)=>{
                      const {field, operator, value} = criterion;
                      return(
                        <tr key={index}> 
                          <td> <input type="text" defaultValue={field} onChange={(evnt)=>(onChangeCriterion("field", name, index, evnt))} class="border-0" style={{"width": "100%"}}/> </td>
                          <td> 
                          <select class="form-select" defaultValue={operator} onChange={(evnt)=>(onChangeCriterion("operator", name, index, evnt))} style={{"width": "100%"}}>
                            <option value="=" >=</option>
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                          </select>
                          </td>
                          <td> <input type="text" defaultValue={value} onChange={(evnt)=>(onChangeCriterion("value", name, index, evnt))} class="border-0" style={{"width": "100%"}}/></td>
                          <td> <button type="button" class="btn btn-danger" onClick={(evnt)=>(onDelCriterion(indexGp, index, evnt))} style={{"width": "100%"}}>X</button> </td>
                        </tr>  
                      )
                      })
                    }
                    </tbody>
                  </table>  
                  <div class="d-flex justify-content-end">
                  <button id="select_xmls" onClick={(evnt)=>(onNewCriterion(name, evnt))} class="btn btn-dark" type="button" aria-expanded="false" style={{"align" : "right"}}>
                    New Criterion 
                  </button>
                  </div>
                </td>
              </tr>
            )
            })
          }
          </tbody>
        </table>
      </div> 

      <div class="d-flex col-12 mb-3 justify-content-end">
           <button onClick={(evnt)=>(onNewGroup(evnt))} class="btn btn-secondary" type="button" >
              New group 
           </button>
      </div>

      <div class="col-12 d-flex justify-content-center">
           <button onClick={(evnt)=>(generate(evnt))} class="btn btn-primary m-1" type="button">
              Generate info 
           </button>
           <button onClick={(evnt)=>(generate(evnt))} class="btn btn-primary m-1 btn-secondary" type="button">
              Save data 
           </button>
      </div>

      <div id="doc-facts-gp" >
         {factsByGroup ? <PdfInovices res={factsByGroup} /> : <p>Loading...</p>}   //regresame tu DOM en esta var
      </div>

      </main>
    </div>
  )


}


export default MakeFacts;

