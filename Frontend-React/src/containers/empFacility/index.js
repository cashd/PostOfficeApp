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
      type: '',
      selectedTruck: 'Choose a Truck',
      notification: { is: false, message: '', type: '', header: '' }
    };

    this.makeTR = this.makeTR.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.getTrucks = this.getTrucks.bind(this);
    this.getFacilityType = this.getFacilityType.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleMoveButton = this.handleMoveButton.bind(this);
  }

  componentDidMount() {
    this.getPackages();
    this.getTrucks();
    this.getFacilityType();
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

  getTrucks = () => {
    apiPost('/facility/trucks', { facilityID: this.state.facilityID })
      .then(resp => {
        console.log(resp);
        if (resp.trucks && resp.trucks.length !== 0) {
          this.setState({ trucks: List(resp.trucks) })
        } else {
          this.setState({ notification: { is: true, message: 'There are currently no trucks at the facility!', type: 'warning', header: 'No trucks.' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get trucks.', type: 'danger', header: 'Error!' } })
      })
  };

  getFacilityType = () => {
    apiPost('/facility/type', { facilityID: this.state.facilityID })
      .then(resp => {
        if (resp.type) {
          this.setState({ type: resp.type })
        } else {
          this.setState({ notification: { is: true, message: 'Could not get facility type.', type: 'danger', header: 'Error!' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get facility type.', type: 'danger', header: 'Error!' } })
      })
  };

  handleCheckbox = (event) => {
    const checkbox = document.getElementById(event.target.id);
    if (checkbox.checked) {
      this.setState({ selectedPackages: this.state.selectedPackages.push(event.target.id) }, () => { checkbox.checked = true });
    } else {
      this.setState({ selectedPackages: this.state.selectedPackages.delete(this.state.selectedPackages.indexOf(event.target.id)) }, () => { checkbox.checked = false; } );
    }
  };

  handleMoveButton = (event) => {
    console.log(this.state.selectedPackages);
    const state = this.state;
    if (state.selectedTruck !== 'Choose a Truck' && state.selectedPackages.size !== 0)
      apiPost('/facility/move', { packages: state.selectedPackages, facilityID: state.facilityID, truckID: Number(state.selectedTruck[0]) } )
        .then(resp => {
          console.log(resp);
          if (resp.success) {
            window.location.reload();
          } else {
            this.setState({ notification: { is: true, message: 'Could not load packages.', type: 'danger', header: 'Error!' } })
          }
        })
        .catch(error => {
          this.setState({ notification: { is: true, message: 'Could not load packages.', type: 'danger', header: 'Error!' } })
        })
  };

  handleTruckChange = (event) => {
    this.setState({ selectedTruck: event.target.value });
  };

  render() {
    return (
      <div style={{backgroundColor: 'whitesmoke'}}>
        { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
        <div>
          <Card className="text-center">
            <Card.Header>Control Center</Card.Header>
            <Card.Body>
              <Card.Title>Employee Actions</Card.Title>
              <Form.Row style ={{ width: 700, margin: '0 auto', textAlign: 'center'  }}>
                { this.state.type === 'Drop Off' ? <Button style={ControlButtonStyle} variant='dark'> Check in Package </Button> : <Button style={ControlButtonStyle} variant='dark'> Check in Package </Button> }
                <Button variant="info" style={ControlButtonStyle} onClick={this.handleMoveButton}>Move Packages into Truck</Button>
                <Form.Group as={Col}>
                  <Form.Control as='select' value={this.state.selectedTruck} onChange={this.handleTruckChange}>
                    <option>Choose a Truck</option>
                    { this.state.trucks.map((truck) => {return (<option key={truck.truckID}>{truck.truckID + ' - ' + truck.driverFirstName + ' ' + truck.driverLastName + ' - ' + truck.type}</option>)}) }
                  </Form.Control>
              </Form.Group>
              </Form.Row>
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