if(SIDE=='client'){
    // Стили только для клиента и только require
    require('./template.css')
}

import React from 'react'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'


import Sign from './blocks/sign'


class Template extends React.Component {
    constructor(props) {
        super(props);
    }

//<!DOCTYPE html>
    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-top">
                    <div className="wrapper">
                        <ul className="wrapper-menu">
                            <li><Link className="btn btn-link" to="/user">Исполнители</Link></li>
                            <li><Link className="btn btn-link" to="#">Лента</Link></li>
                            <li><Link className="btn btn-link" to="#">Общение</Link></li>
                            <li><Link className="btn btn-link" to="/blog">Блог</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="wrapper-header">
                    <div className="wrapper">
                        <Link to="/" className="logo"></Link>
                        <div className="wrapper-toolbar">
                        
                            <div className="block-left">
                            
                            </div>
                            <div className="block-right">
                                <a href="#city" clsassName="changeCity">Москва</a>
                                <Sign />
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="wrapper-content">
                    <h1>Test routing21213</h1>
                    <Link to="/">Главная</Link>
                    <Link to="/user">User</Link>
                    <Link to="/user/profile">User profile</Link>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(state => state)(Template);