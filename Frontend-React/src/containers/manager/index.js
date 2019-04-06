import React from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import { setEmployeeInfo } from '../../reducers/manager'
import { isManager } from '../../utils/auth';
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { getEmployees } from '../../reducers/manager';


class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.props.setEmployeeInfo({
      id: Cookie.get('id'),
      isManager: isManager(),
      facilityID: Cookie.get('id')
    });

    this.makeTR = this.makeTR.bind(this);
    }

    componentDidMount() {
      this.props.getEmployees({
        managerID: this.props.id,
        facilityID: this.props.facilityID,
      });
    }

  makeTR = (e, id) => {
      return (
        <React.Fragment key={id}>
          <tr>
            <td> { e.id } </td>
            <td> { e.firstName } </td>
            <td> { e.lastName } </td>
            <td> { e.position } </td>
            <td> { e.workPhoneNum } </td>
            <td> { e.workEmail } </td>
            <td> { e.salary } </td>
          </tr>
        </React.Fragment>)
  };

  render() {
    return (
      <div>
        <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Work Phone</th>
              <th>Work Email</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
          { this.props.employees.map((e) => { return this.makeTR(e, e.id) }) }
          </tbody>
    </Table>
      </div>
    )
    }
}

const tableStyle = {
  margin: '0 auto',
  marginTop: '3%',
  textAlign: "center",
};


const mapStateToProps = ({ manager }) => ({
  isManager: manager.isManager,
  id: manager.id,
  facilityID: manager.facilityID,
  employees: manager.employees,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEmployeeInfo,
      getEmployees,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager)