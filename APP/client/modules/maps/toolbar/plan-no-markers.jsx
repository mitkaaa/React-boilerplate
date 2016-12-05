import React from 'react'

import style from './style.css'

export default class NoMarkers extends React.Component {
    render () {
        return (
            <div style={{ textAlign: 'center' }}>
                <span className={style.toolbarPanelNoMarkersIcon} />
                <p className={style.toolbarPanelNoMarkersText}>Выберите первое место путешествия</p>
                <input type="text" className={style.toolbarPanelNoMarkersSearch} placeholder="Греция" />
            </div>
        )
    }
}
