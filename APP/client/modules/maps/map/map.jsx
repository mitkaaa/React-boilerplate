import React from 'react'
import GoogleMap from 'common-google-map'

import WindowDescription from 'common-window-description'


// import grd from 'common/common-grd'
import style from './style.css'

export default class Map extends React.Component {

    static propTypes = {
        // children: React.PropTypes.node,
        // params: React.PropTypes.object,
        // map: React.PropTypes.object,
    }

    render () {
        return (
            <div className={style.map}>
                <GoogleMap />
                <WindowDescription />
            </div>
        )
    }
}
