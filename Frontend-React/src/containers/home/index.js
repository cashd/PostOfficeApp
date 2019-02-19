import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../reducers/counter'

class Home extends React.Component {
    render() {
        return <div>
    <h1>Home</h1>
    <p>Count: {this.props.count}</p>

    <p>
      <button onClick={this.props.increment}>Increment</button>
      <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={this.props.decrement}>Decrement</button>
      <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => this.props.changePage()}>
        Go to about page via redux
      </button>
    </p>
  </div>
    }
}

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
