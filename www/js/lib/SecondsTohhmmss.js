/**
 * Created by bcs1 on 2015-11-30.
 */
'use strict';

var SecondsTohhmmss = function SecondsTohhmmss(totalSeconds) {
    function round(value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp  = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    };
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    var seconds = totalSeconds - hours * 3600 - minutes * 60;

    // round seconds
    //seconds = Math.round(seconds * 100) / 100;
    //seconds = seconds.toFixed(2);
    seconds = round(seconds);
    var result = hours < 10 ? '0' + hours : hours;
    result += ':' + (minutes < 10 ? '0' + minutes : minutes);
    result += ':' + (seconds < 10 ? '0' + seconds : seconds);
    return result;
};

module.exports = SecondsTohhmmss;