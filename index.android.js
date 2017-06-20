/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import Common from './Common';
import Navigate from './navigate';

export default class ReactNativeLibVRDemo extends Component {
    render() {
        return (
            <Navigate />
        );
    }
}

Common.inst.setAndroid();
AppRegistry.registerComponent('ReactNativeLibVRDemo', () => ReactNativeLibVRDemo);
