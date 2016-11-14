import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

import style from './style.css'
import grd from 'common-grd'

export default class TopPanel extends React.Component {

    static propTypes = {
        toolbarElement: React.PropTypes.number,
        toolbarOnChange: React.PropTypes.func,
    }

    constructor (props) {
        super(props)
        this.closeToolbar = this.closeToolbar.bind(this)
    }

    closeToolbar () {
        this.props.toolbarOnChange(0)
    }

    render () {
        return (
            <div className={classnames(grd.Grid, grd['-middle'], style.panel)}>
                <div className={classnames(grd.Cell, grd['-8of12'], style.panelLeft)}>
                    <span onClick={this.closeToolbar} className={classnames(style.panelBack, { [style.panelBackShow]: this.props.toolbarElement })} />
                    <input type="text" className={classnames(style.panelSearch, { [style.panelSearchRight]: this.props.toolbarElement })} placeholder="Поиск" />
                </div>
                <div className={classnames(grd.Cell, grd['-4of12'], style.panelRight)}>
                    123
                </div>
            </div>
        )
    }
}
