var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "TimeSeriesChart/lib/react", "TimeSeriesChart/lib/d3", "TimeSeriesChart/lib/react-nvd3", "TimeSeriesChart/lib/nv.d3"], function (require, exports, React, d3, NVD3Chart, nv2) {
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
            var chart;
            var context = {
                getColor: function (iparam) {
                    var colors = d3.scale.category20().range().slice(10);
                    return colors[Math.floor(Math.random() * colors.length)];
                },
            };
            if (this.state.visible) {
                logger.debug(this.props.widgetId + ".render.visibleTrue");
                logger.debug(nv2);
                return (React.createElement("div", null, 
                    React.createElement("button", {onClick: this.changeVisibility}, " Click me"), 
                    React.createElement(NVD3Chart, {context: context, color: { name: 'getColor', type: 'function' }, tooltip: { enabled: true }, type: "discreteBarChart", datum: this.props.datum, x: "label", y: "value"})));
            }
            return (React.createElement("div", null, 
                React.createElement("button", {onClick: this.changeVisibility}, " Click me")
            ));
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