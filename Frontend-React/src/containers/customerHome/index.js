import React from 'react'
import Table from 'react-bootstrap/Table'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import {
  getPackages,
  changeNewPackageView,
  newPackage,
  updateNewPackageAddress,
  updateNewPackageEmail,
  updateNewPackageWeight,
  getIncomingPackages,
} from '../../reducers/customer'
import Card from "react-bootstrap/Card";

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.openNewPackage = this.openNewPackage.bind(this);
    this.makeTR = this.makeTR.bind(this);
    this.newPackageSubmit = this.newPackageSubmit.bind(this);
    this.handleNewPackageEmail = this.handleNewPackageEmail.bind(this);
    this.handleNewPackageAddress = this.handleNewPackageAddress.bind(this);
    this.handleNewPackageWeight = this.handleNewPackageWeight.bind(this);
  }

  componentDidMount() {
    const id = Cookie.get('id');
    this.props.getPackages(id);
    this.props.getIncomingPackages(id);
  }

  openNewPackage = () => {
    this.props.changeNewPackageView(this.props.newPackageViewStatus)
  };

  newPackageSubmit = () => {
    if (this.props.newPackEmail && this.props.newPackAddress && this.props.newPackWeight) {
      const id = Cookie.get('id');
      this.props.newPackage({
        recipientEmail: this.props.newPackEmail,
        recipientAddress: this.props.newPackAddress,
        weight: this.props.newPackWeight,
        senderID: id
    })
    }
  };

  makeTR = (p, id) => {
    return (
      <React.Fragment key={id}>
        <tr>
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

  handleNewPackageEmail = (event) => {
    this.props.updateNewPackageEmail(event.target.value)
  };

  handleNewPackageAddress = (event) => {
    this.props.updateNewPackageAddress(event.target.value)
  };

  handleNewPackageWeight = (event) => {
    this.props.updateNewPackageWeight(event.target.value)
  };

  render() {
    return <div >
      <Modal show={this.props.newPackageViewStatus} onHide={this.openNewPackage}>
        <Modal.Header closeButton>
          <Modal.Title>Ship a New Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label> Recipient Email </Form.Label>
                <Form.Control placeholder='example@email.com' value={this.props.newPackEmail} onChange={this.handleNewPackageEmail} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridAddress'>
                <Form.Label> Recipient Address </Form.Label>
                <Form.Control placeholder='123 Main St.' value={this.props.newPackAddress} onChange={this.handleNewPackageAddress} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridWeight'>
                <Form.Label> Package Weight </Form.Label>
                <Form.Control placeholder='1.0' value={this.props.newPackWeight} onChange={this.handleNewPackageWeight} />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.openNewPackage}>
            Close
          </Button>
          <Button variant="primary" onClick={this.newPackageSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="text-center">
        <Card.Header>Control Center</Card.Header>
        <Card.Body>
          <Card.Title>Customer Actions</Card.Title>
          <Button size='lg' variant='success' onClick={this.openNewPackage}>Ship a new package</Button>
        </Card.Body>
      </Card>


      <div style={{ marginTop: '3%' }}>
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
        <th>Status Address</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
    { this.props.packages.map((pack) => { return this.makeTR(pack, pack.id) }) }
    </tbody>
    </Table>

    <div style={{ marginTop: '3%' }}>
      <h1>Packages en-route to you</h1>
    </div>
      <Table style={tableStyle} striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Sender Email</th>
        <th>Recipient Email</th>
        <th>Sender Address</th>
        <th>Recipient Address</th>
        <th>Status Address</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
    { this.props.inPackages.map((pack) => { return this.makeTR(pack, pack.id) }) }
    </tbody>
    </Table>
</div>
    }
}

const tableStyle = {
  margin: '0 auto',
  marginTop: '3%',
  textAlign: "center",
};


const mapStateToProps = ({ customer }) => ({
  packages: customer.packages,
  newPackageViewStatus: customer.newPackageViewStatus,
  newPackAddress: customer.newPackAddress,
  newPackDropOff: customer.newPackDropOff,
  newPackEmail: customer.newPackEmail,
  newPackWeight: customer.newPackWeight,
  inPackages: customer.inPackages,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPackages,
      changeNewPackageView,
      newPackage,
      updateNewPackageAddress,
      updateNewPackageEmail,
      updateNewPackageWeight,
      getIncomingPackages,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerHome)
