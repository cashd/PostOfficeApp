import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { List } from 'immutable'
import { apiPost } from '../../utils/api'
import Alert from 'react-bootstrap/Alert';


class EmpDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.info.id,
      truckID: props.info.truckID,
      type: '',
      isManager: props.info.isManager ? props.info.isManager : false,
      selectedFacility: 'Choose a Facility',
      facilities: List([]),
      packages: List([]),
      selectedPackages: List([]),
      notification: { is: false, message: '', type: '', header: '' }
    };

    this.makeTR = this.makeTR.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.getFacilities = this.getFacilities.bind(this);
    this.getTruckType = this.getTruckType.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleTravelButton = this.handleTravelButton.bind(this);
    this.handleFacilityChange = this.handleFacilityChange.bind(this);
    this.handleDeliverButton = this.handleDeliverButton.bind(this);
  }

  componentDidMount() {
    this.getPackages();
    this.getFacilities();
    this.getTruckType();
  }

  makeTR = (p, id) => {
    return (
      <React.Fragment key={id}>
        <tr>
          { this.state.type === 'Delivery' ? <td> <Button name='deliver' onClick={this.handleDeliverButton} id={p.id} variant='success' >Deliver</Button></td> : null}
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

  getFacilities = () => {
    apiPost('/facility/all', { facilityID: this.state.facilityID })
      .then((resp) => {
        if (resp.facilities && resp.facilities.size !== 0) {
          this.setState({ facilities: List(resp.facilities) })
        } else {
          this.setState({ notification: { is: true, message: 'Could not get facilities.', type: 'danger', header: 'Error!' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get facilities.', type: 'danger', header: 'Error!' } })
      })
  };

  getPackages = () => {
    apiPost('/truck/packages', { truckID: this.state.truckID })
      .then(resp => {
        console.log(resp);
        if (resp.packages && resp.packages.length !== 0) {
          this.setState({ packages: List(resp.packages) })
        } else {
          this.setState({ notification: { is: true, message: 'There are currently no packages at the facility!', type: 'warning', header: 'No packages.' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get facilities.', type: 'danger', header: 'Error!' } })
      })
  };

  getTruckType = () => {
    apiPost('/truck/type', { truckID: this.state.truckID })
      .then(resp=> {
        console.log(resp);
        this.setState({ type: resp.type })
        })
        .catch(error => {
          this.setState({ notification: { is: true, message: 'Could not get truck type!', type: 'danger', header: 'Error!' } })
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

  handleTravelButton = (event) => {
    console.log(this.state);
    const state = this.state;
    if (state.selectedFacility !== 'Choose a Facility') {
      apiPost('/truck/travel', { packages: state.packages, truckID: state.truckID, facilityID: Number(state.selectedFacility[0]) })
      .then(resp => {
        console.log(resp);
        if (resp.success && resp.success === true) {
          window.location.reload();
        } else {
          this.setState({ notification: { is: true, message: 'Could not travel.', type: 'danger', header: 'Error!' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not travel.', type: 'danger', header: 'Error!' } })
      })
    }
  };

  handleDeliverButton = (event) => {
    apiPost('/truck/deliver', { packageID: event.target.id, truckID: this.state.truckID })
      .then(resp => {
        console.log(resp);
        if (resp.success && resp.success === true) {
          window.location.reload()
        } else {
          this.setState({ notification: { is: true, message: 'Could not deliver.', type: 'danger', header: 'Error!' } })
        }
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not deliver.', type: 'danger', header: 'Error!' } })
      })
  };

  handleFacilityChange = (event) => {
    this.setState({ selectedFacility: event.target.value });
  };

  render() {
    return (
      <div>
        { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
        <div>
          <Card className="text-center">
            <Card.Header>Control Center</Card.Header>
            <Card.Body>
              <Card.Title>Driver Actions</Card.Title>
              <Form.Row style ={{ width: 500, margin: '0 auto', textAlign: 'center'  }}>
                { this.state.type === 'Delivery' ? <Button variant="info" disabled style={ControlButtonStyle} onClick={this.handleTravelButton}>Travel to Facility</Button> : <Button variant="info" style={ControlButtonStyle} onClick={this.handleTravelButton}>Travel to Facility</Button> }
                <Form.Group as={Col}>
                  <Form.Control as='select' value={this.state.selectedFacility} onChange={this.handleFacilityChange}>
                    <option>Choose a Facility</option>
                    { this.state.facilities.map((f) => {return (<option key={f.facilityID}>{f.facilityID + ' - ' + f.address + ', ' + f.state + ', ' + f.zip}</option>)}) }
                  </Form.Control>
              </Form.Group>
              </Form.Row>
            </Card.Body>
          </Card>
        </div>

        <h3 style={h3Style}>Packages in Truck</h3>
        <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              { this.state.type === 'Delivery' ? <th>Deliver</th> : null }
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

export default EmpDriver;