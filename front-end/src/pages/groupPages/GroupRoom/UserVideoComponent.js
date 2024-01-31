import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

export default class UserVideoComponent extends Component {
    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div>
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><p>gd</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
