var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "dojo/_base/declare", "mxui/widget/_WidgetBase", "mendix/lang", "TimeSeriesChart/lib/react", "TimeSeriesChart/lib/react-dom", "./components/Wrapper"], function (require, exports, dojoDeclare, _WidgetBase, mxLang, React, ReactDOM, Wrapper_1) {
    "use strict";
    var TimeSeriesWrapper = (function (_super) {
        __extends(TimeSeriesWrapper, _super);
        function TimeSeriesWrapper(args, elem) {
            _super.call(this);
            return new dojoTimeSeries(args, elem);
        }
        TimeSeriesWrapper.prototype.createProps = function () {
            return {
                datum: this.testData,
                widgetId: this.id + "_Wrapper",
            };
        };
        TimeSeriesWrapper.prototype.postCreate = function () {
            logger.debug(this.id + ".postCreate !");
            this.loadData = this.loadData.bind(this);
        };
        TimeSeriesWrapper.prototype.loadData = function () {
            logger.debug(this.id + ".loadData");
            this.testData = [
                {
                    key: "Cumulative Return",
                    values: [
                        {
                            "label": "A",
                            "value": 29.765957771107
                        },
                        {
                            "label": "B",
                            "value": 0
                        },
                        {
                            "label": "C",
                            "value": 32.807804682612
                        },
                        {
                            "label": "D",
                            "value": 196.45946739256
                        },
                        {
                            "label": "E",
                            "value": 0.19434030906893
                        },
                        {
                            "label": "F",
                            "value": 98.079782601442
                        },
                        {
                            "label": "G",
                            "value": 13.925743130903
                        },
                        {
                            "label": "H",
                            "value": 5.1387322875705
                        }
                    ]
                }
            ];
        };
        TimeSeriesWrapper.prototype.update = function (obj, callback) {
            logger.debug(this.id + ".update");
            this.contextObj = obj;
            this.updateRendering(callback);
            this._resetSubscriptions();
        };
        TimeSeriesWrapper.prototype.uninitialize = function () {
            logger.debug(this.id + ".uninitialize");
            this._unsubscribe();
        };
        TimeSeriesWrapper.prototype.mxUpdateProgressObject = function () {
            logger.debug(this.id + ".updateProgress");
        };
        TimeSeriesWrapper.prototype.formSave = function (callback) {
            this.mxform.save(callback, function (error) {
                if (!(error instanceof mendix.lib.ValidationError)) {
                    mx.onError(error);
                }
            });
        };
        TimeSeriesWrapper.prototype.formValidate = function (callback) {
            this.mxform.validate.bind(this.mxform);
            this.mxform.validate(callback);
        };
        TimeSeriesWrapper.prototype.mxCreateProgressObject = function (callback) {
            logger.debug(this.id + ".createProgressObject");
        };
        TimeSeriesWrapper.prototype.updateRendering = function (callback) {
            logger.debug(this.id + ".updateRendering");
            if (this.contextObj !== null) {
                this.loadData();
                logger.debug(this.id + ".beforeReactDOM");
                ReactDOM.render(React.createElement(Wrapper_1.default, __assign({}, this.createProps())), this.domNode);
            }
            mxLang.nullExec(callback);
        };
        TimeSeriesWrapper.prototype.updateProgress = function () {
            logger.debug(this.id + ".updateProgress");
        };
        TimeSeriesWrapper.prototype._unsubscribe = function () {
            if (this.handles) {
                for (var _i = 0, _a = this.handles; _i < _a.length; _i++) {
                    var handle = _a[_i];
                    mx.data.unsubscribe(handle);
                }
                this.handles = [];
            }
        };
        TimeSeriesWrapper.prototype._resetSubscriptions = function () {
            var _this = this;
            logger.debug(this.id + "._resetSubscriptions");
            this._unsubscribe();
            if (this.contextObj && this.graphSourceURL) {
                var attrHandle = mx.data.subscribe({
                    attr: this.graphSourceURL,
                    callback: function (guid, attr, attrValue) {
                        logger.debug(_this.id + "._resetSubscriptions attribute '" + attr + "' subscription update MxId " + guid);
                        _this.updateRendering();
                    },
                    guid: this.contextObj.getGuid(),
                });
                var objectHandle = mx.data.subscribe({
                    callback: function (guid) {
                        logger.debug(_this.id + "._resetSubscriptions object subscription update MxId " + guid);
                        _this.updateRendering();
                    },
                    guid: this.contextObj.getGuid(),
                });
                this.handles = [attrHandle, objectHandle];
            }
        };
        return TimeSeriesWrapper;
    }(_WidgetBase));
    exports.TimeSeriesWrapper = TimeSeriesWrapper;
    var dojoTimeSeries = dojoDeclare("TimeSeriesChart.widget.TimeSeriesChart", [_WidgetBase], (function (Source) {
        var result = {};
        result.constructor = function () {
            logger.debug(this.id + ".constructor dojo");
        };
        for (var i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    }(TimeSeriesWrapper)));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TimeSeriesWrapper;
});
