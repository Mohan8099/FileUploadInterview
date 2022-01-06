import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label testid="input-label" className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          testid="password-input-field"
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label testid="input-label" className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          testid="usernmae-input-field"
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div testid="login-form-container" className="login-form-container">
        <div testid="landing-container" className="landing-container">
          <p testid="login-mobile-text" className="login-mobile-text">
            Login
          </p>
        </div>
        <form
          testid="form-container"
          className="form-container"
          onSubmit={this.submitForm}
        >
          <img
            src="https://res.cloudinary.com/digwhjt1m/image/upload/v1641365397/samples/Tasty%20Kitchens/Frame_274_x1nvvp.png"
            testid="login-website-logo-desktop-image"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <h1 testid="app-name" className="app-name">
            Authentication Page
          </h1>
          <h1 testid="login-info" className="login-info">
            Login
          </h1>
          <div testid="input-container" className="input-container">
            {this.renderUsernameField()}
          </div>
          <div testid="input-container" className="input-container">
            {this.renderPasswordField()}
          </div>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
          <button testid="login-button" type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute
