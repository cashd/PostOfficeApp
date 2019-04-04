import React from 'react'
import Table from 'react-bootstrap/Table'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'




class EmployeeHome extends React.Component {
  constructor(props) {
    super(props);
    this.makeTR = this.makeTR.bind(this);
  }

  componentDidMount() {
    const id = Cookie.get('id');
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
    return <div >

</div>
    }
}


export default

// const mapStateToProps = ({ customer }) => ({
//   packages: customer.packages,
//   newPackageViewStatus: customer.newPackageViewStatus,
//   newPackAddress: customer.newPackAddress,
//   newPackDropOff: customer.newPackDropOff,
//   newPackEmail: customer.newPackEmail,
//   newPackWeight: customer.newPackWeight,
//   inPackages: customer.inPackages,
// });
//
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getPackages,
//       changeNewPackageView,
//       newPackage,
//       updateNewPackageAddress,
//       updateNewPackageEmail,
//       updateNewPackageWeight,
//       getIncomingPackages,
//     },
//     dispatch
//   );
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CustomerHome)
