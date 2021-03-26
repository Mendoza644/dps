import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      nombrejuego: '',
      tipo: '',
      año: '',
   
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("juegos").on("value", (nombrejuego) => {
      if (nombrejuego.val() !== null) {
        this.setState({ ...this.state.data, data: nombrejuego.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };
  peticionPost=()=>{
    firebase.child("juegos").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }
  

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarCanal=async(nombre, id, caso)=>{

    await this.setState({form: nombre, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
        <br />
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>nombre de juego</th>
              <th>tipo</th>
              <th>año</th>
           </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].nombrejuego}</td>
                <td>{this.state.data[i].tipo}</td>
                <td>{this.state.data[i].año}</td>
        
              

              </tr>
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre del Juego: </label>
          <br />
          <input type="text" className="form-control" name="nombrejuego" onChange={this.handleChange}/>
          <br />
          <label>Tipo: </label>
          <br />
          <input type="text" className="form-control" name="tipo" onChange={this.handleChange}/>
          <br />
          <label>Año: </label>
          <br />
          <input type="text" className="form-control" name="año" onChange={this.handleChange}/>
          <br />
          
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>{"   "}
      </ModalFooter>
    </Modal>




      </div>
    );
  }
}

export default App;
