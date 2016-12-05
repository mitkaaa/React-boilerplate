import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import PlanViewTime from './plan-view-time'
import PlanAddMarkers from './plan-add-markers'

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
        this.arrayDays = this.arrayDays.bind(this)
    }

    arrayDays () {
        const { range } = this.props

        if (!range[1]) {
            return []
        }

        let days = []

        while (range[1].isSameOrAfter(range[0])) {
            range[0].add(1, 'days')
            days.push(range[0].clone().subtract(1, 'days'))
        }
        return days
    }

    render () {
        const days = this.arrayDays()
        return (
            <div className={style.planDays}>
                {_.map(days, (day, key) => {
                    const markers = _.filter(this.props.markers, (marker) => {
                        return day.isSame(marker.date, 'days')
                    })
                    return (
                        <div key={key}>
                            <div className={style.planDaysDay}>
                                <span className={style.planDaysDayBackground}>{day.format('D MMMM')}</span>
                                <PlanAddMarkers day={day} />
                            </div>
                            <PlanViewTime markers={markers} />
                        </div>
                    ) }
                )}
            </div>
        )
    }
}
