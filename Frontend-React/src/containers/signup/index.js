
import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { List }from 'immutable'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isAuth } from "../../utils/auth";
import {
  updateAddress2Field,
  updateAddressField,
  updateCityField,
  updateEmailField,
  updatePasswordField,
  updateStateField,
  updateZipField,
  updateFirstNameField,
  updateLastNameField,
  submit,
  updatePhoneField
} from '../../reducers/signup'


class SignUp extends React.Component {

  handleEmail = (event) => {
    console.log(event.target.value);
    this.props.updateEmailField(event.target.value)
  };

  handlePassword = (event) => {
    console.log(event.target.value);
    this.props.updatePasswordField(event.target.value)
  };

  handleFirstName = (event) => {
    console.log(event.target.value);
    this.props.updateFirstNameField(event.target.value)
  };

  handleLastName = (event) => {
    console.log(event.target.value);
    this.props.updateLastNameField(event.target.value)
  };

  handleCity = (event) => {
    console.log(event.target.value);
    this.props.updateCityField(event.target.value)
  };

  handleZip= (event) => {
    console.log(event.target.value);
    this.props.updateZipField(event.target.value)
  };

  handleAddress = (event) => {
    console.log(event.target.value);
    this.props.updateAddressField(event.target.value)
  };

  handleAddress2 = (event) => {
    console.log(event.target.value);
    this.props.updateAddress2Field(event.target.value)
  };

  handleState = (event) => {
    console.log(event.target.value);
    this.props.updateStateField(event.target.value)
  };

  handlePhone = (event) => {
    console.log(event.target.value);
    this.props.updatePhoneField(event.target.value)
  };

  handleSubmit = (event) => {
    this.props.submit({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.props.password,
      address: this.props.address + ' ' + this.props.address2,
      zipcode: this.props.zip,
      stateid: this.props.stateUS,
      phoneNum: this.props.phoneNum,
      cityid: this.props.city,
    })
  };

  componentDidMount() {
    if (isAuth()) {
      this.props.pushHome()
    }
  }

    render() {
        return <div style={divStyle}>
        <h1 style={h1Style}> Sign up here! </h1>
        <Form style={formStyle}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First Name" value={this.props.firstName} onChange={this.handleFirstName.bind(this)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last Name" value={this.props.lastName} onChange={this.handleLastName.bind(this)} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={this.props.email} onChange={this.handleEmail.bind(this)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={this.props.password} onChange={this.handlePassword.bind(this)} />
              </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" value={this.props.address} onChange={this.handleAddress.bind(this)} />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" value={this.props.address2} onChange={this.handleAddress2.bind(this)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhoneNum">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="+1 (111) 111 - 111" value={this.props.phoneNum} onChange={this.handlePhone.bind(this)} />
            </Form.Group>

          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control value={this.props.city} onChange={this.handleCity.bind(this)}/>
            </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" value={this.props.stateUS}onChange={this.handleState.bind(this)}>
            <option>Choose...</option>
              { states.map((state) => {return (<option>{state}</option>)}) }
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control value={this.props.zip} onChange={this.handleZip.bind(this)} />
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
        Submit
      </Button>
</Form>;
      </div>
    }
}

// Styles
const h1Style = {
    marginTop: '3%',
};

const divStyle = {
    textAlign: "center",
};

const formStyle = {
    display: 'inline-block',
    margin: '0 auto',
    marginTop: '3%',
};


// State Selector
const states = List([
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'District of Columbia',
    'Puerto Rico',
    'Guam',
    'American Samoa',
    'U.S. Virgin Islands',
    'Northern Mariana Islands',
]);

const mapStateToProps = ({ signup }) => ({
  email: signup.email,
  password: signup.password,
  address: signup.address,
  address2: signup.address2,
  stateUS: signup.stateUS,
  zip: signup.zip,
  city: signup.city,
  firstName: signup.firstName,
  lastName: signup.lastName,
  phoneNum: signup.phoneNum,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateAddressField,
      updateCityField,
      updateAddress2Field,
      updateZipField,
      updateStateField,
      updatePasswordField,
      updateEmailField,
      updateFirstNameField,
      updateLastNameField,
      updatePhoneField,
      submit,
      pushHome: () => push('/'),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
