import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../icons8-mixer-logo.svg';


export default class Navbar extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-sm bg-dark navbar-dark px-sm-5'>
                <Link to='/' >
                    <img src={logo} alt="store" className='navbar-brand logo-img'/>
                </Link>
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-item ml-5'>
                        <Link to='/' className='nav-link'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item ml-5'>
                        <Link to='/about' className='nav-link'>
                            About Us
                        </Link>
                    </li>
                    <li className='nav-item ml-5'>
                        <Link to='/products' className='nav-link'>
                            Products
                        </Link>
                    </li>
                </ul>
                <Link to='/cart' className='ml-auto'>
                    <button className='btn-cart'>
                        <span>
                        <i className='fas fa-cart-plus' /> My cart
                        </span>
                    </button>
                </Link>
            </nav>
        )
    }
}

