import React from 'react'
import classnames from 'classnames'
import moment from 'moment'

import style from './style.css'


export default class PlanViewDays extends React.Component {

    static propTypes = {
        range: React.PropTypes.array,
        markers: React.PropTypes.array,
    }

    static defaultProps = {
        range: [moment(), moment()]
    }

    constructor (props) {
        super(props)

        // this.arrayDays = this.arrayDays.bind(this)
    }


    render () {
        return (
            <div>
                <span className={classnames(style.planDaysDayAdd)} />
                2321123312123123132
            </div>
        )
    }
}
