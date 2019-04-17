import React from 'react'
import Table from 'react-bootstrap/Table'
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { List } from 'immutable'
import {apiPost} from '../../utils/api';
import Alert from "react-bootstrap/Alert";
import {
  PieChart, Pie, LabelList, Cell, ResponsiveContainer,
} from 'recharts';

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Cookie.get('id'),
      packages: List([]),
      inPackages: List([]),
      newPackageViewStatus: false,
      showPackStatusReport: false,
      error: { is: false, msg: '' },
      newPackEmail: '',
      newPackAddress: '',
      newPackWeight: 0,
      statusData: [],
      notification: { is: false, message: '', type: '', header: '' }
};
    this.openNewPackage = this.openNewPackage.bind(this);
    this.makeTR = this.makeTR.bind(this);
    this.newPackageSubmit = this.newPackageSubmit.bind(this);
    this.handleNewPackageEmail = this.handleNewPackageEmail.bind(this);
    this.handleNewPackageAddress = this.handleNewPackageAddress.bind(this);
    this.handleNewPackageWeight = this.handleNewPackageWeight.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.getIncomingPackages = this.getIncomingPackages.bind(this);
    this.computeData = this.computeData.bind(this);
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
  }

  componentDidMount() {
    this.getPackages();
    this.getIncomingPackages();
  }

  openNewPackage = () => {
    this.setState({ newPackageViewStatus: !this.state.newPackageViewStatus })
  };

  openStatusReport = () => {
    this.setState({ showPackStatusReport: !this.state.showPackStatusReport })
  };

  newPackageSubmit = () => {
    if (this.state.newPackEmail && this.state.newPackAddress && this.state.newPackWeight) {
      apiPost('/customer/newPackage', {
        recipientEmail: this.props.newPackEmail,
        recipientAddress: this.props.newPackAddress,
        weight: this.props.newPackWeight,
        senderID: this.state.id
      })
        .then(resp => {
          if (resp.success && resp.success === true) {
            window.location.reload();
          }
        })
        .catch(error => {
          this.setState({ notification: { is: true, message: 'Could not make new package.', type: 'danger', header: 'Error!' } })
        })
    }
  };

  makeTR = (p, id) => {
    return (
      <React.Fragment key={id}>
        <tr>
          <td> <a href={'/tracking#' + p.id} >{p.id}</a></td>
          <td> { p.senderEmail } </td>
          <td> { p.recipientEmail } </td>
          <td> { p.senderAddress } </td>
          <td> { p.recipientAddress } </td>
          <td> { p.deliveryStatus } </td>
          <td> { p.packageWeight } </td>
        </tr>
      </React.Fragment>)
  };

  handleNewPackageEmail = (event) => {
    this.setState({ newPackEmail: event.target.value })
  };

  handleNewPackageAddress = (event) => {
    this.setState({ newPackAddress: event.target.value })
  };

  handleNewPackageWeight = (event) => {
    this.setState({ newPackWeight: event.target.value })
  };

  getPackages = () => {
    apiPost('/customer/packages', { id: this.state.id })
      .then(resp => {
        this.setState({ packages: List(resp.packages) }, () => { this.computeData() })
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get packages.', type: 'danger', header: 'Error!' } })
      })
  };

  getIncomingPackages = () => {
    apiPost('/customer/incomingpackages', { id: this.state.id })
      .then(resp => {
        this.setState({ inPackages: List(resp.packages) })
      })
      .catch(error => {
        this.setState({ notification: { is: true, message: 'Could not get packages.', type: 'danger', header: 'Error!' } })
      })
  };

  renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="middle">
      {`${this.state.statusData[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

  computeData = () => {
    let data = [
      { name: 'Label Created', value: 0 },
      { name: 'Drop Off', value: 0 },
      { name: 'In Sorting', value: 0 },
      { name: 'In Transit', value: 0 },
      { name: 'Out for Delivery', value: 0 },
      { name: 'Delivered', value: 0 }
    ];
    this.state.packages.forEach((p) => {
      for (let i=0; i < 6; i++) {
        if (p.deliveryStatus === data[i].name) {
          console.log(p.deliveryStatus, data[i].name);
          data[i].value += 1
        }
      }
    });
    data = data.filter((i) => {
      return i.value !== 0
    });
    this.setState({ statusData: data }, () => { console.log(this.state.statusData) })
  };

  render() {
    return <div>
      { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
      <Modal show={this.state.newPackageViewStatus} onHide={this.openNewPackage}>
        <Modal.Header closeButton>
          <Modal.Title>Ship a New Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label> Recipient Email </Form.Label>
                <Form.Control placeholder='example@email.com' value={this.state.newPackEmail} onChange={this.handleNewPackageEmail} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridAddress'>
                <Form.Label> Recipient Address </Form.Label>
                <Form.Control placeholder='123 Main St.' value={this.state.newPackAddress} onChange={this.handleNewPackageAddress} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridWeight'>
                <Form.Label> Package Weight </Form.Label>
                <Form.Control placeholder='1.0' value={this.state.newPackWeight} onChange={this.handleNewPackageWeight} />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.openNewPackage}>
            Close
          </Button>
          <Button variant="primary" onClick={this.newPackageSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.showPackStatusReport} size='lg' onHide={this.openStatusReport}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Package Status Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResponsiveContainer width={'100%'} height={400}>
            <PieChart width={500} height={500}>
              <Pie
                data={this.state.statusData}
                cx={375}
                cy={200}
                label={this.renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  this.state.statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>


      <Card className="text-center">
        <Card.Header>Control Center</Card.Header>
        <Card.Body>
          <Card.Title>Customer Actions</Card.Title>
          <Button size='lg' variant='success' onClick={this.openNewPackage}>Ship a new package</Button>
          <Button style={ { marginLeft: '10px' } } size='lg' variant='info' onClick={this.openStatusReport}>Review Package Status Report</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as='h5'>Package Statistics</Card.Header>
        <Card.Body><h5>Average Weight: { (this.state.packages.map(p => Number(p.packageWeight.substr(0,p.packageWeight.indexOf('o')))).reduce((prev, curr) => prev+curr)/this.state.packages.size).toFixed(0) + 'oz' }</h5></Card.Body>
      </Card>

      <div style={{ marginTop: '2%' }}>
        <h1>Your Packages:</h1>
      </div>
    <Table style={tableStyle} striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Sender Email</th>
        <th>Recipient Email</th>
        <th>Sender Address</th>
        <th>Recipient Address</th>
        <th>Status</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
    { this.state.packages.map((pack) => { return this.makeTR(pack, pack.id) }) }
    </tbody>
    </Table>

    <div style={{ marginTop: '2%' }}>
      <h1>Packages en-route to you:</h1>
    </div>
      <Table style={tableStyle} striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Sender Email</th>
        <th>Recipient Email</th>
        <th>Sender Address</th>
        <th>Recipient Address</th>
        <th>Status</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
    { this.state.inPackages.map((pack) => { return this.makeTR(pack, pack.id) }) }
    </tbody>
    </Table>
</div>
    }
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const tableStyle = {
  margin: '0 auto',
  marginTop: '3%',
  textAlign: "center",
};


export default CustomerHome;