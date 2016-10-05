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
            this.state = {
                visible: this.props.visible,
            };
            this.changeVisibility = this.changeVisibility.bind(this);
        }
        Wrapper.prototype.changeVisibility = function () {
            logger.debug(this.props.widgetId + ".changeVisibility");
            this.setState({ visible: !this.state.visible });
        };
        Wrapper.prototype.render = function () {
            logger.debug(this.props.widgetId + ".render");
            var chart = React.createElement("div", null, "Loading ...");
            var context = {
                getColor: function (parameter) {
                    var colors = d3.scale.category20().range().slice(10);
                    return colors[Math.floor(Math.random() * colors.length)];
                },
            };
            if (this.state.visible) {
                logger.debug(this.props.widgetId + ".render.visibleTrue");
                chart = React.createElement(NVD3Chart, {
                    type: "linePlusBarChart",
                    datum: this.props.datum,
                    x: function (data_, iterator) { return iterator; },
                    y: function (data_, iterator) { return data_[1]; }
                });
            }
            return (React.createElement("div", null, 
                React.createElement("button", {onClick: this.changeVisibility}, "Click me "), 
                chart));
        };
        Wrapper.defaultProps = {
            widgetId: "",
            datum: [],
            visible: true
        };
        return Wrapper;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Wrapper;
});
//# sourceMappingURL=Wrapper.js.map