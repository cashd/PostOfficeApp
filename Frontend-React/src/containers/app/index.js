import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Navigation from '../navbar'
import signup from '../signup'
import Manager from '../manager'
import Tracking from '../tracking'
import EditEmployee from '../editEmployee'
import EditCustomer from '../editCustomer'

const App = () => (
  <div>
    <header>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
</link>

      <Navigation/>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={signup} />
      <Route exact path='/manager' component={Manager} />
      <Route path='/tracking' component={Tracking} />
      <Route path='/employee/edit' component={EditEmployee}/>
      <Route path='/customer/edit' component={EditCustomer}  />
    </main>
  </div>
);

export default App
