"use strict";

var _    = require("lodash");
var args = require("optimist").argv;
var argv = process.argv;


module.exports.getArgs = function () {
    return args;
};

module.exports.merge = function merge(defaults, config, callbacks) {

    var toMerge;
    var commandLineArgs = exports.getArgs();

    if (Object.keys(config).length) {
        toMerge = config;
    } else {
        toMerge = commandLineArgs;
    }

    var simpleMerged = _.merge(defaults, toMerge, function (a, b) {
        return _.isArray(a) ? _.union(a, b) : undefined;
    });

    if (callbacks && Object.keys(callbacks).length) {

        return exports.mergeOptions(defaults, config, callbacks);

    } else {

        return _.merge(simpleMerged, commandLineArgs);

    }
};

/**
 * @returns {Object}
 */
module.exports.mergeOptions = function (defaults, config, callbacks) {

    var args = exports.getArgs();

    Object.keys(callbacks).forEach(function (item) {

        // item == "files" etc
        var newValue;

        if (args && typeof args[item] !== "undefined") {
            newValue = args[item];
        } else {
            newValue = config[item];
        }

        if (callbacks[item] && typeof defaults[item] !== "undefined") {
            // there's a callback, a default ARG & a newValue
            defaults[item] = callbacks[item](defaults[item], newValue, args, config);
        }
    });

    return defaults;
};