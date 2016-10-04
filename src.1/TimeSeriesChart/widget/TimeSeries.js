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
define(["require", "exports", "dojo/_base/declare", "mxui/widget/_WidgetBase", "mendix/lang", "TimeSeries/lib/react", "TimeSeries/lib/react-dom", "./components/TimeSeriesChart"], function (require, exports, dojoDeclare, _WidgetBase, mxLang, React, ReactDOM, TimeSeriesChart_1) {
    "use strict";
    var TimeSeriesTimeSeriesChart = (function (_super) {
        __extends(TimeSeriesTimeSeriesChart, _super);
        function TimeSeriesTimeSeriesChart(args, elem) {
            _super.call(this);
            return new exports.dojoTimeSeries(args, elem);
        }
        TimeSeriesTimeSeriesChart.prototype.createProps = function () {
            return {
                datum: this.testData,
                widgetId: this.id + "_TimeSeriesChart"
            };
        };
        TimeSeriesTimeSeriesChart.prototype.postCreate = function () {
            logger.debug(this.id + ".postCreate !");
            this.loadData = this.loadData.bind(this);
        };
        TimeSeriesTimeSeriesChart.prototype.loadData = function () {
            logger.debug(this.id + ".loadData");
            this.testData = [{
                    key: "Cumulative Return",
                    values: [
                        {
                            "label": "A",
                            "value": -29.765957771107
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
                            "value": -98.079782601442
                        },
                        {
                            "label": "G",
                            "value": -13.925743130903
                        },
                        {
                            "label": "H",
                            "value": -5.1387322875705
                        }
                    ]
                }];
        };
        TimeSeriesTimeSeriesChart.prototype.update = function (obj, callback) {
            logger.debug(this.id + ".update");
            this.contextObj = obj;
            this.updateRendering(callback);
            this._resetSubscriptions();
        };
        TimeSeriesTimeSeriesChart.prototype.uninitialize = function () {
            logger.debug(this.id + ".uninitialize");
            this._unsubscribe();
        };
        TimeSeriesTimeSeriesChart.prototype.mxUpdateProgressObject = function () {
            logger.debug(this.id + ".updateProgress");
        };
        TimeSeriesTimeSeriesChart.prototype.formSave = function (callback) {
            this.mxform.save(callback, function (error) {
                if (!(error instanceof mendix.lib.ValidationError)) {
                    mx.onError(error);
                }
            });
        };
        TimeSeriesTimeSeriesChart.prototype.formValidate = function (callback) {
            this.mxform.validate.bind(this.mxform);
            this.mxform.validate(callback);
        };
        TimeSeriesTimeSeriesChart.prototype.mxCreateProgressObject = function (callback) {
            logger.debug(this.id + ".createProgressObject");
        };
        TimeSeriesTimeSeriesChart.prototype.updateRendering = function (callback) {
            logger.debug(this.id + ".updateRendering");
            if (this.contextObj !== null) {
                this.loadData();
                logger.debug(this.id + ".beforeReactDOM");
                ReactDOM.render(React.createElement(TimeSeriesChart_1.default, __assign({}, this.createProps())), this.domNode);
            }
            mxLang.nullExec(callback);
        };
        TimeSeriesTimeSeriesChart.prototype.updateProgress = function () {
            logger.debug(this.id + ".updateProgress");
        };
        TimeSeriesTimeSeriesChart.prototype._unsubscribe = function () {
            if (this.handles) {
                for (var _i = 0, _a = this.handles; _i < _a.length; _i++) {
                    var handle = _a[_i];
                    mx.data.unsubscribe(handle);
                }
                this.handles = [];
            }
        };
        TimeSeriesTimeSeriesChart.prototype._resetSubscriptions = function () {
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
        return TimeSeriesTimeSeriesChart;
    }(_WidgetBase));
    exports.TimeSeriesTimeSeriesChart = TimeSeriesTimeSeriesChart;
    exports.dojoTimeSeries = dojoDeclare("TimeSeries.widget.TimeSeries", [_WidgetBase], (function (Source) {
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
    }(TimeSeriesTimeSeriesChart)));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TimeSeriesTimeSeriesChart;
});
//# sourceMappingURL=TimeSeries.js.map