/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Util from '../modules/Util';
import Common from '../modules/Common';
import VRPlayer from 'react-native-libvr';
import Show from '../modules/Show';
import {PropTypes} from 'react';
import React, {Component} from 'react';
import {
    Text,
    View,
    WebView,
    Image,
    Slider,
    NetInfo,
    Alert,
    Dimensions,
    StyleSheet,
    ScrollView,
    StatusBar,
    Linking,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

export default class Play extends Show {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.state.showControl = 0.0;
        this.state.showLoading = 0.0;
        this.state.play = false;
        this.state.pauseRenderer = false;
        this.state.close = false;
        this.state.progress = 0.0;
        this.state.cacheProgress = 0.0;
        this.state.progressPercent = Math.abs(0.000001).toFixed(2);
        this.state.mode = 3;
        this.state.resolution = '标清';

        this.movie = this.props.movie;
        this.state.uri = this.movie.resolutions['480P'];

        this.isReturned = false;

        this.modeArr = ['3d', '360', '360上下', '3d左右', '360单屏'];
        this.codecArr = ['软解', '硬解'];
    }

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        var self = this;

        setTimeout(() => {
            self.openAndPlay();
        }, 500);
    }

    openAndPlay() {
        var self = this;
        this.refs.vrplayer.open(this.state.uri, () => {
            self.refs.vrplayer.play();
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    returnList() {
        if (this.isReturned) {
            return;
        }
        this.isReturned = true;

        var self = this;
        this.refs.vrplayer.close(() => {
            setTimeout(() => {
                self.props.onBack();
            }, 200);
        });
    }

    _onPressPlayer() {
        var opacity = this.state.showControl;
        opacity = opacity == 0.0 ? 0.6 : 0.0;
        this.setState({showControl: opacity, showModes: false, showResolutions: false, showCodecs: false}, () => {
        });
    }

    changeResolution(newResolution) {
        this.setState({showResolutions: false}, () => {
            this.refs.vrplayer.setResolution(newResolution);
        });
    }

    changeMode(newMode) {
        var v = VRPlayer.MODE_360;
        switch (newMode) {
            case '3d':
                v = VRPlayer.MODE_3D;
                break;
            case '360上下':
                v = 2;
                break;
            case '3d左右':
                v = 3;
                break;
            case '360单屏':
                v = 4;
                break;
        }
        this.setState({showModes: false}, () => {
            this.refs.vrplayer.setMode(v);
        });
    }

    changeCodec(value) {
        var v = 1;
        switch (value) {
            case '软解':
                v = 0;
                break;
        }
        this.setState({showCodecs: false}, () => {
            this.refs.vrplayer.setCodec(v);
        });
    }

    verticalResolutions() {
        var verticalView = [];
        var resolution1 = this.state.resolution;
        var offset = 5;
        verticalView.push(
            <TouchableHighlight key='resolutionTouch1' onPress={() => {
                this.setState({showResolutions: !this.state.showResolutions, showModes: false, showCodec: false});
            }}>
                <Text key='resolution1' style={[styles.verticalText, {top: offset}]}>
                    {resolution1}
                </Text>
            </TouchableHighlight>
        );

        if (this.state.showResolutions) {
            var resolutions = JSON.parse(JSON.stringify(Object.keys(this.movie.resolutions)));
            resolutions.splice(resolutions.indexOf(resolution1), 1);
            var idx = resolutions.indexOf('极致高清');
            if (idx >= 0) {
                resolutions.splice(idx, 1);
            }
            for (var i in resolutions) {
                var resolution = resolutions[i];
                offset -= 30;
                i += 2;
                verticalView.push(
                    <TouchableHighlight key={'resolutionTouch' + i} onPress={function (self, resolution) {
                        return () => {
                            self.changeResolution(resolution);
                        }
                    }(this, resolution)}>
                        <Text key={'resolution' + i} style={[styles.verticalText, {top: offset, color: '#fff'}]}>
                            {resolution}
                        </Text>
                    </TouchableHighlight>);
            }
        }

        return verticalView;
    }

    verticalModes() {
        var verticalView = [];
        var mode1 = this.modeArr[this.state.mode];
        var offset = 5;
        verticalView.push(
            <TouchableHighlight key='modeTouch1' onPress={() => {
                this.setState({showModes: !this.state.showModes, showResolutions: false, showCodecs: false});
            }}>
                <Text key='mode1' style={[styles.verticalText, {top: offset}]}>
                    {mode1}
                </Text>
            </TouchableHighlight>
        );

        if (this.state.showModes) {
            var modes = ['3d', '360', '360上下', '3d左右', '360单屏'];
            modes.splice(modes.indexOf(mode1), 1);
            for (var i in modes) {
                var mode = modes[i];
                offset -= 30;
                i += 2;
                verticalView.push(
                    <TouchableHighlight key={'modeTouch' + i} onPress={function (self, mode) {
                        return () => {
                            self.changeMode(mode);
                        }
                    }(this, mode)}>
                        <Text key={'mode' + i} style={[styles.verticalText, {top: offset, color: '#fff'}]}>
                            {mode}
                        </Text>
                    </TouchableHighlight>);
            }
        }

        return verticalView;
    }

    verticalCodecs() {
        var verticalView = [];
        var mode1 = this.codecArr[this.state.codec];
        var offset = 5;
        verticalView.push(
            <TouchableHighlight key='codecTouch1' onPress={() => {
                this.setState({showCodecs: !this.state.showCodecs, showModes: false, showResolutions: false});
            }}>
                <Text key='mode1' style={[styles.verticalText, {top: offset}]}>
                    {mode1}
                </Text>
            </TouchableHighlight>
        );

        if (this.state.showCodecs) {
            var modes = ['软解', '硬解'];
            modes.splice(modes.indexOf(mode1), 1);
            for (var i in modes) {
                var mode = modes[i];
                offset -= 30;
                i += 2;
                verticalView.push(
                    <TouchableHighlight key={'codecTouch' + i} onPress={function (self, mode) {
                        return () => {
                            self.changeCodec(mode);
                        }
                    }(this, mode)}>
                        <Text key={'codec' + i} style={[styles.verticalText, {top: offset, color: '#fff'}]}>
                            {mode}
                        </Text>
                    </TouchableHighlight>);
            }
        }

        return verticalView;
    }

    render() {
        var wndSize = Dimensions.get('window');
        var width = wndSize.width;
        var height = wndSize.height;
        if (height > width) {
            var tmp = height;
            height = width;
            width = tmp;
        }
        var topHeight = 30;
        var bottomHeight = 40;
        var centerHeight = height - topHeight - bottomHeight - 26;
        var topStyle = {
            position: 'absolute',
            top: 26,
            left: 0,
            width: width,
            height: topHeight,
            // backgroundColor: '#000',
            opacity: this.state.showControl
        };
        var bottomStyle = {
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            top: height - bottomHeight,
            left: 0,
            width: width,
            height: bottomHeight,
            // backgroundColor: '#000',
            opacity: this.state.showControl
        };
        var stylePlayer = {
            width: width,
            height: height,
            top: 0,
            left: 0,
        };
        var styleVerticalView = {
            flex: 1,
            flexDirection: 'column',
        };
        var playerSliderStyle = {
            // width: width - 435,
            width: width - 380,
            height: 30,
            margin: 5,
            marginLeft: 0,
            marginRight: 0
        };
        var rotateDegreeSliderStyle = {
            position: 'absolute',
            top: centerHeight / 2 + topHeight - 15 + 26,
            left: -(centerHeight - 10) / 2 + 20,
            width: centerHeight - 10,
            height: 30,
            transform: [{rotate: "270deg"}],
            opacity: this.state.showControl
        };
        var degreeSliderStyle = {
            position: 'absolute',
            top: centerHeight / 2 + topHeight - 15 + 26,
            right: -(centerHeight - 10) / 2 + 20,
            width: centerHeight - 10,
            height: 30,
            transform: [{rotate: "90deg"}],
            opacity: this.state.showControl
        };
        var leftLoadingStyle = {
            position: 'absolute',
            left: width / 4 - 30,
            top: height / 2 - 30,
            opacity: this.state.showLoading,
            width: 30,
            height: 30
        };
        var rightLoadingStyle = {
            position: 'absolute',
            left: width * 3 / 4 - 30,
            top: height / 2 - 30,
            opacity: this.state.showLoading,
            width: 30,
            height: 30
        };

        var info = [];
        if (this.movie.source) {
            info = [<Text key='title' style={{color: '#fff', left: 50, top: 0, fontSize: 15, position: 'absolute'}}>
                {this.movie.title}
            </Text>,
                <Text key='source' style={{color: '#fff', left: 50, top: 16, fontSize: 11, position: 'absolute'}}>
                    {'来源：' + this.movie.source}
                </Text>];
        } else {
            info = [<Text key='title' style={{color: '#fff', left: 50, top: 6, fontSize: 15, position: 'absolute'}}>
                {this.movie.title}
            </Text>];
        }
        var verticalResolutions = this.verticalResolutions();
        var verticalModes = this.verticalModes();
        var verticalCodecs = this.verticalCodecs();
        return (
            <View style={{backgroundColor: 'transparent'}}>

                <StatusBar hidden={!this.state.showControl} barStyle="light-content" animated={false}
                           translucent={true}/>

                <VRPlayer
                    ref="vrplayer"
                    key={'play'}
                    style={stylePlayer}
                    src={this.state.uri}
                    play={this.state.play}
                    pauseRenderer={this.state.pauseRenderer}
                    close={this.state.close}
                    seek={this.state.seek}
                    codec={this.state.codec}
                    mode={this.state.mode}
                    rotateDegree={this.state.rotateDegree}
                    degree={this.state.degree}
                    onChange={(event: Event) => {
                        if (event.nativeEvent.message == 'onPause') {
                            console.log('onPause in play');
                            this.setState({play: false, pauseRenderer: true});
                        } else if (event.nativeEvent.message == 'onResume') {
                            console.log('onResume in play');
                            this.setState({
                                play: true,
                                showControl: 0.0,
                                pauseRenderer: false,
                                seek: this.state.progress
                            });
                        } else if (event.nativeEvent.message == 'onProgress') {
                            //console.log('onProgress in show');
                            this.playerDelegate.updateProgress(event.nativeEvent, (isEnd) => {
                                if (isEnd) {
                                    console.log("play end, return list");
                                    //服务端收到该请求后应该将this.movie.title置为已观看完状态，注意对应设备ID和对应手机号都应该置
                                    var self = this;

                                    Common.getNextVideo(this.movie.title, (movie) => {
                                        if (movie) {
                                            this.playerDelegate.close(() => {
                                                self.movie = movie;
                                                self.state.inited = false;
                                                self.openAndPlay();
                                            });
                                        } else {
                                            //self.props.onBack();
                                            self.playerDelegate.pause();
                                        }
                                    });
                                }
                            });
                        } else {
                        }
                    }}
                >
                </VRPlayer>

                {/*<TouchableHighlight onPress={() => {*/}
                {/*this._onPressPlayer();*/}
                {/*}}>*/}

                {/*</TouchableHighlight>*/}
                <View style={topStyle}>
                    <TouchableOpacity style={{width: 50, height: 30}} onPress={() => {
                        this.returnList();
                    }}>
                        <Image style={{width: 30, height: 30, margin: 0, marginLeft: 10, marginRight: 10}}
                               source={require('../icons/return.png')}>
                        </Image>
                    </TouchableOpacity>
                    {info}
                </View>
                <Slider
                    style={rotateDegreeSliderStyle}
                    minimumValue={0}
                    maximumValue={15}
                    step={1}
                    value={this.state.rotateDegree}
                    onValueChange={(value) => {
                        this.playerDelegate.setRotateDegree(value);
                    }}
                />
                <Image
                    style={leftLoadingStyle}
                    source={require('../icons/loading.gif')}/>
                <Image
                    style={rightLoadingStyle}
                    source={require('../icons/loading.gif')}/>
                <Slider
                    style={degreeSliderStyle}
                    minimumValue={10}
                    maximumValue={170}
                    step={1}
                    value={this.state.degree}
                    onValueChange={(value) => {
                        this.playerDelegate.setDegree(value);
                    }}
                />

                <View style={bottomStyle}>
                    <TouchableOpacity style={{width: 40, height: 40}} onPress={() => {
                        this.state.play ? this.setState({play: false}) : this.setState({play: true});
                    }}>
                        <Image style={{width: 30, height: 30, margin: 5}} source={
                            this.state.play ? require('../icons/pause.png') : require('../icons/play.png')
                        }>
                        </Image>
                    </TouchableOpacity>
                    <Text
                        style={{width: 60, color: '#fff', margin: 10, marginLeft: 0, marginRight: 0}}>
                        {Util.formatTime2(this.state.progress * this.state.totalTime)}
                    </Text>
                    <Slider
                        style={playerSliderStyle}
                        minimumValue={0}
                        maximumValue={1}
                        step={0.01}
                        value={this.state.progress}
                        onValueChange={(value) => {
                            this.state.seeking = true;
                            this.setState({progress: value});
                        }}
                        onSlidingComplete={(value) => {
                            this.playerDelegate.seek(value);
                            setTimeout(() => {
                                this.state.seeking = false;
                            }, 200);
                        }}
                    />
                    <Text
                        style={{color: '#fff', margin: 10, marginLeft: 5, marginRight: 5}}>
                        {Util.formatTime2(this.state.totalTime)}
                    </Text>
                    <View style={styleVerticalView}>
                        {verticalResolutions}
                    </View>
                    <View style={[styleVerticalView]}>
                        {verticalModes}
                    </View>
                    <View style={[styleVerticalView]}>
                        {verticalCodecs}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    verticalText: {
        position: 'absolute',
        width: 70,
        height: 30,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'gray'
    }

});
