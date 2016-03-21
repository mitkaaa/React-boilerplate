import React from 'react'
import { Link } from 'react-router'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

class Test extends React.Component {
    // Constructor
    constructor (props) {
        super(props)
    }
    
    componentDidMount () {
    }
    
    render () {
        return (
            <div>
                <DocumentTitle title="Тестовый заголовок" />
                <h1>Тестовый заголовок</h1>
                <Link to="/">Index</Link>
            </div>
        )
    }
}

export default Test
