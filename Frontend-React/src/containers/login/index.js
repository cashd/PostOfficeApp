import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updatePasswordField, updateEmailField, checkLoginCredentials } from "../../reducers/login";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Login extends React.Component {

    handlePasswordChange = (event) => {
        console.log(event.target.value);
        this.props.updatePasswordField(event.target.value)
    };

    handleEmailChange = (event) => {
        console.log(event.target.value);
        this.props.updateEmailField(event.target.value)
    };

    handleSubmitClick = () => {
        console.log(this.props.email);
        console.log(this.props.password);
        this.props.checkLoginCredentials(this.props.email, this.props.password)
    };

    render() {
        return <div style={divStyle}>
            <Form style={formStyle}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={this.props.email} onChange={this.handleEmailChange.bind(this)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  value={this.props.password} onChange={this.handlePasswordChange.bind(this)} />
              </Form.Group>
              <Button variant="primary" size="large" onClick={ this.handleSubmitClick.bind(this) }>
                Submit
              </Button>
            </Form>
      </div>
    }
}

// Styles
const divStyle = {
    textAlign: "center",
};
const formStyle = {
    display: 'inline-block',
    margin: '0 auto',
    marginTop: '3%',
    width: '20%',
};

const mapStateToProps = ({ login }) => ({
    email: login.email,
    password: login.password,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      {
          updatePasswordField,
          updateEmailField,
          checkLoginCredentials,
      },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
