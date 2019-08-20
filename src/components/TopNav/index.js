/**
 * @name TopNav
 * @author darcrand
 * @desc 导航栏
 */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

class TopNav extends Component {
    render() {
        const links = this.props.links || []
        return (
            <div classes="nav-bar">
                {links.map((v, i) => (
                    <NavLink classes="link" activeClass="active" key={i} to={v.to}>
                        {v.label}
                    </NavLink>
                ))}
            </div>
        )
    }
}

export default TopNav
