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

require('../imgs/WeiLaiTiYu3D.jpg');
//ffmpeg -hwaccel videotoolbox -i WeiLaiTiYu3D.x264_1080p.mp4 -vf "scale=480:-2" -c:v libx264 -profile:v main -level 1 -c:a libfdk_aac -b:v 120k -b:a 30k WeiLaiTiYu3D.x264_480x480.mp4
require('../movies/WeiLaiTiYu3D.x264_480x480.mp4');
export default class List extends Component {
    static propTypes = {
        onForward: PropTypes.func.isRequired,
    }

    videos() {
        return [
            {
                title: "未来体育3D",
                img: "./assets/imgs/WeiLaiTiYu3D.jpg",
                resolutions: {
                    "480P": "./assets/movies/WeiLaiTiYu3D.x264_480x480.mp4",
                    "1080P": "http://east2.oss-cn-shanghai.aliyuncs.com/%E5%BF%85%E7%9C%8B/%E6%9C%AA%E6%9D%A5%E4%BD%93%E8%82%B23D/1456132699.x264_1080p.mp4"
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