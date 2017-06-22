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
        this.state.page = null;
        this.state.index = 0;
        this.state.needLock = true;
    }

    navigate() {
        switch (this.state.index) {
            case 0:
                if (this.state.needLock == true) {
                    //进入其它页面的时候不应该对最下面的List页面锁屏
                    //只有回到List页面时才需要锁屏
                    OrientationPack.lockToPortrait();
                } else {
                    this.state.needLock = true;
                }
                return <List
                    onForward={ (movie) => {
                        this.setState({index: 1, param: movie});
                    }
                    }
                />;
                break;
            case 1:
                return <Play
                    movie={this.state.param}
                    onBack={ () => {
                        OrientationPack.lockToPortrait();
                        this.setState({needLock: false, index: 0});
                    }}
                />;
                break;
            default:
                break;
        }
    }

    render() {
        return this.navigate();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
