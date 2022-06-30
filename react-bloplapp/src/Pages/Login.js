import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavbar from '../Components/CustomNavbar'
import LoginForm from '../Components/LoginForm'

export default class Login extends Component {
  render() {
    return (
      <><CustomNavbar/>
      <div style={{
        display: 'flex', alignItems: 'center',justifyContent: 'center',height: '75vh'
      }}>
      <LoginForm/>
      </div>
      </>

    )
  }
}
