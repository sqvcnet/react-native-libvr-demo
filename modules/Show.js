/**
 * Created by cluo on 16/11/12.
 */
import React, { Component } from 'react';
import KeepAwake from 'react-native-keep-awake';
import {
    DeviceEventEmitter,
} from 'react-native';

export default class Show extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.onResumeListener = null;
        this.onPauseListener = null;
    }

    componentWillMount() {
        KeepAwake.activate();

        var self = this;

        this.onResumeListener = DeviceEventEmitter.addListener(
            'System.onResume',
            () => {
                self.isSystemPause = false;
            });
        this.onPauseListener = DeviceEventEmitter.addListener(
            'System.onPause',
            () => {
                self.isSystemPause = true;
            });
    }

    componentWillUnmount() {
        if (this.onResumeListener != null) {
            this.onResumeListener.remove();
            this.onResumeListener = null;
        }
        if (this.onPauseListener != null) {
            this.onPauseListener.remove();
            this.onPauseListener = null;
        }

        KeepAwake.deactivate();
    }

    render() {
        return null;
    }
};
