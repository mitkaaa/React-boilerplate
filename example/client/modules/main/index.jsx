import React from 'react'

import style from './style.css'

export class Main extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    render () {

        return (
                <div className={style.main}>
                    <div className={style.mainContainer}>
                        <h1>Hello world !</h1>
                    </div>
                </div>
        )
    }
}
