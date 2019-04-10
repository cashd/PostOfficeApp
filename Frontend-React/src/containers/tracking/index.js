import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { List } from 'immutable'
import { apiPost } from '../../utils/api'
import Alert from 'react-bootstrap/Alert';


class Tracking extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.location);
    this.state = {
      notification: { is: false, message: '', type: '', header: '' },
      packageID: props.location.hash ? props.location.hash.substr(1) : null,
      history: List([]),
      showHistory: !!props.location.hash,
    };

    this.makeTR = this.makeTR.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.handlePackageID = this.handlePackageID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.showHistory) {
      this.getHistory()
    }
  }

  getHistory = () => {
    if (this.state.packageID) {
      apiPost('/package/history', { packageID: this.state.packageID })
        .then(resp => {
          if (resp.history) {
            this.setState({ history: List(resp.history), showHistory: true })
          } else {
            this.setState({ notification: { is: true, message: 'Package does not have a history.', type: 'warning', header: 'Warning!' } })
          }
        })
        .catch(error => {
          this.setState({ notification: { is: true, message: 'Cannot get package history.', type: 'danger', header: 'Error!' } })
        })
    }
  };

  handlePackageID = (event) => {
    this.setState({ packageID: event.target.value });
  };

  handleSubmit = () => {
    if (this.state.packageID) {
      this.getHistory()
    }
  };

  makeTR = (e, id) => {
    return (
      <React.Fragment key={id}>
        <tr>
          <td> { e.timeOfEvent } </td>
          <td> { e.locationOfEvent } </td>
          <td> { e.eventType } </td>
        </tr>
      </React.Fragment>)
  };

  render() {
    return (
      <div>
        { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
        <Card className="text-center">
        <Card.Header>Package Tracking</Card.Header>
        <Card.Body>
          <Card.Title>Package History</Card.Title>
          { this.state.showHistory ?
            <Table style={tableStyle} striped hover>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
              </thead>
              <tbody>
          { this.state.history.map((event) => { return this.makeTR(event, event.id) }) }
          </tbody>
            </Table>
            : (
              <Form style={formStyle}>
                <Form.Group controlID='formGroupTracking'>
                  <Form.Label> Enter your package ID. </Form.Label>
                  <Form.Control style={{ textAlign: 'center' }} size='lg' placeholder='123' value={this.state.packageID} onChange={this.handlePackageID}  />
                  <Button size='lg' style={{marginTop: '4%'}} onClick={this.handleSubmit} > Submit </Button>
                </Form.Group>
              </Form>) }
        </Card.Body>
      </Card>
      </div>
    )
    }
}

const tableStyle = {
  margin: '0 auto',
  textAlign: "center",
};

const h3Style = {
  marginTop: '2.5%',
};

const formStyle = {
  width: '40%',
  margin: '0 auto',
  textAlign: 'center',
};

export default Tracking;