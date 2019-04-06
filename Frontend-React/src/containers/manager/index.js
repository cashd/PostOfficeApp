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

  render() {
    return (
      <div>

      </div>
    )
    }
}

const mapStateToProps = ({ manager }) => ({
  isManager: manager.isManager,
  id: manager.id,
  facilityID: manager.facilityID
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEmployeeInfo,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager)