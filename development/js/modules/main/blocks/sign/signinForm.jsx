import { message } from 'config'

import React from 'react'
import { bindActionCreators } from 'redux'
import * as SignActions from 'SignActions'
import { Input } from 'react-bootstrap'
import Validation from 'Validation'

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            key: 1
        }
        this.actions = bindActionCreators(SignActions, this.props.dispatch)
    }
    
    SignIn(e) {
        e.preventDefault()
        
        // this.actions.signin(
        //     this.refs.email.value,
        //     this.refs.password.value)
    }
    
    render(){
        return (
			<form role="form" onSubmit={this.SignIn.bind(this)}>

				<Validation 
				    message={{
				    	'default': message.SIGN_EMAIL_ERROR_REQUIRE,
			    		'email': message.SIGN_EMAIL_ERROR
			    	}} 
				    type="email" 
				    name="email" 
				    tabIndex="1" 
				    className="form-control" 
				    valid="required, email" 
				    placeholder="Электронная почта" 
				    bsSize="large" />
				
				<Validation 
					message={message.SIGN_PASSWORD_REQUIRE}
				    type="password" 
				    name="password" 
				    tabIndex="2" 
				    className="form-control" 
				    placeholder="Пароль" 
				    valid="required"
				    bsSize="large" />

				<div className="form-group">
					<div className="row">
						<div className="col-sm-6 col-sm-offset-3">
							<button tabIndex="3" className="form-control btn btn-login">Войти</button>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="row">
						<div className="col-lg-12 ">
							<div className="center-block" style={{ textAlign: 'center' }}>
								<a href="/recover" tabIndex="5" className="forgot-password">Забыли пароль?</a>
							</div>
						</div>
					</div>
				</div>
			</form>
        )
    }
}



