import {Switch, Route} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
