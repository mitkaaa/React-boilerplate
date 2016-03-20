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
            <div className="layer">
                <header>
                    <div className="content-wrapper">
                        <Col className="layer__col" xs={10}>
                            <Link to="/" className="layer__logo"></Link>
                            { /* <Menu /> */ }
                        </Col>
                        <Col className="layer__col" xs={2}>
                            <div className="layer__sign">
                                { /* <Sign user={this.props.user} /> */ }
                            </div>
                        </Col>
                    </div>
                </header>   
                
                <div className="content-wrapper">
                    { this.props.children }
                </div>
                
                <footer>
                    <div className="content-wrapper">
                        <Col className="layer__col" xs={12}>Футер</Col>
                    </div>
                </footer>
            </div>
        )
    }
}

// Экшены которые дернуться на сервере
// Template.needs = [
//   Actions.UserActions.fetch
// ]

export default connect(state => state)(Template)