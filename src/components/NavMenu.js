import React from 'react'
import { Link } from "react-router-dom";

const NavMenu = ({onOpen}) => {
  return (
    <>
        <Link to="/">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Menu</Link>
        <Link onClick={onOpen}>Reservations</Link>
        <Link to="#">Order Online</Link>
        <Link to='#'>Login</Link>
    </>
  )
}

export default NavMenu
