import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRoleCookie } from '../../reducers/employeeHome';
import EmpFacility from '../empFacility';


class EmployeeHome extends React.Component {
  constructor(props) {
    super(props);
    this.props.getRoleCookie()
    }

  render() {
    let empType;
    if (this.props.truckID) {
      empType = <h1>Employee-Driver Home</h1>
    }
    else if (this.props.facilityID && this.props.isManager === true) {
      empType = <h1>Employee-Facility & Manager</h1>
    }
    else if (this.props.facilityID && !this.props.isManager || this.props.isManager === false) {
      empType = <EmpFacility info={{
        isManager: this.props.isManager,
        id: this.props.id,
        facilityID: this.props.facilityID }} />
    }
    else {
      empType = <h1>You are not assigned to a facility or truck.</h1>
    }

    return (
      <div>
        { empType }
      </div>
    )
    }
}

const mapStateToProps = ({ employeeHome }) => ({
  role: employeeHome.role,
  truckID: employeeHome.truckID,
  facilityID: employeeHome.facilityID,
  id: employeeHome.id,
  isManager: employeeHome.isManager,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRoleCookie,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeHome)
