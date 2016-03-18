if(SIDE=='client'){
    require('./style.css')
}

import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Modal, Button, Tabs, Tab } from 'react-bootstrap'

import SigninForm from './signinForm'
import SignupForm from './signupForm'


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            key: 1
        }
    }
    
    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }
    
    handleSelect(key) {
        this.setState({key});
    }
  
    
    render(){
        return (
            <span>
                <Modal show={this.state.showModal} bsSize="small" aria-labelledby="contained-modal-title-sm" onHide={this.close.bind(this)} className="sign-modal">
                    <Modal.Body>
                    
                        <Tabs activeKey={this.state.key} onSelect={this.handleSelect.bind(this)}>
                            <Tab eventKey={1} title="Вход">
                                <div className="col-lg-12">
    								<SigninForm />
    							</div>
                            </Tab>
                            <Tab eventKey={2} title="Регистрация">
                                <div className="col-lg-12">
                                    <SignupForm />
                                </div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
                <Link to="#" className="btn btn-sign" onClick={this.open.bind(this)}>Войти</Link>
            </span>
        )
    }
}


export default connect(s => s.sign)(Signin);
