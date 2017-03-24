import React from 'react'
// import { store, Actions } from 'store'
import { connect } from 'react-redux'
import Immutable from 'immutable'
// import { bindActionCreators } from 'redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'
import Toolbar from './toolbar'
import TopPanel from './top-panel'
import Map from './map'

// import grd from 'common/common-grd'
import style from './style.css'

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is)
const getMap = createImmutableSelector(
    [(state, ownProps) => state.maps.get(ownProps.params.id)],
    (d) =>  d
)

@connect((state, ownProps) => {
    return {
        map: getMap(state, ownProps)
    }
})
export default class Maps extends React.Component {

    static propTypes = {
        children: React.PropTypes.node,
        params: React.PropTypes.object,
        map: React.PropTypes.object,
    }

    constructor (props) {
        super(props)

        this.state = {
            toolbarElement: 0
        }
        this.toolbarMarkersOnChange = this.toolbarMarkersOnChange.bind(this)
    }

    componentDidMount () {

    }

    componentWillReceiveProps () {
    }

    toolbarMarkersOnChange (toolbarElement) {
        this.setState({ toolbarElement })
    }

    //
    // onMapClick (e) {
    //     this.createMarkers({
    //         position: e.latLng,
    //         key: Date.now()
    //     })
    // }
    //
    // onDragMarkers (marker) {
    //     return (e) => {
    //         this.updateMarkers(_.extend({}, marker, {
    //             position: e.latLng
    //         }))
    //     }
    // }
    //
    // onRightClick (marker) {
    //     return () => {
    //         this.deleteMarkers(marker)
    //     }
    // }
    //
    // deleteMarkers (marker) {
    //     const { params } = this.props
    //     const markers = _.toArray(_.pickBy(this.state.markers, (m) => m._id !== marker._id))
    //     this.setState({ markers }, () => {
    //         this.actionMaps.deleteMarkers(params.id, marker._id)
    //     })
    // }
    //
    // createMarkers (marker) {
    //     const { params } = this.props
    //
    //     this.setState({
    //         markers: this.state.markers.concat([marker])
    //     }, () => {
    //         this.actionMaps.createMarkers(params.id, marker)
    //     })
    // }
    //
    // updateMarkers (marker) {
    //     const { params } = this.props
    //
    //     const markers = _.toArray(_.pickBy(this.state.markers, (m) => m._id !== marker._id))
    //     this.setState({
    //         markers: markers.concat([marker])
    //     }, () => {
    //         this.actionMaps.updateMarkers(params.id, marker)
    //     })
    // }

    render () {
        return (
            <div className={style.main}>
                <div className={style.mainLeftPanel}>
                    <Toolbar
                        toolbarOnChange={this.toolbarMarkersOnChange}
                        toolbarElement={this.state.toolbarElement} />
                </div>
                <div className={style.mainMap}>
                    <div className={style.mainMapTopPanel}>
                        <TopPanel
                            toolbarElement={this.state.toolbarElement}
                            toolbarOnChange={this.toolbarMarkersOnChange} />
                    </div>
                    <div className={style.mainMapLayout}>
                        <Map />
                    </div>
                </div>
            </div>
        )
    }
}
