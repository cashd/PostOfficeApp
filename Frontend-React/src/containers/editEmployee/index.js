import React from 'react'
import { isManager } from '../../utils/auth'
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { List } from 'immutable'
import { apiPost } from '../../utils/api'
import Alert from 'react-bootstrap/Alert';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.location.hash ? props.location.hash.substr(1) : undefined,
      newEmp: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        position: '',
        salary: '',
        phoneNum: '',
        zip: '',
        state: '',
        address: '',
        city: '',
        role: 'Choose...',
      },
      notification: { is: false, message: '', type: '', header: '' }
};
    this.getEmployee = this.getEmployee.bind(this);
    this.handleNewEmpChange = this.handleNewEmpChange.bind(this);
    }

  getEmployee = (payload) => {
    apiPost('/employee/edit', payload)
        .then((resp) => {
          // do
        })
        .catch((error) => {
          this.setState({ notification: { is: true, message: 'Could not edit employee.', type: 'danger', header: 'Error!' } })
        })
  };

  handleNewEmpChange = (event) => {
    let newEmpObj = this.state.newEmp;
    newEmpObj[event.target.name] = event.target.value;
    this.setState({ newEmp: newEmpObj })
  };

  componentDidMount() {

    };

  render() {
    return (
      <div style={formStyle}>
        <Form.Row>
            <Form.Group as={Col} controlId='formGridFirstName'>
              <Form.Label> First Name </Form.Label>
              <Form.Control placeholder='John' name='firstName' value={this.state.newEmp.firstName} onChange={this.handleNewEmpChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridLastName'>
              <Form.Label> Last Name </Form.Label>
              <Form.Control placeholder='Smith' name='lastName' value={this.state.newEmp.lastName} onChange={this.handleNewEmpChange}  />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label> Work Email </Form.Label>
              <Form.Control placeholder='example@website.com' name='email' value={this.state.newEmp.email} onChange={this.handleNewEmpChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label> Password </Form.Label>
              <Form.Control type='password' placeholder='********' name='password' value={this.state.newEmp.password} onChange={this.handleNewEmpChange}  />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridPosition'>
              <Form.Label> Position </Form.Label>
              <Form.Control placeholder='Clerk' name='position' value={this.state.newEmp.position} onChange={this.handleNewEmpChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridSalary'>
              <Form.Label> Salary </Form.Label>
              <Form.Control placeholder='60000' name='salary' value={this.state.newEmp.salary} onChange={this.handleNewEmpChange}  />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label> Work Phone </Form.Label>
              <Form.Control placeholder='832-123-123' name='phoneNum' value={this.state.newEmp.phoneNum} onChange={this.handleNewEmpChange}  />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridAddress'>
              <Form.Label> Address </Form.Label>
              <Form.Control placeholder='123 Main St.' name='address' value={this.state.newEmp.address} onChange={this.handleNewEmpChange}  />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label> City </Form.Label>
              <Form.Control placeholder='Houston' name='city' value={this.state.newEmp.city} onChange={this.handleNewEmpChange}  />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label> Zip </Form.Label>
              <Form.Control placeholder='77023' name='zip' value={this.state.newEmp.zip} onChange={this.handleNewEmpChange}  />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label> State </Form.Label>
              <Form.Control name='state' value={this.state.newEmp.state} onChange={this.handleNewEmpChange}  />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label> Role </Form.Label>
              <Form.Control as="select" name='role' value={this.state.newEmp.role} onChange={this.handleNewEmpChange}>
                <option>Choose...</option>
                <option>Supervisor</option>
                <option>Driver</option>
                <option>Facility</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
      </div>
    )
    }
}

const formStyle = {
  margin: '0 auto',
  marginTop: '3%',
  textAlign: 'center',
  width: '60%'
};




export default EditEmployee;