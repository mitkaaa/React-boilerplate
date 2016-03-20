import React from 'react'
import { Link } from 'react-router'

export default class Main extends React.Component {
    // Constructor
    constructor (props) {
        super(props)
    }
    
    render () {
        return (
            <div>
                <h2>Главная страница 123123qq</h2>
                <Link to="/test">TEST</Link>
            </div>
        )
    }
}
