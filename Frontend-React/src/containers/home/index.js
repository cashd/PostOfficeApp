import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRoleCookie } from '../../reducers/home'
import CustomerHome from '../customerHome'

class Home extends React.Component {
    constructor(props) {
    super(props);
    this.props.getRoleCookie()
    }

    render() {
        const role = this.props.role;
        console.log(role)
        let home;
        if (role === 'Customer') {
            home =  <CustomerHome  />
        }
        else if (role === 'Facility') {
            home =  <p>Facility Home</p>
        }
        else if (role === 'Truck') {
            home =  <p>Truck Home</p>
        } else {
            this.props.pushLogin()
        }
        return <div>
            {home}
  </div>
    }
}

const mapStateToProps = ({ home }) => ({
  role: home.role,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRoleCookie,
        pushLogin: () => push('login'),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
