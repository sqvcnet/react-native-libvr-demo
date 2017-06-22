/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import Common from './modules/Common';
import Navigate from './pages/navigate';

export default class ReactNativeLibVRDemo extends Component {
    render() {
        return (
            <Navigate />
        );
    }
}

Common.inst.setIOS();
AppRegistry.registerComponent('ReactNativeLibVRDemo', () => ReactNativeLibVRDemo);
