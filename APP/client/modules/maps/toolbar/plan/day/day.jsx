import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import Scrollbar from 'common-scrollbar'

import style from './style.css'
import grd from 'common-grd'

export default class Day extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        onScroll: React.PropTypes.func,
        days: React.PropTypes.array
    }

    static defaultProps = {
        days: [],
        onScroll: () => {}
    }

    // render () {
    //     return (
    //         <div>
    //             {this.renderDays()}
    //         </div>
    //     )
    // }

    render () {
        const { days } = this.props
        return (
            <Scrollbar ref="scrollbars" onScroll={this.props.onScroll} className={style.day}>
                {_.map(days, (day, key) =>
                    (
                        <div key={key} className={classnames(style.dayItem)}>
                            {day.format('D') === '1' && this.renderMonth(day.format('MMMM'))}
                            <div className={classnames(grd.Grid, style.item)}>
                                <div className={classnames(grd.Cell, grd['-1of12'], style.itemDay)}>
                                    <span>{day.format('D')}</span>
                                </div>
                                <div className={classnames(grd.Cell, grd['-11of12'], style.itemText)}>
                                    <p>test</p>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </Scrollbar>)

    }

    renderMonth (day) {
        return (<div className={style.dayItemMonth}>
            <div className={style.dayItemMonthBlock}>{day}</div>
        </div>)
    }
}
