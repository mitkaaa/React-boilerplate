import React from 'react'
import classnames from 'classnames'

import { Link } from 'react-router'
import Plan from './plan'
import NoMarkers from './plan-no-markers'

import style from './style.css'
import grd from 'common-grd'

export default class Toolbar extends React.Component {

    static propTypes = {
        toolbarElement: React.PropTypes.number,
        toolbarOnChange: React.PropTypes.func,
    }

    constructor (props) {
        super(props)
        this.openToolbar = this.openToolbar.bind(this)
    }

    openToolbar (index) {
        if (index === this.props.toolbarElement) {
            return () => this.props.toolbarOnChange(0)
        }
        return () => this.props.toolbarOnChange(index)
    }

    render () {
        return (
            <div className={classnames(style.toolbar, { [style.toolbarOpenToolbar]: this.props.toolbarElement })}>
                <div className={style.toolbarMain}>
                    <Link to="#" className={style.toolbarLogo}/>
                    <ul className={style.toolbarMainList}>
                        <li><span
                            onClick={this.openToolbar(1)}
                            className={classnames(style.toolbarMainListLink, { [style.toolbarMainListLinkActive]: this.props.toolbarElement === 1 })} /></li>
                        <li><span
                            onClick={this.openToolbar(2)}
                            className={classnames(style.toolbarMainListLink, { [style.toolbarMainListLinkActive]: this.props.toolbarElement === 2 })} /></li>
                        <li><span className={style.toolbarMainListLink} /></li>
                    </ul>
                </div>
                <div className={classnames(style.toolbarPanel, { hide: this.props.toolbarElement !== 1 })}>
                    {false && this.renderNoMarkers()}
                    {/*<PlanView />*/}
                    <Plan />
                </div>
                <div className={classnames(style.toolbarPanel, { hide: this.props.toolbarElement !== 2 })}>
                    work!
                </div>
            </div>
        )
    }

    renderNoMarkers () {
        return (
            <div className={classnames(grd.Grid, grd['-middle'], grd['-center'], style.toolbarPanelNoMarkers)}>
                <div className={classnames(style.toolbarPanelNoMarkersBlock, grd.Cell, grd['-6of12'])}>
                    <NoMarkers />
                </div>
            </div>
        )
    }
}
