import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { List } from 'immutable'
import { apiPost } from '../../utils/api'
import Alert from 'react-bootstrap/Alert';


class EmpFacility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.info.id,
      isManager: props.info.isManager ? props.info.isManager : false,
      facilityID: props.info.facilityID,
      packages: List([]),
      selectedPackages: List([]),
      trucks: List([]),
      notification: { is: false, message: '', type: '', header: '' }
    };

    this.makeTR = this.makeTR.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleMoveButton = this.handleMoveButton.bind(this);
  }

  componentDidMount() {
    this.getPackages()
  }


  makeTR = (p, id) => {
    return (
      <React.Fragment key={id}>
        <tr>
          <td> <Form.Check type="checkbox" id={ p.id } onChange={ this.handleCheckbox } /> </td>
          <td> { p.id } </td>
          <td> { p.senderEmail } </td>
          <td> { p.recipientEmail } </td>
          <td> { p.senderAddress } </td>
          <td> { p.recipientAddress } </td>
          <td> { p.deliveryStatus } </td>
          <td> { p.packageWeight } </td>
        </tr>
      </React.Fragment>)
  };

  getPackages = () => {
    apiPost('/facility/packages', { facilityID: this.state.facilityID })
      .then((resp) => {
        if (resp.packages) {
          this.setState({ packages: List(resp.packages) })
        } else {
          this.setState({ notification: { is: true, message: 'Could not get packages.', type: 'danger', header: 'Error!' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get packages.', type: 'danger', header: 'Error!' } })
      })
  };

  handleCheckbox = (event) => {
    const checkbox = document.getElementById(event.target.id);
    console.log(checkbox.checked);
    if (checkbox.checked) {
      console.log('here');
      this.setState({ selectedPackages: this.state.selectedPackages.push(event.target.id) }, () => { checkbox.checked = true });
    } else {
      this.setState({ selectedPackages: this.state.selectedPackages.delete(this.state.selectedPackages.indexOf(event.target.id)) }, () => { checkbox.checked = false; } );
    }
  };

  handleMoveButton = (event) => {
    console.log(this.state.selectedPackages)
  };

  render() {
    return (
      <div>
        { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
        <div>
          <Card className="text-center">
            <Card.Header>Control Center</Card.Header>
            <Card.Body>
              <Card.Title>Employee Actions</Card.Title>
              <Button size='lg' variant="info" style={ControlButtonStyle} onClick={this.handleMoveButton}>Move Packages into Truck</Button>
            </Card.Body>
          </Card>
        </div>

        <h3 style={h3Style}>Packages in Facility</h3>
        <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              <th>Selector</th>
              <th>#</th>
              <th>Sender Email</th>
              <th>Sender Address</th>
              <th>Recipient Email</th>
              <th>Recipient Address</th>
              <th>Delivery Status</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
          { this.state.packages.map((p) => { return this.makeTR(p, p.id) }) }
          </tbody>
    </Table>
      </div>
    )
    }
}

const ControlButtonStyle = {
  marginRight: '16px',
};

const tableStyle = {
  margin: '0 auto',
  textAlign: "center",
};

const h3Style = {
  marginTop: '2.5%',
};

export default EmpFacility;