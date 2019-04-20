import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.transformData(props.data)
    };

    this.transformData = this.transformData.bind(this);
    this.makeTR = this.makeTR.bind(this);
  };

  transformData = (data) => {
    return data.map((d) => {
      return { name: new Date(d.Date.substr(0,16)).getDay(), value: Number(d.value) }
    })
  };

  makeTR = (p, id) => {
    return (
      <React.Fragment key={id}>
        <tr>
          <td> <a href={'/tracking#' + p.id} >{p.id}</a></td>
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
        <div>
          <BarChart
            width={500}
            height={300}
            data={this.state.data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
        <div>
          {/*<Table style={tableStyle} striped bordered hover>*/}
          {/*  <thead>*/}
          {/*    <tr>*/}
          {/*      <th>#</th>*/}
          {/*      <th>Sender Email</th>*/}
          {/*      <th>Recipient Email</th>*/}
          {/*      <th>Sender Address</th>*/}
          {/*      <th>Recipient Address</th>*/}
          {/*      <th>Status</th>*/}
          {/*      <th>Weight</th>*/}
          {/*    </tr>*/}
          {/*  </thead>*/}
          {/*  <tbody>*/}
          {/*  { this.state.packages.map((pack) => { return this.makeTR(pack, pack.id) }) }*/}
          {/*  </tbody>*/}
          {/*</Table>*/}
        </div>
      </div>
    );
  }
}

const tableStyle = {
  margin: '0 auto',
  marginTop: '3%',
  textAlign: "center",
};

