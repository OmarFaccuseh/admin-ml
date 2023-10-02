import React from "react";
import {StyleSheet} from "@react-pdf/renderer";


const styles = StyleSheet.create({  
    tableRadius: {
     borderRadius: "9px",
     overflow: "hidden" ,/* add this */
     borderCollapse: "separate",
     borderWidth : "3px"
    }
})

export default function TableGroups(props){
    const groups = props.groups
    const [onChangeNameGroup, onDelGroup, onNewCriterion, onChangeCriterion, onDelCriterion] = props.events
    return(
        <div class="mb-3">
        <h3 class="m-4"> GRUPOS </h3>
        <table class="table table-bordered" id="groups"  style={styles.tableRadius}>
          <tbody>
          {
            groups.map((group, indexGp)=>{
              const {name, criteria} = group;
              return(
                <tr key={Math.floor(Math.random() * 1000).toString()}>
                  <td  style={styles.tableRadius} class="">
                    <div class=" col-12 d-flex p-2">
                      <input type="text" defaultValue={name} onChange={(evnt)=>(onChangeNameGroup(indexGp, evnt))} class="border-0 col-11" /> 
                      <button type="button" class="btn btn-warning col-1" onClick={(e) => (onDelGroup(indexGp, e))}> Delete </button>
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
                          <tr key={Math.floor(Math.random() * 1000).toString()}> 
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
    )
}