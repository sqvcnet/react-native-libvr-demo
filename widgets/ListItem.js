/**
 * Created by cluo on 16/10/24.
 */

'use strict';

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    ToastAndroid,
    View,
    Alert,
    Dimensions
} from 'react-native';

class ListItem extends Component {
    render() {
        var winSize = Dimensions.get('window');
        var width = winSize.width;
        var height = winSize.height;
        if (width > height) {
            var tmp = height;
            height = width;
            width = tmp;
        }
        var height = 200;
        var dynamicStyle = {
            width: width
        };
        var maskStyle = {
            width: width,
            height: height,
            backgroundColor: 'black',
            opacity: 0.5
        };
        var titleStyle = {
            width: width,
            height: height,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: height/2 - 30
        };
        return (
            <View style={{backgroundColor:'#F8F8F8'}}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.onClick()}>
                    <View style={[styles.container, dynamicStyle]}>
                        <View style={styles.center}>
                            <Image style={[styles.icon, dynamicStyle]} source={{uri: this.props.video.img}}>
                                <View style={[styles.center, maskStyle]}>

                                </View>
                                <View style={titleStyle}>
                                    <Text style={[styles.title, dynamicStyle]}>{this.props.video.title}</Text>
                                    {/*<Text style={[styles.title, styles.subTitle, dynamicStyle]}>时长：{this.props.video.info.duration}</Text>*/}
                                </View>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    onClick() {
        this.props.onClick();
    }
}

const styles = StyleSheet.create({
    container:{
        borderColor:'#E2E9EB',
        flexDirection:'row'
    },
    icon:{
        height:200,
        justifyContent:'center',
        alignItems:'center'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:18,
        color: '#FDFCFC',
        opacity: 1,
        fontWeight: 'bold',
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'transparent',
        //textShadowOffset:{width:0.5,height:0.5},
        //textShadowColor:'black'
    },
    subTitle:{
        fontSize: 13,
        marginTop: 20,
        fontWeight: 'normal',
        color: '#E2E2E4'
    }
});

module.exports = ListItem;
