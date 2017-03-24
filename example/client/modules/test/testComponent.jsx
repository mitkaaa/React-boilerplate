import React from 'react'
import { Link } from 'react-router'

// import DocumentTitle from 'react-document-title'
// <DocumentTitle title="Тестовый заголовок" />
export default class Test extends React.Component {
    // Constructor
    constructor (props) {
        super(props)
    }

    componentDidMount () {
    }

    render () {
        return (
            <div>
                <h1>Тестовый заголовок</h1>
                <Link to="/">Index</Link>
            </div>
        )
    }
}
