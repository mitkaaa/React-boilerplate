import React from 'react'
import classnames from 'classnames'
import moment from 'moment'

import style from './style.css'
import grd from 'common-grd'
import icons from 'common-icons'

export default class PointStart extends React.Component {

    static propTypes = {
        point: React.PropTypes.object,
        placeholder: React.PropTypes.string,
        plan: React.PropTypes.array,
    }

    formatDate (date) {
        if (moment.isMoment(date)) {
            date = moment(date)
        }

        return date.format('DD MMM HH:mm:ss')
    }

    render () {
        const { point, placeholder, plan } = this.props
        return (
            <div>
                {this.renderPoints(point, placeholder)}
                {point && this.renderPointDistation(point, _.first(plan))}
            </div>
        )
    }

    renderPointEnd (point, placeholder, plan) {
        return (
            <div>
                {point && this.renderPointDistation(point, _.last(plan))}
                {this.renderPoints(point, placeholder)}
            </div>
        )
    }

    renderPointDistation () {
        return (
            <div className={classnames(grd.Grid, grd['-middle'])}>
                <div className={classnames(grd.Cell, grd['-3of12'], style.planView)}>
                    <div className={classnames(style.planViewTime)}>2 231 км</div>
                </div>
                <div className={classnames(grd.Cell, grd['-9of12'], style.planText)}>
                    <div className={style.planTextSmall}>Время в пути ~ 2 дня 3 часа</div>
                </div>
            </div>
        )
    }

    renderPoint (point) {
        return (
            <div className={classnames(style.planText, style.planTextCity)}>
                { point.location }
                <p className={style.planTextDate}>{ this.formatDate(point.date) }</p>
            </div>
        )
    }

    renderPoints (point, placeholder) {
        return (
            <div className={classnames(grd.Grid, grd['-middle'])}>
                <div className={classnames(grd.Cell, grd['-3of12'], style.planView)}>
                    <div className={classnames(style.planPointsView, { [style.planPointsViewActive]: !!point })}>
                        <span className={classnames(icons.i, icons.iSm, icons.airplane)} />
                    </div>
                </div>
                <div className={classnames(grd.Cell, grd['-9of12'], style.planPoints)}>
                    {!point && <input type="text" className={style.planPointsSearch} placeholder={placeholder} />}
                    {!!point && this.renderPoint(point)}
                </div>
            </div>
        )
    }
}
