import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavbar from '../Components/CustomNavbar'
import RegisterForm from '../Components/RegisterFrom'
export default class Register extends Component {
  render() {
    return (
      <><CustomNavbar/>
      <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center',height: '75vh'}}><RegisterForm/></div>
      </>
    )
  }
}
