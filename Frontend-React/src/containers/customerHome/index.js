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
  updateNewPackageDropOff,
  updateNewPackageEmail,
  updateNewPackageWeight,
  getStateFacilities
} from '../../reducers/customer'



class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.openNewPackage = this.openNewPackage.bind(this);
    this.makeTR = this.makeTR.bind(this);
    this.newPackageSubmit = this.newPackageSubmit.bind(this);
    this.handleNewPackageEmail = this.handleNewPackageEmail.bind(this);
    this.handleNewPackageAddress = this.handleNewPackageAddress.bind(this);
    this.handleNewPackageDropOff = this.handleNewPackageDropOff.bind(this);
    this.handleNewPackageWeight = this.handleNewPackageWeight.bind(this);
  }

  componentDidMount() {
    const id = Cookie.get('id');
    this.props.getPackages(id);
    this.props.getStateFacilities(id);
  }

  openNewPackage = () => {
    this.props.changeNewPackageView(this.props.newPackageViewStatus)
  };

  newPackageSubmit = () => {
    if (this.props.newPackEmail && this.props.newPackAddress && this.props.newPackWeight && this.props.newPackDropOff ) {
      const id = Cookie.get('id');
      this.props.newPackage({
        recipientEmail: this.props.newPackEmail,
        recipientAddress: this.props.newPackAddress,
        weight: this.props.newPackWeight,
        dropoff: this.props.newPackDropOff,
        senderId: id
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

  handleNewPackageDropOff = (event) => {
    this.props.updateNewPackageDropOff(event.target.value)
  };

  render() {
    return <div style={divStyle}>
      <div style={{ marginTop: '3%' }}>
        <Button variant='success' onClick={this.openNewPackage}>Ship a new package</Button>
      </div>
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
                <Form.Label> Recipient Email </Form.Label>
                <Form.Control placeholder='1.0' value={this.props.newPackWeight} onChange={this.handleNewPackageWeight} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridDropOff'>
                <Form.Label> Drop Off Location </Form.Label>
                <Form.Control as='select' placeholder='123 Main St.' value={this.props.newPackDropOff} onChange={this.handleNewPackageDropOff} >
                  { this.props.stateFacilities.keySeq().map((fac) => { return (<option key={fac}> { fac } </option>) }) }
                </Form.Control>
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


      <h1> Your packages:  </h1>
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
</div>
    }
}

const tableStyle = {
    margin: '0 auto',
    marginTop: '3%',
};

const divStyle = {
    textAlign: "center",
};

const mapStateToProps = ({ customer }) => ({
  packages: customer.packages,
  newPackageViewStatus: customer.newPackageViewStatus,
  newPackAddress: customer.newPackAddress,
  newPackDropOff: customer.newPackDropOff,
  newPackEmail: customer.newPackEmail,
  newPackWeight: customer.newPackWeight,
  stateFacilities: customer.stateFacilities,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPackages,
      changeNewPackageView,
      newPackage,
      updateNewPackageAddress,
      updateNewPackageDropOff,
      updateNewPackageEmail,
      updateNewPackageWeight,
      getStateFacilities
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerHome)
