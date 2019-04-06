import React from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import { setEmployeeInfo } from '../../reducers/empFacility'


class EmpFacility extends React.Component {
  constructor(props) {
    super(props);
    this.props.setEmployeeInfo({
      id: props.info.id,
      isManager: props.info.isManager ? props.info.isManager : false,
      facilityID: props.info.facilityID
    })
    }

  render() {
    return (
      <div>
        <h1>{ this.props.id }</h1>
        <h1>{ this.props.isManager }</h1>
        <h1>{ this.props.facilityID }</h1>
      </div>
    )
    }
}

const mapStateToProps = ({ empFacility }) => ({
  isManager: empFacility.isManager,
  id: empFacility.id,
  facilityID: empFacility.facilityID
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
)(EmpFacility)