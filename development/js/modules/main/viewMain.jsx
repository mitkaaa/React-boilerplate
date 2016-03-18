import React from 'react'

export default class Main extends React.Component {
    // Constructor
    constructor(props) {
        super(props);
        this.state = {name: props.name};
    }
    
    render() {
        return (
            <div>
                <h2>Главная страница 96aa234234f</h2>
            </div>
        );
    }
}