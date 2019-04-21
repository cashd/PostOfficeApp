import React from 'react'
import { isManager } from '../../utils/auth'
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { List } from 'immutable'
import { apiPost } from '../../utils/api'
import Alert from 'react-bootstrap/Alert';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'


class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Cookie.get('id'),
      isManager: isManager(),
      facilityID: Cookie.get('facilityID'),
      employees: List([]),
      newEmp: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        position: '',
        salary: '',
        phoneNum: '',
        zip: '',
        state: '',
        address: '',
        city: '',
        role: 'Choose...',
      },
      showNewEmp: false,
      showReport: false,
      showPackStatusReport: false,
      showPackageReport: false,
      showRevenueReport: false,
      selectedMonth: 'April',
      notification: { is: false, message: '', type: '', header: '' },
      reportData: [],
      statusData: [],
      revenueData: [],
};
    this.makeTR = this.makeTR.bind(this);
    this.handleChangeNewEmpView = this.handleChangeNewEmpView.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.handleNewEmpChange = this.handleNewEmpChange.bind(this);
    this.handleChangeReportView = this.handleChangeReportView.bind(this);
    this.handleNewEmpSubmit = this.handleNewEmpSubmit.bind(this);
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
    this.computeData = this.computeData.bind(this);
    this.transformData = this.transformData.bind(this);
    this.getPackageReport = this.getPackageReport.bind(this);
    this.monthToInt = this.monthToInt.bind(this);
    this.openRevenueReport = this.openRevenueReport.bind(this);
    }

  getEmployees = (payload) => {
    apiPost('/facility/employees', payload)
        .then((resp) => {
          this.setState({ employees: List(resp.employees) }, this.computeData)
        })
        .catch((error) => {
          this.setState({ notification: { is: true, message: 'Could not get employees', type: 'danger', header: 'Error!' } })

        })
  };

  getRevenueData = (month) => {
    apiPost('/package/reportRev', { month: this.monthToInt(month) })
      .then(resp => {
        console.log(resp)
        this.setState({ revenueData: this.transformData(resp.list) }, () => console.log(this.state.revenueData))
      })
      .catch(error => {
        console.log(error)
      })
  };

  monthToInt = (month) => {
    switch (month) {
      case 'January':
        return 1
      case 'February':
        return 2
      case 'March':
        return 3
      case 'April':
        return 4
      case 'May':
        return 5
      case 'June':
        return 6
      case 'July':
        return 7
      case 'August':
        return 8
      case 'September':
        return 9
      case 'October':
        return 10
      case 'November':
        return 11
      case 'December':
        return 12
      default:
        return 0
    }
  };

  getPackageReport = (month) => {
    apiPost('/facility/report', { facilityID: this.state.facilityID, month: this.monthToInt(month) })
      .then(resp => {
        console.log(resp)
        this.setState({ reportData: this.transformData(resp.list) }, () => console.log(this.state.reportData))
      })
      .catch(error => {
        console.log(error)
      })
  };

  componentDidMount() {
      this.getEmployees({
        managerID: this.state.id,
        facilityID: this.state.facilityID,
      });
      this.getPackageReport('April');
      this.getRevenueData('April');
    };

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
            <td> <Button variant='info' href={'/employee/edit#' + e.id}>Edit</Button> </td>
          </tr>
        </React.Fragment>)
  };

    makeTR3 = (e, id) => {
      return (
        <React.Fragment key={id}>
          <tr>
            <td> { e.id } </td>
            <td> { e.firstName } </td>
            <td> { e.lastName } </td>
            <td> { e.position } </td>
            <td> { e.workPhoneNum } </td>
            <td> { e.workEmail } </td>
          </tr>
        </React.Fragment>)
  };

    makeTR2 = (e, id) => {
      return (
        <React.Fragment key={'asdf'+id}>
          <tr>
            <td> { e.name } </td>
            <td>{ e.value }</td>
          </tr>
        </React.Fragment>)
  };

  handleChangeNewEmpView = () => {
    this.setState({ showNewEmp: !this.state.showNewEmp })
  };

  handleChangeReportView = () => {
    this.setState({ showReport: !this.state.showReport })
  };

  openStatusReport = () => {
    this.setState({ showPackStatusReport: !this.state.showPackStatusReport })
  };

  openRevenueReport = () => {
    this.setState({ showRevenueReport: !this.state.showRevenueReport })
  };

  handleNewEmpChange = (event) => {
    let newEmpObj = this.state.newEmp;
    newEmpObj[event.target.name] = event.target.value;
    this.setState({ newEmp: newEmpObj })
  };

  handleNewEmpSubmit = () => {
    const emp = this.state.newEmp;
    if (emp.phoneNum && emp.email && emp.password && emp.firstName && emp.lastName && emp.position && emp.salary && emp.zip && emp.address && emp.state && emp.city && emp.role && emp.role !== 'Choose...') {
      apiPost('/manager/addEmployee', {
        managerID: this.state.id,
        facilityID: this.state.facilityID,
        ...this.state.newEmp
      })
        .then((resp) => {
          if (resp.success === true) {
            window.location.reload()
          } else {
            this.setState({ notification: { is: true, message: 'Could not add employee. Invalid input or employee already exist.', type: 'danger', header: 'Error!' } })
          }
        })
        .catch(error => {
          this.setState({ showNewEmp: false })
          this.setState({ notification: { is: true, message: 'Could not add employee. Invalid input or employee already exist.', type: 'danger', header: 'Error!' } })
        })
    }
  };

  computeData = () => {
    let data = [
      { name: 'Clerk', value: 0 },
      { name: 'Supervisor', value: 0 },
      { name: 'Sorter', value: 0 },
      { name: 'Security', value: 0 },
      { name: 'Driver', value: 0 },
      { name: 'Carrier', value: 0 }
    ];
    this.state.employees.forEach((e) => {
      for (let i=0; i < 6; i++) {
        if (e.position === data[i].name) {
          data[i].value += 1
        }
      }
    });
    data = data.filter((i) => {
      return i.value !== 0
    });
    this.setState({ statusData: data }, () => { console.log(this.state.statusData) })
  };

  transformData = (data) => {
    return data.map((d) => {
      console.log(d)
      return { name: Number(d.Date), value: Number(d.value) }
    })
  };

    renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="middle">
      {`${this.state.statusData[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

  render() {
    return (
      <div>
        { this.state.notification.is ? (<Alert variant={this.state.notification.type} dismissible> <Alert.Heading>{ this.state.notification.header }</Alert.Heading><p>{ this.state.notification.message }</p></Alert>): null }
        <div>
          <Card className="text-center">
            <Card.Header>Control Center</Card.Header>
            <Card.Body>
              <Card.Title>Managerial Actions</Card.Title>
              <Button size='lg' variant="success" style={ControlButtonStyle} onClick={this.handleChangeNewEmpView}>Add Employee</Button>
              <Button size='lg' variant="info" style={ControlButtonStyle} onClick={this.handleChangeReportView}>Review Facility Report</Button>
              <Button style={ControlButtonStyle} size='lg' variant='dark' onClick={this.openStatusReport}>Review Employee Role Report</Button>
              <Button style={ControlButtonStyle} size='lg' variant='warning' onClick={this.openRevenueReport}>Review Revenue Report</Button>
            </Card.Body>
          </Card>
        </div>

        <Modal show={this.state.showPackStatusReport} size='lg' onHide={this.openStatusReport}>
        <Modal.Header closeButton>
          <Modal.Title>Facility Position Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResponsiveContainer width={'100%'} height={400}>
            <PieChart width={500} height={500}>
              <Pie
                data={this.state.statusData}
                cx={375}
                cy={200}
                label={this.renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  this.state.employees.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
                  <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Work Phone</th>
              <th>Work Email</th>
            </tr>
          </thead>
          <tbody>
          { this.state.employees.map((e) => { return this.makeTR3(e, e.id) }) }
          </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

        <Modal show={this.state.showNewEmp} onHide={this.handleChangeNewEmpView} name='CreateEmp'>
          <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridFirstName'>
                <Form.Label> First Name </Form.Label>
                <Form.Control placeholder='John' name='firstName' value={this.state.newEmp.firstName} onChange={this.handleNewEmpChange} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridLastName'>
                <Form.Label> Last Name </Form.Label>
                <Form.Control placeholder='Smith' name='lastName' value={this.state.newEmp.lastName} onChange={this.handleNewEmpChange}  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label> Work Email </Form.Label>
                <Form.Control placeholder='example@website.com' name='email' value={this.state.newEmp.email} onChange={this.handleNewEmpChange} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridPassword'>
                <Form.Label> Password </Form.Label>
                <Form.Control type='password' placeholder='********' name='password' value={this.state.newEmp.password} onChange={this.handleNewEmpChange}  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridPosition'>
                <Form.Label> Position </Form.Label>
                <Form.Control placeholder='Clerk' name='position' value={this.state.newEmp.position} onChange={this.handleNewEmpChange} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridSalary'>
                <Form.Label> Salary </Form.Label>
                <Form.Control placeholder='60000' name='salary' value={this.state.newEmp.salary} onChange={this.handleNewEmpChange}  />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridPhone'>
                <Form.Label> Work Phone </Form.Label>
                <Form.Control placeholder='832-123-123' name='phoneNum' value={this.state.newEmp.phoneNum} onChange={this.handleNewEmpChange}  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridAddress'>
                <Form.Label> Address </Form.Label>
                <Form.Control placeholder='123 Main St.' name='address' value={this.state.newEmp.address} onChange={this.handleNewEmpChange}  />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label> City </Form.Label>
                <Form.Control placeholder='Houston' name='city' value={this.state.newEmp.city} onChange={this.handleNewEmpChange}  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridZip'>
                <Form.Label> Zip </Form.Label>
                <Form.Control placeholder='77023' name='zip' value={this.state.newEmp.zip} onChange={this.handleNewEmpChange}  />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label> State </Form.Label>
                <Form.Control name='state' value={this.state.newEmp.state} onChange={this.handleNewEmpChange}  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRole">
                <Form.Label> Role </Form.Label>
                <Form.Control as="select" name='role' value={this.state.newEmp.role} onChange={this.handleNewEmpChange}>
                  <option>Choose...</option>
                  <option>Supervisor</option>
                  <option>Driver</option>
                  <option>Facility</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={this.handleNewEmpSubmit}> Submit </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showReport} onHide={this.handleChangeReportView} name='ShowReport' size='lg'>
          <Modal.Header closeButton>
          <Modal.Title>Review Facility Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ButtonGroup aria-label="Basic example" style={{ marginLeft: '11%' }}>
              <Button variant="dark" value='January' onClick={(e) => { this.getPackageReport(e.target.value) }}>Jan</Button>
              <Button variant="dark" value='February' onClick={(e) => { this.getPackageReport(e.target.value) }}>Feb</Button>
              <Button variant="dark" value='March' onClick={(e) => { this.getPackageReport(e.target.value) }}>Mar</Button>
              <Button variant="dark" value='April' onClick={(e) => { this.getPackageReport(e.target.value) }}>Apr</Button>
              <Button variant="dark" value='May' onClick={(e) => { this.getPackageReport(e.target.value) }}>May</Button>
              <Button variant="dark" value='June' onClick={(e) => { this.getPackageReport(e.target.value) }}>Jun</Button>
              <Button variant="dark" value='July' onClick={(e) => { this.getPackageReport(e.target.value) }}>Jul</Button>
              <Button variant="dark" value='August' onClick={(e) => { this.getPackageReport(e.target.value) }}>Aug</Button>
              <Button variant="dark" value='September' onClick={(e) => { this.getPackageReport(e.target.value) }}>Sep</Button>
              <Button variant="dark" value='October' onClick={(e) => { this.getPackageReport(e.target.value) }}>Oct</Button>
              <Button variant="dark" value='November' onClick={(e) => { this.getPackageReport(e.target.value) }}>Nov</Button>
              <Button variant="dark" value='December' onClick={(e) => { this.getPackageReport(e.target.value) }}>Dec</Button>
            </ButtonGroup>
            <h6 style={{ textAlign: 'center' }}>Number of Packages arriving to this facility each day.</h6>
            <AreaChart
        width={600}
        height={400}
        data={this.state.reportData}
        margin={{
          top: 10, right: 0, left: 120, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="value"/>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#c61313" fill="#c61313" />
      </AreaChart>
            <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              <th>Day of Month</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          { this.state.reportData.map((e) => { return this.makeTR2(e, e.id) }) }
          </tbody>
    </Table>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showRevenueReport} onHide={this.openRevenueReport} name='ShowReport' size='lg'>
          <Modal.Header closeButton>
          <Modal.Title>Review Revenue Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 style={{ textAlign: 'center' }}>Revenue of all facilities per day of this month.</h6>
            <h6 style={{ textAlign: 'center' }}>Total Revenue = { this.state.revenueData.reduce((prev, curr) => prev+curr) }</h6>
            <AreaChart
        width={600}
        height={400}
        data={this.state.revenueData}
        margin={{
          top: 10, right: 0, left: 120, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="value"/>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#2ecc63" fill="#2ecc63" />
      </AreaChart>
            <Table style={tableStyle} striped bordered hover>
          <thead>
            <tr>
              <th>Day of Month</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
          { this.state.revenueData.map((e) => { return this.makeTR2(e, e.id) }) }
          </tbody>
    </Table>
          </Modal.Body>
        </Modal>


        <Card>
        <Card.Header as='h5'>Facility Statistics</Card.Header>
        <Card.Body><h5>Average Salary: { '$' + (this.state.employees.map(e => e.salary).reduce((prev, curr) => prev+curr)/this.state.employees.size).toFixed(0)}</h5>
        <h5>Number of Employees: { this.state.employees.size }</h5>
        </Card.Body>
      </Card>

        <h3 style={h3Style}>Employees</h3>
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
              <th>Edit Employee</th>
            </tr>
          </thead>
          <tbody>
          { this.state.employees.map((e) => { return this.makeTR(e, e.id) }) }
          </tbody>
    </Table>
      </div>
    )
    }
}

const tableStyle = {
  margin: '0 auto',
  textAlign: "center",
};

const ControlButtonStyle = {
  marginRight: '16px',
};

const h3Style = {
  marginTop: '2.5%',
};

const COLORS = ['#fe2668', '#a500c4', '#0da9ff', '#ff841d', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;


export default Manager;