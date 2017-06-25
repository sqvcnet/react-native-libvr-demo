/**
 * Created by shanqiang on 16/5/31.
 */
'use strict';

import Common from './Common';
import Orientation from 'react-native-orientation';

export default class OrientationPack {
    static once = true;

    constructor(props) {

    }

    static lockToPortrait() {
        if (OrientationPack.once) {
            Orientation.lockToPortrait();
            OrientationPack.once = false;
        } else {
            Orientation.lockToLandscape();
            Orientation.lockToPortrait();
        }
    }

    static lockToLandscape() {
        if (Common.platform == 'android') {
            Orientation.getOrientation((error, orientation) => {
                if (orientation != 'PORTRAIT') {
                    Orientation.lockToPortrait();
                }

                Orientation.lockToLandscapeRight();
            });
            return;
        }
        Orientation.getSpecificOrientation((error, orientation) => {
            if (orientation != 'PORTRAIT' && orientation != 'PORTRAITUPSIDEDOWN') {
                Orientation.lockToPortrait();
            }

            if (orientation == 'LANDSCAPE-LEFT') {
                Orientation.lockToLandscapeLeft();
            } else if (orientation == 'LANDSCAPE-RIGHT') {
                Orientation.lockToLandscapeRight();
            } else {
                Orientation.lockToLandscape();
            }
        });
    }
}
