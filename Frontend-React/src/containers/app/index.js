import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Navigation from '../navbar'
import signup from '../signup'
import Manager from '../manager'

const App = () => (
  <div>
    <header>
      <Navigation/>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={signup} />
      <Route exact path='/manager' component={Manager} />
    </main>
  </div>
);

export default App
