import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import NoMarkers from '../plan-no-markers'
import PointStart from './point-start'
import PointEnd from './point-end'
import PlanViewDays from './plan-view-days'

import style from './style.css'
import grd from 'common-grd'
import icons from 'common-icons'

export default class TravelView extends React.Component {

    static propTypes = {
        toolbarElement: React.PropTypes.number,
        toolbarOnChange: React.PropTypes.func,
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

    classNameItemIcon (type) {
        if (type === 'time') {
            return style.planViewTime
        } else if (!!type && type !== 'time') {
            return style.planViewBig
        }
        return style.planViewSmall

        return className
    }

    itemOnClick (item) {
        return () => {
            console.log(item)
        }
    }

    render () {
        const type = ['walk', 'plane', 'auto', 'bus', 'train']
        const additional = ['blue', 'green', 'red']

        const { start, end } = {
            start: {
                type: type[1],
                location: 'Россия, Москва',
                position: {},
                date: moment(),
                icon: null,
                text: null,
                additional: null,
                markers: []
            },
            end: {
                type: type[1],
                location: 'Россия, Уфа',
                position: {},
                date: moment().clone().add(15, 'days'),
                icon: null,
                text: null,
                additional: null,
                markers: []
            }
        }

        const plan = [
            {
                type: type[1],
                location: 'Словакия, Братислава',
                position: {},
                date: moment(),
                icon: null,
                text: null,
                additional: additional[2],
                markers: []
            }, {
                type: type[3],
                location: 'Чехия, Прага',
                position: {},
                date: moment(),
                icon: null,
                text: null,
                additional: null,
                markers: [{
                    type: 'time',
                    location: 'Заселение в дом',
                    notice: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                    position: {},
                    date: moment().add(2, 'days'),
                    icon: null,
                    text: null,
                    additional: null,
                    markers: []
                }, {
                    type: 'time',
                    location: 'В баааар!',
                    position: {},
                    date: moment().add(2, 'days').add(2, 'hour'),
                    icon: null,
                    text: null,
                    additional: additional[0],
                    markers: []
                },
            ] }, {
                type: type[1],
                location: 'Франция, Париж',
                position: {},
                date: moment().add(10, 'days'),
                icon: null,
                text: null,
                additional: null,
                markers: []
            }, {
                type: type[4],
                location: 'Германия, Кёльн',
                position: {},
                date: moment().add(13, 'days'),
                icon: null,
                text: null,
                additional: additional[1],
                markers: []
            }
        ]

        return (
            <div className={style.plan}>
                <PointStart placeholder="Начало пути" plan={plan} point={start} />
                {this.renderPlan(plan, end)}
                <PointEnd placeholder="Конец пути" plan={plan} point={end} />
            </div>
        )
    }

    renderPlan (plan = [], end) {
        if (!plan.length) {
            return (<div style={{ margin: '20px auto', width: '70%' }}><NoMarkers /></div>)
        }
        return _.map(plan, (item, key, items) => {
            const nextDate = _.get(items, [key + 1, 'date'], _.get(end, 'date'))
            return (
            <div key={key}>
                <div className={style.planCell} onClick={this.itemOnClick(item)}>{ this.renderItem(item) }</div>
                <PlanViewDays markers={item.markers} range={[item.date, nextDate]} />
            </div>)
        })
    }

    renderItem (item) {
        return (<div className={classnames(grd.Grid, grd['-middle'], style.planItem)}>
            <div className={classnames(grd.Cell, grd['-3of12'], style.planView)}>
                {this.renderAdditional(item)}
                {this.renderItemIcon(item)}
            </div>
            <div className={classnames(grd.Cell, grd['-9of12'], style.planText)}>
                <h3 className={style.planTextCaption}>{item.location}</h3>
                <p className={style.planTextDate}>{ this.formatDate(item.date) }</p>
            </div>
        </div>)
    }

    renderAdditional (item) {
        const { additional } = item

        if (additional) {
            return (<div className={style.planAdditional} style={{ background: additional }} />)
        }

        return
    }

    renderItemIcon (item) {
        const { type } = item
        const className = this.classNameItemIcon(type)
        return (
            <div className={classnames(className)}>
                {type === 'time' && this.formatDateTime(item.date)}
                <span className={classnames(icons.i, icons.iSm, icons.bus)} />
            </div>
        )
    }
}
