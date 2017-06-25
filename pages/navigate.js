/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';

import List from './list';
import Play from './play';
import OrientationPack from '../modules/OrientationPack';

export default class Navigate extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.state.index = 0;
    }

    render() {
        switch (this.state.index) {
            case 0:
                return <List
                    onForward={ (movie) => {
                        OrientationPack.lockToLandscape();
                        // react-native-orientation has no callback to decide when the lock finish
                        // so use a timeout to repair.
                        // For production, you maybe need to modify the Orientation.m source code.
                        setTimeout(() => {
                            this.setState({index: 1, param: movie});
                        }, 500);
                    }
                    }
                />;
                break;
            case 1:
                return <Play
                    movie={this.state.param}
                    onBack={ () => {
                        OrientationPack.lockToPortrait();
                        this.setState({index: 0});
                    }}
                />;
                break;
            default:
                break;
        }
    }
}
