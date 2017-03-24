import React from 'react'
import classnames from 'classnames'
import moment from 'moment'

import style from './style.css'
import grd from 'common-grd'

export default class Month extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        months: React.PropTypes.array,
        scrolProcent: React.PropTypes.number,
        scrollbar: React.PropTypes.object
    }

    static defaultProps = {
        months: []
    }

    constructor (props) {
        super(props)
        this.state = {
            height: 0
        }
        this.height = this.height.bind(this)
        this.heightArrow = this.heightArrow.bind(this)
        this.onClickMonth = this.onClickMonth.bind(this)
    }

    componentDidMount () {

    }

    onClickMonth (key) {
        return () => {
            const { months } = this.props
            const height = this.props.scrollbar.getScrollHeight()
            this.props.scrollbar.scrollTop((height + 150) * key / (months.length))
        }
    }

    height () {
        if (!this.refs.month || !this.refs.main) {
            return 0
        }
        if (this.refs.month.offsetHeight < this.refs.main.offsetHeight) {
            return 0
        }
        return this.refs.month.offsetHeight - this.refs.main.offsetHeight
    }

    heightArrow () {
        if (!this.refs.arrow || !this.refs.month) {
            return 0
        }
        return (this.refs.month.offsetHeight - 35)
    }

    render () {
        const { months, scrolProcent } = this.props
        const top = this.height() * scrolProcent * -1 || 0
        return (<div ref="main" className={style.month}>
            {this.renderMonth(months, top, scrolProcent)}
        </div>)
    }

    renderMonth (months, top, scrolProcent) {
        console.log(this.props.scrollbar);
        return (
            <div ref="month"
                style={{ top }}
                className={classnames(style.block)}>
                {_.map(months, (month, key) => {
                    const active = _.round((months.length-1) * scrolProcent) === key
                    return (
                        <div
                            key={key}
                            onClick={this.onClickMonth(key)}
                            className={classnames(style.monthItem, { [style.monthItemActive]: active })}>
                            <span
                                className={classnames({ [style.monthItemActiveLink]: active })}>
                                {month.format('MMM')}
                            </span>
                        </div>
                    )
                })}

                <div ref="arrow" className={style.arrow} style={{ top: this.heightArrow() * (scrolProcent || 0) }} />
            </div>
        )
    }

}
