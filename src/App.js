import React, { useState } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let initialValue = {
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: ""
};

if (localStorage.getItem("data")) {
  initialValue = JSON.parse(localStorage.getItem("data"));
}

function DayCol(props) {
  return (
    <Col className="px-1 mx-1 rounded border border-secondary" >
      <div className="bg-dark text-white my-2 rounded" >
        <Form.Label className="text-capitalize" >{props.name}</Form.Label>
      </div>
      <Form.Control as="textarea" row="15" value={props.value} name={props.name} onChange={props.onChange} style={{ "min-height": "40vh", "font-size": "small" }} className="mb-1" />
    </Col>
  )
}

function AboutModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} style={{"width": "100%"}} >
        About
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>This folio task was completed by Brian Lee</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValues: initialValue,
      lastUpdated: JSON.parse(localStorage.getItem("lastUpdated"))
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    let inputValues = this.state.inputValues;

    inputValues[event.target.name] = event.target.value;

    this.setState({
      inputValues: inputValues
    })
  }

  handleClick() {
    localStorage.setItem("data", JSON.stringify(this.state.inputValues));
    localStorage.setItem("lastUpdated", JSON.stringify(new Date()))
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2>My Timetable</h2>
            </Col>
          </Row>
          <Row>
            <DayCol name="monday" value={this.state.inputValues.monday} onChange={this.handleChange} />
            <DayCol name="tuesday" value={this.state.inputValues.tuesday} onChange={this.handleChange} />
            <DayCol name="wednesday" value={this.state.inputValues.wednesday} onChange={this.handleChange} />
            <DayCol name="thursday" value={this.state.inputValues.thursday} onChange={this.handleChange} />
            <DayCol name="friday" value={this.state.inputValues.friday} onChange={this.handleChange} />
          </Row>
          <Row className="my-3">
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              {/* <Button variant="outline-primary" style={{"width": "100%"}} >About</Button> */}
              <AboutModal />
            </Col>
            <Col>
              { this.state.inputValues   === initialValue ?
              <Button variant="outline-primary" style={{"width": "100%"}} onClick={this.handleClick} disabled >Save</Button>
              : 
              <Button variant="primary" style={{"width": "100%"}} onClick={this.handleClick}>Save</Button>
              }
              <p className="text-left" style={{"font-size": "0.6rem"}}>Last saved: {JSON.parse(localStorage.getItem("lastUpdated"))}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
