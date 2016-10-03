declare var mx: mx.mx;
declare var logger: mendix.logger;

import * as React from "TimeSeries/lib/react";
import ReactDOM  = require ("TimeSeries/lib/react-dom");
import * as d3 from "TimeSeries/lib/d3";
import * as NVD3Chart from "TimeSeries/lib/react-nvd3";
import * as nv from "TimeSeries/lib/nv.d3";
// import nv2 = require("TimeSeries/lib/nv.d3");


interface ITimeSeriesChartProps{
    datum?:Array<{}>;
    visible?:boolean;
    widgetId?:string;
}

interface ITimeSeriesChartState {
    visible?:boolean;
}

export default class TimeSeriesChart extends React.Component<ITimeSeriesChartProps, ITimeSeriesChartState> {
    private logMsg: string;
    public static defaultProps: ITimeSeriesChartProps = {
        widgetId: "",
        datum: [],
        visible: true
    }
    private changeVisibility() {
        logger.debug(this.props.widgetId + ".changeVisibility");
        this.setState({visible:!this.state.visible});
    }
    public constructor(props: ITimeSeriesChartProps) {
        super(props);
        logger.debug(this.props.widgetId + ".constructor");
        //initial state
        this.state = {
            visible: this.props.visible,
        };
        this.changeVisibility = this.changeVisibility.bind(this);
        

    }
    
    public render() {
        logger.debug(this.props.widgetId + ".render");
        let chart;
        const context = {
            getColor: function (iparam) {
                let colors = d3.scale.category20().range().slice(10);
                return colors[ Math.floor(Math.random()* colors.length) ];
            },
        } ;

        // if (this.state.visible) {
        //     logger.debug(this.props.widgetId + ".render.visibleTrue");
        //     chart = <NVD3Chart context={context} color={{name: 'getColor', type: 'function'}} tooltip={{enabled: true}} type="discreteBarChart" datum={this.props.datum} x="label" y="value" />;
        
        // }

        // return (
        //     <div>
        //         <button  onClick={this.changeVisibility}>Click me </button>
        //         {chart}
        //     </div>
        // );

        if(this.state.visible) {
            logger.debug(this.props.widgetId + ".render.visibleTrue");
            return (
                <div>
                    <button onClick={this.changeVisibility}> Click me</button>
                    <NVD3Chart context={context} color={{name: 'getColor', type: 'function'}} tooltip={{enabled: true}} type="discreteBarChart" datum={this.props.datum} x="label" y="value" />              
                </div>
            );
        }

        return (<div><button onClick={this.changeVisibility}> Click me</button></div>);
        
    }
}
