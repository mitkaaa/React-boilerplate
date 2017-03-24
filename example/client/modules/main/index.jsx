import React from 'react'
import classnames from 'classnames'
// import { DateRangePicker } from 'react-dates'
import Autocomplete from 'common-autocomplete'

import style from './style.css'
import grd from 'common-grd'

export default class Main extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null

        }

        this.onDatesChange = this.onDatesChange.bind(this)
        this.onFocusChange = this.onFocusChange.bind(this)
    }

    onDatesChange ({ startDate, endDate }) {
        this.setState({ startDate, endDate })
    }

    onFocusChange (focusedInput) {
        this.setState({ focusedInput })
    }

    render () {
        const { focusedInput, startDate, endDate } = this.state
        return (
            <div>
                <div className={style.main}>
                    <div className={style.mainContainer}>
                        <div className={classnames(style.mainContainerHeight, grd.Grid, grd['-middle'])}>
                          <div className={classnames(grd.Cell, grd['-12of12'])}>
                             <form onSubmit={this.onSubmit}>
                                 <div className={classnames(style.border, style.autocomplete)}>
                                     <Autocomplete />
                                 </div>
                                 <div className={style.border}>
                                     <input type="text" name="to" placeholder="Куда" className={style.input} />
                                 </div>
                                 <div className={style.datePicker}>
                                    
                                </div>
                             </form>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
