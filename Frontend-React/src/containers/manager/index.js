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
import Alert from "react-bootstrap/Alert";


class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Cookie.get('id'),
      isManager: isManager(),
      facilityID: Cookie.get('id'),
      employees: List([]),
      newEmp: {
        firstName: '',
        lastName: '',
        workEmail: '',
        password: '',
        position: '',
        salary: 0,
        workPhone: '',
      },
      showNewEmp: false,
      showReport: false,
      notification: { is: false, message: '', type: '', header: '' }
};
    this.makeTR = this.makeTR.bind(this);
    this.handleChangeNewEmpView = this.handleChangeNewEmpView.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.handleNewEmpChange = this.handleNewEmpChange.bind(this);
    this.handleChangeReportView = this.handleChangeReportView.bind(this);
    this.handleNewEmpSubmit = this.handleNewEmpSubmit.bind(this);
    }

  getEmployees = (payload) => {
    apiPost('/facility/employees', payload)
        .then((resp) => {
          console.log(resp);
          this.setState({ employees: List(resp.employees) })
        })
        .catch((error) => {
          this.setState({ notification: { is: true, message: 'Could not get employees', type: 'danger', header: 'Error!' } })

        })
  };

  componentDidMount() {
      this.getEmployees({
        managerID: this.props.id,
        facilityID: this.props.facilityID,
      });
    }

  makeTR = (e, id) => {
      return (
        <React.Fragment key={id}>
          <tr>
            <td> { e.id } </td>
            <td> { e.firstName } </td>
            <td> { e.lastName } </td>
            <td> { e.position } </td>
            <td> { e.workPhoneNum } </td>
            <td> { e.workEmail } </td>
            <td> { e.salary } </td>
          </tr>
        </React.Fragment>)
  };

  handleChangeNewEmpView = () => {
    this.setState({ showNewEmp: !this.state.showNewEmp })
  };

  handleChangeReportView = () => {
    this.setState({ showReport: !this.state.showReport })
  };

  handleNewEmpChange = (event) => {
    let newEmpObj = this.state.newEmp;
    newEmpObj[event.target.name] = event.target.value;
    this.setState({ newEmp: newEmpObj })
  };

  handleNewEmpSubmit = () => {
    const emp = this.state.newEmp;
    if (emp.workPhone && emp.workEmail && emp.password && emp.firstName && emp.lastName && emp.position && emp.salary) {
      apiPost('/manager/addEmployee', {
        managerID: this.state.id,
        facilityID: this.state.facilityID,
        ...this.state.newEmp
      })
        .then((resp) => {
          console.log(resp);
          if (resp.success === true) {
            window.location.reload()
          } else {
            this.setState({ notification: { is: true, message: 'Could not add employee. Invalid input or employee already exist.', type: 'danger', header: 'Error!' } })
          }
        })
        .catch(error => {
          this.setState({ showNewEmp: false })
          this.setState({ notification: { is: true, message: 'Could not add employee. Invalid input or employee already exist.', type: 'danger', header: 'Error!' } })
        })
    }
  };

  render() {
    return (
      <div>
        { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
        <div>
          <Card className="text-center">
            <Card.Header>Control Center</Card.Header>
            <Card.Body>
              <Card.Title>Managerial Actions</Card.Title>
              <Button size='lg' variant="success" style={ControlButtonStyle} onClick={this.handleChangeNewEmpView}>Add Employee</Button>
              <Button size='lg' variant="info" style={ControlButtonStyle} onClick={this.handleChangeReportView}>Review Facility Report</Button>
            </Card.Body>
          </Card>
        </div>

        <Modal show={this.state.showNewEmp} onHide={this.handleChangeNewEmpView} name='CreateEmp'>
          <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                <Form.Control placeholder='example@website.com' name='workEmail' value={this.state.newEmp.workEmail} onChange={this.handleNewEmpChange} />
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
              <Form.Group as={Col} controlId='formGridworkPhone'>
                <Form.Label> Work Phone </Form.Label>
                <Form.Control placeholder='832-123-123' name='workPhone' value={this.state.newEmp.workPhone} onChange={this.handleNewEmpChange}  />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={this.handleNewEmpSubmit}> Submit </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showReport} onHide={this.handleChangeReportView} name='ShowReport'>
          <Modal.Header closeButton>
          <Modal.Title>Review Facility Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
        </Modal>

        <h3 style={h3Style}>Employees</h3>
        <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Work Phone</th>
              <th>Work Email</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
          { this.state.employees.map((e) => { return this.makeTR(e, e.id) }) }
          </tbody>
    </Table>
      </div>
    )
    }
}

const tableStyle = {
  margin: '0 auto',
  textAlign: "center",
};

const ControlButtonStyle = {
  marginRight: '16px',
};

const h3Style = {
  marginTop: '2.5%',
};

export default Manager;