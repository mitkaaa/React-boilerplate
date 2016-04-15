import './css/normalize.css'
import './css/grd.css'
import './css/template.css'
import './css/loader.css'

import React from 'react'
import { connect } from 'react-redux'


class Template extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        // window.addEventListener('resize', () => {
        // }, true)
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