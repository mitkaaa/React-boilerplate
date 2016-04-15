import React from 'react'

export default class Main extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            num: 1
        }
    }
    
    componentDidMount () {
        setInterval(() => {
            this.setState({ num: ++this.state.num })
        },
        1000)
    }
    
    render () {
        return (
            <div className="Grid -middle -center" style={{ height: '100%', fontSize: '5em'}}>
                <div className="Cell">
                    <h1>{ this.state.num}</h1>
                </div>
            </div>
        )
    }
}
