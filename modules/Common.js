/**
 * Created by shanqiang on 16/5/31.
 */
'use strict';

export default class Common {
    static inst = new Common();

    constructor() {
        this.platform = 'ios';
    }

    setIOS() {
        this.platform = 'ios';
    }

    setAndroid() {
        this.platform = 'android';
    }
}
