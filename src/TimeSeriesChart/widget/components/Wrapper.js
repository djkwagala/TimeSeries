var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "TimeSeriesChart/lib/react", "TimeSeriesChart/lib/d3", "TimeSeriesChart/lib/react-nvd3"], function (require, exports, React, d3, NVD3Chart) {
    "use strict";
    var Wrapper = (function (_super) {
        __extends(Wrapper, _super);
        function Wrapper(props) {
            _super.call(this, props);
            logger.debug(this.props.widgetId + ".constructor");
            this.getDatum = this.getDatum.bind(this);
        }
        Wrapper.prototype.componentWillMount = function () {
            logger.debug(this.props.widgetId + " .componentWillMount");
            this.checkConfig();
        };
        Wrapper.prototype.checkConfig = function () {
        };
        Wrapper.prototype.render = function () {
            logger.debug(this.props.widgetId + ".render");
            var chart = React.createElement("div", null, "Loading ...");
            var props = this.props;
            var datum = this.getDatum();
            var xFormat = props.xAxisFormat ? props.xAxisFormat : "%d-%b-%y";
            var yFormat = props.yAxisFormat ? props.yAxisFormat : "";
            if (this.props.dataLoaded) {
                logger.debug(this.props.widgetId + ".render dataLoaded");
                chart = React.createElement(NVD3Chart, {
                    type: "lineChart",
                    datum: datum,
                    x: "xPoint",
                    y: "yPoint",
                    xAxis: {
                        axisLabel: this.props.xAxisLabel,
                        tickFormat: function (dataPoint) {
                            return d3.time.format(xFormat)(new Date(dataPoint));
                        },
                    },
                    yAxis: {
                        axisLabel: this.props.yAxisLabel,
                        tickFormat: function (dataPoint) {
                            if (yFormat) {
                                return d3.format(yFormat)(dataPoint);
                            }
                            else {
                                return dataPoint;
                            }
                        },
                    },
                    duration: 300,
                    useInteractiveGuideline: props.useInteractiveGuidelines
                });
            }
            return (React.createElement("div", null, chart));
        };
        Wrapper.prototype.getDatum = function () {
            logger.debug(this.props.widgetId + ".getDatum");
            var seriesConfig = this.props.seriesConfig;
            var returnDatum = [];
            for (var count = 0; count < seriesConfig.length; count++) {
                var serieConfig = seriesConfig[count];
                var serie = {
                    key: serieConfig.serieKey,
                    values: serieConfig.serieData
                };
                returnDatum.push(serie);
            }
            logger.debug(this.props.widgetId + ".getDatum Data: ");
            logger.debug(returnDatum);
            return returnDatum;
        };
        Wrapper.defaultProps = {
            widgetId: "",
        };
        return Wrapper;
    }(React.Component));
    exports.Wrapper = Wrapper;
});
//# sourceMappingURL=Wrapper.js.map