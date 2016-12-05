import React from 'react'
import classnames from 'classnames'
import moment from 'moment'

import style from './style.css'
import grd from 'common-grd'

export default class PlanViewTime extends React.Component {

    static propTypes = {
        markers: React.PropTypes.array
    }

    constructor (props) {
        super(props)
    }

    formatDate (date) {
        return moment(date).format('DD MMM')
    }

    formatDateTime (date) {
        return moment(date).format('HH:mm')
    }

    render () {
        return (
        <div className={classnames({})}>
            {_.map(this.props.markers, (marker, key) => {
                return this.renderItem(marker, key)
            })}
        </div>)
    }

    renderItem (item, key) {
        return (
        <div key={key} className={style.planCell}>
            <div className={classnames(grd.Grid, grd['-middle'], style.planTime)}>
                <div className={classnames(grd.Cell, grd['-3of12'], style.planView)}>
                    {this.renderItemIcon(item)}
                </div>
                <div className={classnames(grd.Cell, grd['-9of12'], style.planText)}>
                    <h3 className={style.planTextCaptionTime}>{item.location}</h3>
                    <p className={style.planTextDate}>{item.notice}</p>
                </div>
            </div>
        </div>
        )
    }

    renderItemIcon (item) {
        const { type } = item

        return (<div className={classnames(style.planViewTime)}>
            {type === 'time' && this.formatDateTime(item.date)}
        </div>)
    }
}
