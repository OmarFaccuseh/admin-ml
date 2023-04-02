import React, { Component } from "react";
import Body from "./components/Body";
import axios from "axios";
import 'bootstrap';  // para tumbable
import DocComponent from './components/docComponent';
import PdfComponent from './components/pdfComponent';


const forms = [
  {
    id: 1,
    title: "Nota mercadolibre",
    },
  {
    id: 2,
    title: "Nota Local",
    campos: {
      nombre: "",
      articulo: "",
      precio: "",
      cantidad: "",
      total: "",
    }
  }
];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formList: forms,
      template_drop: false,
      formSelected : 1,
      showPdf: false,
    };
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

  createNote = () => {
    const note = { customer: "", date: "", anotations: "" };
    //this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editNote = (note) => {
    //this.setState({ activeItem: item, modal: !this.state.modal });
  };

  DropDownChangeOne(event, value) {
    console.log("change DROPDOWN");
    this.setState({
      template_drop: value,
      showPdf: true,
    });
    console.log(value);
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
                    <h2>Note Template</h2>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Template
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" onClick={(e) => this.DropDownChangeOne(e, 'idd:1')}> Template 1 </a></li>
                        <li><a class="dropdown-item" onClick={(e) => this.DropDownChangeOne(e, 'idd:2')}> Template 2 </a></li>
                        <li><a class="dropdown-item" onClick={(e) => this.DropDownChangeOne(e, 'idd:3')}> Template 3 </a></li>
                      </ul>
                    </div>

                  </div>

                  <div id="doc-template">
                  {
                    this.state.template_drop?
                      <DocComponent/>
                      :
                      <div></div>
                  }
                  </div>

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="mb-4">
                    <button className="btn btn-primary">
                      Generate PDF
                    </button>

                    <div id="doc-pdf">
                    {
                      this.state.showPdf?
                        <PdfComponent/>
                        :
                        <div></div>
                    }
                    </div>


                  </div>

                  <ul className="list-group list-group-flush border-top-0">

                  </ul>
                </div>
              </div>
            </div>
       </main>



          <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Accordion Item #1
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Accordion Item #2
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Accordion Item #3
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
