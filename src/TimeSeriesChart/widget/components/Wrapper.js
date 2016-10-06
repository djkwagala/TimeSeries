var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "TimeSeriesChart/lib/react", "TimeSeriesChart/lib/react-nvd3"], function (require, exports, React, NVD3Chart) {
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
            var datum = this.getDatum();
            if (!this.props.dataLoaded) {
                logger.debug(this.props.widgetId + ".render dataLoaded");
                chart = React.createElement(NVD3Chart, {
                    type: "lineChart",
                    datum: datum,
                });
            }
            return (React.createElement("div", null, chart));
        };
        Wrapper.prototype.getDatum = function () {
            logger.debug(this.props.seriesData);
            var seriesConfig = this.props.seriesData;
            var returnDatum = [];
            for (var count = 0; count < seriesConfig.length; count++) {
                var serieConfig = seriesConfig[count];
                var serieData = serieConfig.data.map(function (seriePoint) {
                    return [seriePoint.xPoint, seriePoint.yPoint];
                });
                var serie = {
                    key: serieConfig.key,
                    values: serieData
                };
                returnDatum.push(serie);
            }
            return returnDatum;
        };
        Wrapper.defaultProps = {
            widgetId: "",
            dataLoaded: false
        };
        return Wrapper;
    }(React.Component));
    exports.Wrapper = Wrapper;
});
//# sourceMappingURL=Wrapper.js.map