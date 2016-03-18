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
    
    // SignIn(e) {
    //     e.preventDefault()
        
    //     this.actions.signin(
    //         this.refs.email.value,
    //         this.refs.password.value)
    // }
    
    
    SignUp(e) {
        e.preventDefault()
        
        let element = e.target.elements
        let valid = Validation.status()
        console.log(element.email.value, element.signupPassword.value, Validation.status())
        
        
        // .map((element)=>{
        //     console.log(element)
        // })
        
        // this.actions.signup(
        //     this.refs.email.value,
        //     this.refs.password.value)
    }
    
    render(){
        return (
			<form role="form" onSubmit={this.SignUp.bind(this)}>
				<Validation 
				    message={{
				    	'default': '213123',
			    		'email': message.SIGN_EMAIL_ERROR,
			    		'required': message.SIGN_EMAIL_ERROR_REQUIRE
			    	}} 
				    type="email" 
				    name="email" 
				    tabIndex="1" 
				    className="form-control" 
				    valid="required, email" 
				    placeholder="Электронная почта" 
				    bsSize="large" />
				
				<Validation 
					message={message.SIGN_PASSWORD_MIN_MAX}
				    type="password" 
				    name="signupPassword" 
				    tabIndex="2" 
				    className="form-control" 
				    placeholder="Пароль" 
				    valid="min-max" 
				    valid-min="6" 
				    valid-max="12"
				    bsSize="large" />
				
				<Validation 
					message={{
				    	'default': message.SIGN_PASSWORD_MIN_MAX,
			    		'compar': message.SIGN_PASSWORD_RE
			    	}}
				    type="password" 
				    name="repassword" 
				    tabIndex="3" 
				    className="form-control" 
				    placeholder="Повторите пароль" 
				    valid="required,min-max,compar"
				    compar="signupPassword"
				    valid-min="6" 
				    valid-max="12"
				    bsSize="large" />
				    
					
				<div className="form-group">
					<div className="row">
						<div className="col-sm-10 col-sm-offset-1">
							<button type="submit" tabIndex="4" className="form-control btn btn-register">Зарегистрироваться</button>
						</div>
					</div>
				</div>
			</form>
        )
    }
}



