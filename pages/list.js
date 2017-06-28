/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import ListItem from '../widgets/ListItem';

import {PropTypes} from 'react';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    PixelRatio,
    Alert,
    ListView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    DeviceEventEmitter,
    NetInfo,
    AsyncStorage,
    Linking,
    Modal
} from 'react-native';

require('../imgs/GongKeJiDongDui3D.jpg');

//ffmpeg -i GongKeJiDongDui3D.mp4 -vf "scale=1920:-2" -c:v libx264 -c:a libfdk_aac -b:a 30k -b:v 3170k -ss 00:00:00.0 -t 00:00:30.0 GongKeJiDongDui3D.1080P.mp4
require('../movies/GongKeJiDongDui3D.4K.mp4');
require('../movies/GongKeJiDongDui3D.1080P.mp4');
export default class List extends Component {
    static propTypes = {
        onForward: PropTypes.func.isRequired,
    }

    videos() {
        return [
            {
                title: "攻壳机动队3D",
                img: "./assets/imgs/GongKeJiDongDui3D.jpg",
                resolutions: {
                    "1080P": "./assets/movies/GongKeJiDongDui3D.1080P.mp4",
                    "4K高清": "./assets/movies/GongKeJiDongDui3D.4K.mp4"
                }
            }
        ];
    }

    constructor(props) {
        super(props);
        this.list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.list.cloneWithRows(this.videos()),
            error: false,
        };
        this.curScrollY = 0;
    }

    refresh() {
        let listViewScrollView = this.refs.listView.getScrollResponder();
        listViewScrollView.scrollTo({y: this.curScrollY + 1});
    }

    renderVideoItem(item) {
        return <ListItem video={item} onClick={() => this.onVideoClick(item)}/>
    }

    onVideoClick(movie) {
        this.props.onForward(movie);
    }

    getSize() {
        var wndSize = Dimensions.get('window');
        var width = wndSize.width;
        var height = wndSize.height;
        if (width > height) {
            var tmp = height;
            height = width;
            width = tmp;
        }
        wndSize.width = width;
        wndSize.height = height;
        return wndSize;
    }

    render() {
        var wndSize = this.getSize();
        var listHeight = wndSize.height - 130;
        var listStyle = {
            width: wndSize.width,
            height: listHeight,
            backgroundColor: '#F8F8F8'
        };

        return (
            <View style={styles.container}>
                <ListView
                    ref="listView"
                    onScroll={(event) => {
                        this.curScrollY = event.nativeEvent.contentOffset.y;
                    }}
                    style={listStyle}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderVideoItem(rowData)}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={100}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#A369A1',
        flexDirection: 'column',
        backfaceVisibility: 'hidden'
    }
});