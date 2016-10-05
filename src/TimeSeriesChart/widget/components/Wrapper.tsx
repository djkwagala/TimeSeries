

import * as React from "TimeSeriesChart/lib/react";
import ReactDOM  = require ("TimeSeriesChart/lib/react-dom");
import * as d3 from "TimeSeriesChart/lib/d3";
import * as NVD3Chart from "TimeSeriesChart/lib/react-nvd3";
import ModelProps from "../../TimeSeriesChart.d";
// import * as nv2 from "TimeSeriesChart/lib/nv.d3";
// import nv2 = require("TimeSeriesChart/lib/nv.d3");


interface IWrapperProps {
    datum?: Array<{}>;
    visible?: boolean;
    widgetId?: string;
}

interface IWrapperState {
    visible?: boolean;
}
export interface Data {
    xPoint: number;
    yPoint: number;
}
export interface Serie {
    data: Data[];
}
export interface WidgetProps extends ModelProps {
    seriesData: Serie[];
}
export default class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
    private logMsg: string;
    public static defaultProps: IWrapperProps = {
        widgetId: "",
        datum: [],
        visible: true
    };

    private changeVisibility() {
        logger.debug(this.props.widgetId + ".changeVisibility");
        this.setState({visible: !this.state.visible});
    }

    public constructor(props: IWrapperProps) {
        super(props);
        logger.debug(this.props.widgetId + ".constructor");
        // initial state
        this.state = {
            visible: this.props.visible,
        };
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    public render() {
        logger.debug(this.props.widgetId + ".render");
        let chart = <div>Loading ...</div>;
        const context = {
            getColor: function (parameter: any) {
                let colors = d3.scale.category20().range().slice(10);
                return colors[ Math.floor(Math.random() * colors.length) ];
            },
        } ;

        if (this.state.visible) {
            logger.debug(this.props.widgetId + ".render.visibleTrue");
           // chart = <NVD3Chart context={context} color={{name: "getColor", type: "function"}} tooltip={{enabled: true}} type="discreteBarChart" datum={this.props.datum} x="label" y="value" />;
           chart = React.createElement(NVD3Chart,
           {
                type: "linePlusBarChart",
                datum: this.props.datum,
                x: function(data_: any, iterator: any) { return iterator; },
                y: function(data_: any , iterator: any) { return data_[1]; }
            });
        }

        return (
            <div>
                <button  onClick={this.changeVisibility}>Click me </button>
                {chart}
            </div>
        );

        // if (this.state.visible) {
        //     logger.debug(this.props.widgetId + ".render.visibleTrue");
        //     return (
        //         <div>
        //             <button onClick={this.changeVisibility}> Click me</button>
        //             <NVD3Chart context={context} color={{name: "getColor", type: "function"}} tooltip={{enabled: true}} type="discreteBarChart" datum={this.props.datum} x="label" y="value" />
        //         </div>
        //     );
        // }

        // return (<div><button onClick={this.changeVisibility}> Click me</button></div>);
    }
}
