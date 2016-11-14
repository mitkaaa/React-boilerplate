import React from 'react'
import PointStart from './point-start'

export default class PointEnd extends PointStart {
    render () {
        const { point, placeholder, plan } = this.props
        return (
            <div>
                {point && this.renderPointDistation(point, _.last(plan))}
                {this.renderPoints(point, placeholder)}
            </div>
        )
    }
}
