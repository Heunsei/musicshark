import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }


    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }

}
