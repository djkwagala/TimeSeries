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
                widgetId: this.id + "_Wrapper",
                seriesData: this.data,
                dataLoaded: !this.dataLoaded
            };
        };
        TimeSeriesWrapper.prototype.postCreate = function () {
            logger.debug(this.id + ".postCreate");
            this.data = [];
            this.updateRendering();
        };
        TimeSeriesWrapper.prototype.update = function (object, callback) {
            var _this = this;
            logger.debug(this.id + ".update");
            this.contextObject = object;
            this.updateData(function () {
                _this.dataLoaded = true;
                _this.updateRendering(callback);
            });
            this.resetSubscriptions();
        };
        TimeSeriesWrapper.prototype.uninitialize = function () {
            logger.debug(this.id + ".uninitialize");
            ReactDOM.unmountComponentAtNode(this.domNode);
            this.unsubscribeHandles();
        };
        TimeSeriesWrapper.prototype.mxCreateProgressObject = function (callback) {
            logger.debug(this.id + ".createProgressObject");
        };
        TimeSeriesWrapper.prototype.updateData = function (callback) {
            var _this = this;
            logger.debug(this.id + ".getCarouselData");
            var serie = this.seriesConfig[0];
            if (serie.serieSource === "xpath" && serie.serieEntity) {
                this.fetchDataFromXpath(serie.serieEntity, serie.entityConstraint, function (data) {
                    _this.setDataFromObjects(data, serie);
                    callback();
                });
            }
            else if (serie.serieSource === "microflow" && serie.dataSourceMicroflow) {
            }
            else {
                logger.error(this.id + ".updateData unknown source or error in widget configuration");
                callback();
            }
        };
        TimeSeriesWrapper.prototype.updateRendering = function (callback) {
            logger.debug(this.id + ".updateRendering");
            logger.debug(this.id + ".beforeReactDOM");
            ReactDOM.render(React.createElement(Wrapper_1.Wrapper, __assign({}, this.createProps())), this.domNode);
            mxLang.nullExec(callback);
        };
        TimeSeriesWrapper.prototype.unsubscribeHandles = function () {
            if (this.handles) {
                for (var _i = 0, _a = this.handles; _i < _a.length; _i++) {
                    var handle = _a[_i];
                    mx.data.unsubscribe(handle);
                }
                this.handles = [];
            }
        };
        TimeSeriesWrapper.prototype.resetSubscriptions = function () {
            var _this = this;
            logger.debug(this.id + "._resetSubscriptions");
            this.unsubscribeHandles();
            if (this.contextObject) {
                var objectHandle = mx.data.subscribe({
                    callback: function (guid) {
                        logger.debug(_this.id + "._resetSubscriptions object subscription update MxId " + guid);
                        _this.updateRendering();
                    },
                    guid: this.contextObject.getGuid(),
                });
                this.handles = [objectHandle];
            }
        };
        TimeSeriesWrapper.prototype.fetchDataFromXpath = function (serieEntity, entityConstraint, callback) {
            var _this = this;
            logger.debug(this.id + ".fetchDataFromXpath");
            if (this.contextObject) {
                var guid = this.contextObject ? this.contextObject.getGuid() : "";
                var constraint = entityConstraint.replace("[%CurrentObject%]", guid);
                var xpathString = "//" + serieEntity + constraint;
                mx.data.get({
                    callback: callback.bind(this),
                    error: function (error) {
                        logger.error(_this.id + ": An error occurred while retrieving items: " + error);
                    },
                    xpath: xpathString,
                });
            }
            else {
                logger.debug(this.id + ".fetchDataFromXpath empty context");
                callback([]);
            }
        };
        TimeSeriesWrapper.prototype.setDataFromObjects = function (objects, serieConfig) {
            logger.debug(this.id + ".getCarouselItemsFromObject");
            logger.debug(objects);
            var serie = {};
            serie.data = objects.map(function (itemObject) {
                logger.debug(itemObject);
                return {
                    xPoint: itemObject.get(serieConfig.serieXAttribute),
                    yPoint: parseFloat(itemObject.get(serieConfig.serieYAttribute)),
                };
            });
            serie.key = serieConfig.serieKey;
            this.data.push(serie);
        };
        return TimeSeriesWrapper;
    }(_WidgetBase));
    exports.TimeSeriesWrapper = TimeSeriesWrapper;
    var dojoTimeSeries = dojoDeclare("TimeSeriesChart.widget.TimeSeriesChart", [_WidgetBase], (function (Source) {
        var result = {};
        result.constructor = function () {
            logger.debug(this.id + ".constructor dojo");
            this.dataLoaded = true;
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
//# sourceMappingURL=TimeSeriesChart.js.map