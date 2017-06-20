/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Navigator,
} from 'react-native';

import List from './list';
import Play from './play';
import OrientationPack from './OrientationPack';

export default class Navigate extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.state.startIndex = 0;
        this.state.needLock = true;
    }

    navigate(route, navigator) {
        var self = this;
        switch (route.index) {
            case 0:
                if (this.state.needLock == true) {
                    //进入其它页面的时候不应该对最下面的List页面锁屏
                    //只有回到List页面时才需要锁屏
                    OrientationPack.lockToPortrait();
                } else {
                    this.state.needLock = true;
                }
                return <List
                    onForward={ (next, prop, list) => {
                        this.navigateTo(navigator, next, prop, list);
                    }
                    }
                />;
                break;
            case 1:
                return <Play
                    movie={route.movie}
                    onBack={ () => {
                        navigator.pop();
                        OrientationPack.lockToPortrait();
                        this.state.needLock = false;
                    }}
                />;
                break;
            default:
                console.log('default route.index: ' + route.index);
                break;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{index: this.state.startIndex}}
                renderScene={(route, navigator) => {
                    return this.navigate(route, navigator);
                }
                }
            />
        );
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
