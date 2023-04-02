import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class BodyStatic extends Component {
  // recibir las props desde App y devolver el body ya con datos.
  constructor(props) {
    super(props);
    this.state = {
      code_note: this.props.code_note,
      customer: this.props.customer,
      products: this.props.products,
      anotations: this.props.anotations,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <div>
        <span>Este es el formulario, aqui estan sus preguntas: </span>
      </div>
    );
  }
}
