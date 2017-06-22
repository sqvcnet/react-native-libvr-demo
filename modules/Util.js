/**
 * Created by shanqiang on 16/5/31.
 */
'use strict';

export default class Util {
    static isNumber = {
        '0': true,
        '1': true,
        '2': true,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': true,
        '8': true,
        '9': true,
        '一': true,
        '二': true,
        '三': true,
        '四': true,
        '五': true,
        '六': true,
        '七': true,
        '八': true,
        '九': true,
        '十': true,
        '百': true
    }

    static toInt(str) {
      for (var idx in str) {
          if (Util.isNumber[str[idx]]) {
              break;
          }
      }
      str = str.substr(idx);
      var ret = NaN;
      switch (str) {
          case '零':
              return 0;
          case '一':
              return 1;
          case '二':
              return 2;
          case '三':
              return 3;
          case '似':
          case '是':
          case '适':
          case '四':
              return 4;
          case '五':
              return 5;
          case '六':
              return 6;
          case '齐':
          case '七':
              return 7;
          case '吧':
              return 8;
          case '八':
              return 8;
          case '酒':
          case '就':
          case '九':
              return 9;
          case '时':
          case '十':
              return 10;
          case '时一':
          case '十一':
              return 11;
          case '十二':
              return 12;
          case '十三':
              return 13;
          case '十四':
              return 14;
          case '十五':
              return 15;
          case '十六':
              return 16;
          case '十七':
              return 17;
          case '十八':
              return 18;
          case '十九':
              return 19;
          case '二十':
              return 20;
          case '三十':
              return 30;
          case '四十':
              return 40;
          case '五十':
              return 50;
          case '六十':
              return 60;
          case '七十':
              return 70;
          case '八十':
              return 80;
          case '九十':
              return 90;
          case '一百':
              return 100;
          default:
              ret = parseInt(str);
      }
      if (isNaN(ret)) {
          return -1;
      }
      return ret;
    }

    static formatTime(seconds) {
        var ret = '';
        var hours = Math.floor(seconds / 60 / 60);
        if (hours > 0) {
            ret += '' + hours + '小时';
        }
        var minutes = Math.floor(seconds / 60) % 60;
        if (minutes > 0) {
            ret += '' + minutes + '分';
        }
        var seconds = Math.floor(seconds) % 60;
        if (seconds > 0) {
            ret += '' + seconds + '秒';
        }
        return ret;
    }

    static formatTime2(seconds) {
        var ret = '';
        var hours = Math.floor(seconds / 60 / 60);
        var minutes = Math.floor(seconds / 60) % 60;
        var seconds = Math.floor(seconds) % 60;

        if (hours>0) {
            return ("0" + hours).slice(-2) + ':' +
                ("0" + minutes).slice(-2) + ':' +
                ("0" + seconds).slice(-2);
        } else {
            return ("0" + minutes).slice(-2) + ':' +
                ("0" + seconds).slice(-2);
        }
    }

    static getDateTime = function() {
        var date = new Date();
        return date.getFullYear() + '-' +
            ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
            ("0" + (date.getDate())).slice(-2) + ' ' +
            ("0" + date.getHours()).slice(-2) + ':' +
            ("0" + date.getMinutes()).slice(-2) + ':' +
            ("0" + date.getSeconds()).slice(-2);
    }

    static log = function(msg, cb) {
        var datetime = Util.getDateTime();
        var logContent = "[" + datetime + "]\t" + msg + "\n";
        console.log(logContent);
        cb ? cb() : null;
    }

    /**
     * generate a random number [low, high)
     * @param low
     * @param high
     * @returns {number}
     */
    static random = function(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}
