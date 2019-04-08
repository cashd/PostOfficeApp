import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { isAuth, isManager, existFacility } from '../../utils/auth';
import Cookie from 'js-cookie'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    Cookie.remove('id');
    Cookie.remove('role');
    Cookie.remove('facilityID');
    Cookie.remove('driverID');
    Cookie.remove('truckID');
    Cookie.remove('isManager');
    window.location.reload()
  };

    render() {
        return <div>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                crossOrigin="anonymous"
            />
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">T9 ~ Post Office</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  { isManager() && existFacility() ? <Nav.Link href="/manager">Manage Facility</Nav.Link> : null }
                </Nav>
                <Form inline>
                  { isAuth() ? null : <Button href='/signup' variant="outline-light" style={{ marginRight: 22 }}>Signup</Button> }
                  { isAuth() ? <Button onClick={this.logout} variant="outline-light">Logout</Button> : <Button href='/login' variant="outline-light">Login</Button> }
                </Form>
            </Navbar>
  </div>
    }
}

export default Navigation