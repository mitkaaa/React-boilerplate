import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import Month from './month'
import Day from './day'

import style from './style.css'
import grd from 'common-grd'
import icons from 'common-icons'

const range = [
    moment(),
    moment().clone().add(1, 'year')
]

export default class Plan extends React.Component {

    static propTypes = {
        toolbarElement: React.PropTypes.number,
        toolbarOnChange: React.PropTypes.func
    }

    constructor (props) {
        super(props)
        this.state = {
            scrollProcent: 0
        }
        this.onUpdateScroll = this.onUpdateScroll.bind(this)
    }

    onUpdateScroll (value) {
        let timerId = setTimeout(() => {}, 1)
        if (value.top) {
            const scrollProcent = _.round(value.top, 6)
            if (this.state.scrollProcent !== scrollProcent) {
                // clearTimeout(timerId)
                // timerId = setTimeout(() => {
                //     this.setState({ scrollProcent })
                // }, 100)

                // this.setState({ scrollProcent })
            }
        }
    }

    arrayDate (prop = 'month') {

        const range_ = range[0].clone()
        if (!range[1]) {
            return []
        }

        let item = []

        while (range[1].isSameOrAfter(range_)) {
            range_.add(1, prop)
            item.push(range_.clone().subtract(1, prop))
        }

        return item
    }

    render () {
        const scrollbars = _.get(this.refs, 'day.refs.scrollbars')
        return (
            <div className={classnames(grd.Grid, style.plan)}>
                <div className={classnames(grd.Cell, grd['-2of12'])} style={{ position: 'relative' }}>
                    <Month
                        scrollbar={scrollbars}
                        months={this.arrayDate()}
                        scrolProcent={this.state.scrollProcent} />
                </div>
                <div className={classnames(grd.Cell, grd['-10of12'])} style={{ height: '100vh' }}>
                    <Day ref="day" onScroll={this.onUpdateScroll} days={this.arrayDate('days')} />
                </div>
            </div>
        )
    }
}
