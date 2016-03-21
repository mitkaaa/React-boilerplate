if(SIDE=='client'){
    // Стили только для клиента и только require :(
    require('./template.css')
}

import React from 'react'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
// import { Actions } from '__data__'


// import Sign from './blocks/sign'
// import Menu from './blocks/menu'


class Template extends React.Component {
    constructor(props) {
        super(props)
        // this.actionsUser = bindActionCreators(Actions.UserActions, this.props.dispatch)
    }

    componentDidMount () {
        window.addEventListener('resize', () => {
        }, true)    
    }
    render() {
        return (
            <div className="wrapper">
                { this.props.children }
            </div>
        )
    }
}

// Экшены которые дернуться на сервере
// Template.needs = [
//   Actions.UserActions.fetch
// ]

export default connect(state => state)(Template)