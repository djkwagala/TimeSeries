var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "TimeSeries/lib/react", "TimeSeries/lib/d3", "TimeSeries/lib/react-nvd3"], function (require, exports, React, d3, NVD3Chart) {
    "use strict";
    var TimeSeriesChart = (function (_super) {
        __extends(TimeSeriesChart, _super);
        function TimeSeriesChart(props) {
            _super.call(this, props);
            logger.debug(this.props.widgetId + ".constructor");
            this.state = {
                visible: this.props.visible,
            };
            this.changeVisibility = this.changeVisibility.bind(this);
        }
        TimeSeriesChart.prototype.changeVisibility = function () {
            logger.debug(this.props.widgetId + ".changeVisibility");
            this.setState({ visible: !this.state.visible });
        };
        TimeSeriesChart.prototype.render = function () {
            logger.debug(this.props.widgetId + ".render");
            var chart;
            var context = {
                getColor: function (iparam) {
                    var colors = d3.scale.category20().range().slice(10);
                    return colors[Math.floor(Math.random() * colors.length)];
                },
            };
            if (this.state.visible) {
                logger.debug(this.props.widgetId + ".render.visibleTrue");
                return (React.createElement("div", null, 
                    React.createElement("button", {onClick: this.changeVisibility}, " Click me"), 
                    React.createElement(NVD3Chart, {context: context, color: { name: 'getColor', type: 'function' }, tooltip: { enabled: true }, type: "discreteBarChart", datum: this.props.datum, x: "label", y: "value"})));
            }
            return (React.createElement("div", null, 
                React.createElement("button", {onClick: this.changeVisibility}, " Click me")
            ));
        };
        TimeSeriesChart.defaultProps = {
            widgetId: "",
            datum: [],
            visible: true
        };
        return TimeSeriesChart;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TimeSeriesChart;
});
